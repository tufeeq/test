from __future__ import annotations
import importlib.util
import json
import pathlib
import tempfile
import unittest
import zipfile

SCRIPT = pathlib.Path(__file__).parents[1] / "collect.py"
spec = importlib.util.spec_from_file_location("collect", SCRIPT)
collector = importlib.util.module_from_spec(spec)
spec.loader.exec_module(collector)

class CollectorTests(unittest.TestCase):
    def test_manifest(self):
        items = json.loads(SCRIPT.with_name("links.json").read_text(encoding="utf-8"))
        parsed = collector.validate_manifest(items)
        self.assertEqual([i["number"] for i in parsed], list(range(1,21)))

    def test_bad_pdf_is_rejected(self):
        with tempfile.TemporaryDirectory() as directory:
            p = pathlib.Path(directory) / "bad.pdf"
            p.write_bytes(b"<html>Access denied</html>"*100)
            self.assertFalse(collector.valid_pdf(p))
            p.write_bytes(b"%PDF-1.7")
            self.assertFalse(collector.valid_pdf(p))

    def test_zip_has_all_20_and_not_19(self):
        with tempfile.TemporaryDirectory() as directory:
            root = pathlib.Path(directory)
            files = []
            for n in range(1,21):
                p = root / f"{n:02d}.pdf"
                p.write_bytes(b"%PDF-1.7\\n" + b"A"*2000 + b"\\n%%EOF")
                files.append(p)
            archive = root / "bundle.zip"
            collector.create_zip(files, archive)
            with zipfile.ZipFile(archive) as zipped:
                self.assertEqual(len(zipped.namelist()), 20)
            with self.assertRaises(ValueError):
                collector.create_zip(files[:19], archive)

if __name__ == "__main__":
    unittest.main()
