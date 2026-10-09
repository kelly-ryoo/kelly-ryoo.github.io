import json
import os
import re
import shutil
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path

import pymupdf
import requests
from dotenv import load_dotenv


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "public" / "teas"
MANIFEST = ROOT / "public" / "data" / "teas.json"
DEFAULT_FOLDER_ID = "1ng9bFottg2gRtNokBMbyTUTfBmtDQwI0"
RENDER_SCALE = 1.2


class DriveFolderParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.files = []
        self.current_file = None
        self.in_name = False

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if tag == "tr" and attributes.get("role") == "row" and attributes.get("data-id"):
            self.current_file = {"id": attributes["data-id"], "name": ""}
        elif tag == "strong" and self.current_file:
            self.in_name = True

    def handle_endtag(self, tag):
        if tag == "strong":
            self.in_name = False
        elif tag == "tr" and self.current_file:
            self.files.append(self.current_file)
            self.current_file = None

    def handle_data(self, data):
        if self.current_file and self.in_name:
            self.current_file["name"] += data


def list_files(folder_id):
    try:
        response = requests.get(
            f"https://drive.google.com/drive/folders/{folder_id}",
            timeout=45,
            headers={"User-Agent": "Mozilla/5.0"},
        )
        response.raise_for_status()
    except requests.RequestException as error:
        status = error.response.status_code if error.response is not None else "unavailable"
        raise RuntimeError(f"Public Google Drive folder could not be loaded (HTTP {status}).") from None

    parser = DriveFolderParser()
    parser.feed(response.text)
    if not parser.files and 'role="row"' not in response.text:
        raise RuntimeError("Google Drive did not return a readable public folder listing.")
    return sorted(parser.files, key=lambda file: file["name"].casefold())


def render_tea(file, staging_dir):
    file_id = file.get("id", "")
    if not re.fullmatch(r"[A-Za-z0-9_-]+", file_id):
        raise RuntimeError("Google Drive returned a file with an invalid ID.")

    title = Path(file.get("name", "Untitled tea")).stem.strip() or "Untitled tea"
    pdf_path = staging_dir / f"{file_id}.pdf"
    image_path = staging_dir / f"{file_id}.jpg"
    try:
        with requests.get(
            "https://drive.google.com/uc",
            params={"export": "download", "id": file_id},
            timeout=90,
            stream=True,
        ) as response:
            response.raise_for_status()
            with pdf_path.open("wb") as output:
                for chunk in response.iter_content(chunk_size=1024 * 1024):
                    if chunk:
                        output.write(chunk)
    except requests.RequestException as error:
        status = error.response.status_code if error.response is not None else "unavailable"
        raise RuntimeError(f"Could not download a tea scan (HTTP {status}).") from None

    try:
        if pdf_path.read_bytes()[:5] != b"%PDF-":
            raise RuntimeError("Google Drive did not return a PDF. Check that the file is publicly viewable.")
        with pymupdf.open(pdf_path) as document:
            if document.needs_pass:
                raise RuntimeError(f"The tea scan '{title}' is password-protected.")
            if not len(document):
                raise RuntimeError(f"The tea scan '{title}' has no pages.")
            page = document[0]
            pixmap = page.get_pixmap(matrix=pymupdf.Matrix(RENDER_SCALE, RENDER_SCALE), alpha=False)
            pixmap.save(image_path, jpg_quality=88)
    except (pymupdf.FileDataError, pymupdf.EmptyFileError) as error:
        raise RuntimeError(f"The tea scan '{title}' is not a readable PDF.") from error
    finally:
        pdf_path.unlink(missing_ok=True)

    return {
        "id": file_id,
        "title": title,
        "image": f"/teas/{file_id}.jpg",
        "source": f"https://drive.google.com/file/d/{file_id}/view",
    }


def sync(folder_id):
    files = list_files(folder_id)
    staging_dir = OUTPUT_DIR.with_name("teas.tmp")
    backup_dir = OUTPUT_DIR.with_name("teas.previous")
    shutil.rmtree(staging_dir, ignore_errors=True)
    staging_dir.mkdir(parents=True)

    try:
        teas = [render_tea(file, staging_dir) for file in files]
        payload = {
            "source": "Google Drive",
            "syncedAt": datetime.now(timezone.utc).isoformat(),
            "teas": teas,
        }
        temporary_manifest = MANIFEST.with_suffix(".json.tmp")
        temporary_manifest.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

        shutil.rmtree(backup_dir, ignore_errors=True)
        if OUTPUT_DIR.exists():
            OUTPUT_DIR.rename(backup_dir)
        try:
            staging_dir.rename(OUTPUT_DIR)
        except OSError:
            if backup_dir.exists():
                backup_dir.rename(OUTPUT_DIR)
            raise
        shutil.rmtree(backup_dir, ignore_errors=True)
        temporary_manifest.replace(MANIFEST)
    finally:
        shutil.rmtree(staging_dir, ignore_errors=True)

    print(f"Synced {len(teas)} tea scans from Google Drive.")


def main():
    load_dotenv(ROOT / ".env.local")
    folder_id = os.getenv("GOOGLE_DRIVE_TEAS_FOLDER_ID", DEFAULT_FOLDER_ID)
    sync(folder_id)


if __name__ == "__main__":
    try:
        main()
    except RuntimeError as error:
        raise SystemExit(str(error)) from None