#!/usr/bin/env python3
"""Download all 20 original Jadir PDFs, verify them, and package them."""
from __future__ import annotations
import argparse
import hashlib
import json
import os
import sys
import time
import urllib.error
import urllib.request
import zipfile
from datetime import datetime, timezone
from pathlib import Path

EXPECTED_COUNT = 20
MIN_PDF_BYTES = 1024
ZIP_NAME = "Jadir_Red_Sections_01-20_PDFs.zip"
SOURCE_PAGE = "https://jadir-ksa.com/library/section/41?page=1"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; Jadir-PDF-Collector/1.0; GitHubActions)",
    "Accept": "application/pdf,application/octet-stream,*/*",
    "Referer": SOURCE_PAGE,
}

def valid_pdf(path: Path) -> bool:
    if not path.is_file() or path.stat().st_size < MIN_PDF_BYTES:
        return False
    with path.open("rb") as f:
        return f.read(5) == b"%PDF-"

def validate_manifest(items: object) -> list[dict]:
    if not isinstance(items, list) or len(items) != EXPECTED_COUNT:
        raise ValueError(f"Manifest must contain exactly {EXPECTED_COUNT} entries")
    seen_numbers, seen_files, seen_urls = set(), set(), set()
    for item in items:
        if not isinstance(item, dict) or not all(k in item for k in ("number","name","file","url")):
            raise ValueError("Each entry needs number, name, file, url")
        n, filename, url = item["number"], item["file"], item["url"]
        if not isinstance(n,int) or not 1 <= n <= 20 or n in seen_numbers:
            raise ValueError(f"Invalid or duplicated section number: {n!r}")
        if not isinstance(filename,str) or not filename.endswith(".pdf") or "/" in filename or chr(92) in filename or filename in seen_files:
            raise ValueError(f"Invalid or duplicated PDF filename: {filename!r}")
        if not isinstance(url,str) or not url.startswith("https://jadir-ksa.com/api/v1/lesson-blocks/") or not url.endswith("/document") or url in seen_urls:
            raise ValueError(f"Invalid or duplicated PDF URL: {url!r}")
        seen_numbers.add(n)
        seen_files.add(filename)
        seen_urls.add(url)
    if seen_numbers != set(range(1,21)):
        raise ValueError("Section numbers must cover 1–20")
    return sorted(items, key=lambda item:item["number"])

def fetch_pdf(url: str, destination: Path, attempts: int = 4) -> None:
    part = destination.with_suffix(".pdf.part")
    for attempt in range(1, attempts+1):
        try:
            request = urllib.request.Request(url, headers=HEADERS, method="GET")
            with urllib.request.urlopen(request,timeout=60) as response, part.open("wb") as out:
                while True:
                    chunk=response.read(256*1024)
                    if not chunk: break
                    out.write(chunk)
            if not valid_pdf(part):
                raise ValueError("Response was not a valid PDF (may require authentication)")
            part.replace(destination)
            return
        except (urllib.error.HTTPError,urllib.error.URLError,TimeoutError,OSError,ValueError) as exc:
            part.unlink(missing_ok=True)
            if attempt==attempts:
                raise RuntimeError(f"Unable to download {url}: {exc}") from exc
            delay=min(2**attempt,12)
            print(f"  Attempt {attempt}/{attempts} failed: {exc}; retry in {delay}s", flush=True)
            time.sleep(delay)

def sha256_file(path: Path) -> str:
    digest=hashlib.sha256()
    with path.open("rb") as f:
        while True:
            chunk=f.read(256*1024)
            if not chunk: break
            digest.update(chunk)
    return digest.hexdigest()

def create_zip(paths: list[Path], archive: Path) -> None:
    if len(paths)!=EXPECTED_COUNT or any(not valid_pdf(p) for p in paths):
        raise ValueError("All 20 valid PDFs are required before publishing an archive")
    archive.parent.mkdir(parents=True,exist_ok=True)
    with zipfile.ZipFile(archive,"w",zipfile.ZIP_DEFLATED,compresslevel=6) as z:
        for path in paths: z.write(path,arcname=path.name)
    with zipfile.ZipFile(archive) as z:
        names=z.namelist()
        if len(names)!=20 or len(set(names))!=20 or z.testzip() is not None:
            raise ValueError("Archive validation failed")

def github_summary(message: str) -> None:
    p=os.environ.get("GITHUB_STEP_SUMMARY")
    if p:
        with open(p,"a",encoding="utf-8") as f: f.write(message+"\n")

def main() -> int:
    parser=argparse.ArgumentParser(description="Download and ZIP 20 Jadir PDFs")
    parser.add_argument("--manifest",type=Path,default=Path(__file__).with_name("links.json"))
    parser.add_argument("--output",type=Path,default=Path("output"))
    args=parser.parse_args()
    items=validate_manifest(json.loads(args.manifest.read_text(encoding="utf-8")))
    pdf_dir=args.output/"pdfs"
    pdf_dir.mkdir(parents=True,exist_ok=True)
    records,failures=[],[]
    for item in items:
        path=pdf_dir/item["file"]
        print(f"[{item['number']:02d}/20] {item['name']}: {path.name}",flush=True)
        try:
            if not valid_pdf(path): fetch_pdf(item["url"],path)
            records.append({"number":item["number"],"name":item["name"],
                "file":path.name,"bytes":path.stat().st_size,
                "sha256":sha256_file(path),"source":item["url"]})
            print(f"  OK: {path.stat().st_size:,} bytes",flush=True)
        except Exception as exc:
            failures.append({"number":item["number"],"name":item["name"],"error":str(exc)})
            print(f"  FAILED: {exc}",file=sys.stderr,flush=True)
        time.sleep(0.3)
    report={"source":SOURCE_PAGE,"generated_at_utc":datetime.now(timezone.utc).isoformat(),
        "expected":EXPECTED_COUNT,"downloaded":len(records),"files":records,"failures":failures}
    (args.output/"download_report.json").write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding="utf-8")
    if failures:
        github_summary(f"## ❌ Incomplete: {len(records)}/20 PDFs. No successful archive was published.")
        for item in failures:
            github_summary(f"- {item['number']:02d} {item['name']}: {item['error']}")
        return 1
    archive=args.output/ZIP_NAME
    create_zip([pdf_dir/item["file"] for item in items],archive)
    github_summary(f"## ✅ All 20 PDFs verified\n\nDownload the **Jadir_20_PDFs** artifact below to get one ZIP with 20 PDF files.")
    print(f"SUCCESS: {archive} ({archive.stat().st_size:,} bytes)",flush=True)
    return 0

if __name__=="__main__":
    try: sys.exit(main())
    except Exception as exc:
        github_summary(f"## ❌ Collection failed: {exc}")
        print(f"FATAL: {exc}",file=sys.stderr)
        sys.exit(1)
