#!/usr/bin/env python3
"""Discover, download and verify all 60 public PDF documents in the Jadir section.

The source is the actual /learn/section/41 page, not a guessed sequence of IDs.
Each PDF URL is taken from its corresponding /learn/lesson/... page.
"""
from __future__ import annotations

import argparse
import hashlib
from html import unescape
from html.parser import HTMLParser
import json
import os
from pathlib import Path
import re
import sys
import time
from datetime import datetime, timezone
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen
import zipfile

BASE = "https://jadir-ksa.com"
SECTION_URL = BASE + "/learn/section/41"
EXPECTED = 60
ARCHIVE = "Jadir_Etqan_All_60_PDFs.zip"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/131.0 Safari/537.36",
    "Accept": "text/html,application/pdf,*/*",
    "Referer": SECTION_URL,
}


class AnchorReader(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.links = []
        self.href = None
        self.parts = []

    def handle_starttag(self, tag, attrs):
        if tag == "a":
            self.href = dict(attrs).get("href")
            self.parts = []

    def handle_data(self, data):
        if self.href is not None:
            self.parts.append(data)

    def handle_endtag(self, tag):
        if tag == "a" and self.href is not None:
            self.links.append((self.href, unescape("".join(self.parts)).strip()))
            self.href = None
            self.parts = []


def request_bytes(url: str, attempts=4) -> bytes:
    if urlparse(url).hostname != "jadir-ksa.com":
        raise ValueError(f"Blocked off-site URL: {url}")
    for attempt in range(1, attempts + 1):
        try:
            request = Request(url, headers=HEADERS)
            with urlopen(request, timeout=60) as response:
                if urlparse(response.url).hostname != "jadir-ksa.com":
                    raise ValueError("Redirect to an unexpected domain")
                return response.read()
        except (HTTPError, URLError, TimeoutError, OSError) as exc:
            if attempt == attempts:
                raise RuntimeError(f"Cannot fetch {url}: {exc}") from exc
            delay = min(2 ** attempt, 10)
            print(f"Retry {attempt}/{attempts} for {url}: {exc}", flush=True)
            time.sleep(delay)
    raise AssertionError("unreachable")


def anchors(html_bytes: bytes) -> list[tuple[str, str]]:
    parser = AnchorReader()
    parser.feed(html_bytes.decode("utf-8", errors="replace"))
    return parser.links


def safe_filename(name: str) -> str:
    cleaned = re.sub(r'[^\w\- ]', "_", name, flags=re.UNICODE)
    cleaned = re.sub(r"\s+", "_", cleaned).strip(" ._-")
    return cleaned[:95] or "untitled"


def discover_lessons(html_bytes: bytes) -> list[dict]:
    found = {}
    for href, label in anchors(html_bytes):
        resolved = urljoin(SECTION_URL, href)
        parsed = urlparse(resolved)
        if parsed.hostname != "jadir-ksa.com" or not re.fullmatch(r"/learn/lesson/\d+/?", parsed.path):
            continue
        match = re.match(r"^\s*(\d+)\s*[-–—]\s*(.*?)\s*$", label)
        if not match:
            continue
        number = int(match.group(1))
        if 1 <= number <= EXPECTED:
            if number in found and found[number]["lesson"] != resolved:
                raise ValueError(f"Conflicting lesson URLs for section {number}")
            found[number] = {"number": number, "name": match.group(2), "lesson": resolved}
    if set(found) != set(range(1, EXPECTED + 1)):
        missing = sorted(set(range(1, EXPECTED + 1)) - set(found))
        raise ValueError(f"Section should have 60 lessons; found {len(found)}. Missing {missing}")
    return [found[n] for n in range(1, EXPECTED + 1)]


def discover_pdf(lesson_html: bytes, lesson_url: str) -> str:
    urls = []
    for href, _ in anchors(lesson_html):
        url = urljoin(lesson_url, href)
        parsed = urlparse(url)
        if (parsed.hostname == "jadir-ksa.com" and
                re.fullmatch(r"/api/v1/lesson-blocks/\d+/document/?", parsed.path)):
            if url not in urls:
                urls.append(url)
    if len(urls) != 1:
        raise ValueError(f"Expected one PDF link on {lesson_url}, found {len(urls)}")
    return urls[0]


def is_pdf(path: Path) -> bool:
    if not path.is_file() or path.stat().st_size < 1024:
        return False
    with path.open("rb") as file:
        return file.read(5) == b"%PDF-"


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as file:
        for part in iter(lambda: file.read(1024 * 1024), b""):
            h.update(part)
    return h.hexdigest()


def write_summary(msg: str) -> None:
    location = os.environ.get("GITHUB_STEP_SUMMARY")
    if location:
        with open(location, "a", encoding="utf-8") as file:
            file.write(msg + "\n")


def main() -> int:
    arg = argparse.ArgumentParser()
    arg.add_argument("--output", type=Path, default=Path("output_60"))
    args = arg.parse_args()

    target = args.output
    pdfs = target / "pdfs"
    pdfs.mkdir(parents=True, exist_ok=True)

    print(f"Discovering 60 lessons from {SECTION_URL}", flush=True)
    lessons = discover_lessons(request_bytes(SECTION_URL))
    result = {"source_page": SECTION_URL,
              "generated_at_utc": datetime.now(timezone.utc).isoformat(),
              "expected": EXPECTED, "files": [], "failures": []}
    paths = []
    try:
        for item in lessons:
            number, name, lesson = item["number"], item["name"], item["lesson"]
            filename = f"{number:02d}_{safe_filename(name)}.pdf"
            path = pdfs / filename
            print(f"[{number:02d}/{EXPECTED}] {name}", flush=True)
            try:
                doc_url = discover_pdf(request_bytes(lesson), lesson)
                if not is_pdf(path):
                    data = request_bytes(doc_url)
                    partial = path.with_name(path.name + ".part")
                    partial.write_bytes(data)
                    if not is_pdf(partial):
                        partial.unlink(missing_ok=True)
                        raise ValueError("The response is not a valid PDF")
                    partial.replace(path)
                file_record = {
                    "number": number, "name": name, "lesson": lesson,
                    "url": doc_url, "filename": filename,
                    "bytes": path.stat().st_size, "sha256": sha256(path)
                }
                result["files"].append(file_record)
                paths.append(path)
                print(f"  saved {path.stat().st_size:,} bytes", flush=True)
            except Exception as error:
                result["failures"].append({
                    "number": number, "name": name, "lesson": lesson, "error": str(error)})
                print(f"  FAILED {error}", file=sys.stderr, flush=True)
            time.sleep(0.4)
    finally:
        target.mkdir(parents=True, exist_ok=True)
        (target / "download_report.json").write_text(
            json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")

    if len(paths) != EXPECTED or result["failures"]:
        write_summary(f"## ❌ Incomplete ({len(paths)}/{EXPECTED}). No archive published.")
        for error in result["failures"]:
            write_summary(f"- {error['number']:02d} {error['name']}: {error['error']}")
        return 1
    archive = target / ARCHIVE
    with zipfile.ZipFile(archive, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=6) as file:
        for path in paths:
            file.write(path, arcname=path.name)
    with zipfile.ZipFile(archive) as file:
        if len(file.namelist()) != EXPECTED or file.testzip() is not None:
            raise ValueError("Archive verification failed")
    print(f"SUCCESS: {archive} (60 verified PDFs)", flush=True)
    write_summary("## ✅ 60/60 PDFs collected and verified\n\nDownload **Jadir_60_PDFs** from Artifacts for one ZIP containing all 60 original PDF documents.")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as error:
        write_summary(f"## ❌ Collector failed: {error}")
        print(f"FATAL: {error}", file=sys.stderr, flush=True)
        sys.exit(1)
