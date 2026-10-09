import json
import hashlib
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
OUTPUT_DIR = ROOT / "public" / "zines"
MANIFEST = ROOT / "public" / "data" / "zines.json"
DEFAULT_FOLDER_ID = "1oj41JW4InImSSl0ZNxHw_03uERWcaWCV"
RENDER_SCALE = 1.4
RENDER_VERSION = 2


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
            if self.current_file["name"].lower().endswith(".pdf"):
                self.files.append(self.current_file)
            self.current_file = None

    def handle_data(self, data):
        if self.current_file and self.in_name:
            self.current_file["name"] += data


def list_pdfs(folder_id):
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
    if not parser.files and "role=\"row\"" not in response.text:
        raise RuntimeError("Google Drive did not return a readable public folder listing.")
    return sorted(parser.files, key=lambda file: file["name"].casefold())


def download_pdf(file_id, destination):
    try:
        with requests.get(
            "https://drive.google.com/uc",
            params={"export": "download", "id": file_id},
            timeout=90,
            stream=True,
        ) as response:
            response.raise_for_status()
            with destination.open("wb") as output:
                for chunk in response.iter_content(chunk_size=1024 * 1024):
                    if chunk:
                        output.write(chunk)
    except requests.RequestException as error:
        status = error.response.status_code if error.response is not None else "unavailable"
        raise RuntimeError(f"Could not download a zine PDF (HTTP {status}).") from None
    if destination.read_bytes()[:5] != b"%PDF-":
        destination.unlink(missing_ok=True)
        raise RuntimeError("Google Drive did not return a PDF. Check that the file is publicly viewable.")


def read_previous_manifest():
    try:
        payload = json.loads(MANIFEST.read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return {}
    return {
        item["id"]: item
        for item in payload.get("zines", [])
        if isinstance(item, dict) and isinstance(item.get("id"), str)
    }


def export_zine(file, staging_dir, previous):
    file_id = file.get("id", "")
    if not re.fullmatch(r"[A-Za-z0-9_-]+", file_id):
        raise RuntimeError("Google Drive returned a file with an invalid ID.")

    title = Path(file.get("name", "Untitled zine")).stem.strip() or "Untitled zine"
    target_dir = staging_dir / file_id
    old_entry = previous.get(file_id, {})
    old_pages = OUTPUT_DIR / file_id
    pdf_path = staging_dir / f"{file_id}.pdf"
    try:
        download_pdf(file_id, pdf_path)
        with pdf_path.open("rb") as pdf_file:
            digest = hashlib.file_digest(pdf_file, "sha256").hexdigest()
        if (
            old_entry.get("contentHash") == digest
            and old_entry.get("renderVersion") == RENDER_VERSION
            and old_entry.get("title") == title
            and old_entry.get("pageCount", 0) > 0
            and len(list(old_pages.glob("page-*.jpg"))) == old_entry["pageCount"]
        ):
            shutil.copytree(old_pages, target_dir)
            return old_entry

        target_dir.mkdir(parents=True)
        with pymupdf.open(pdf_path) as document:
            if document.needs_pass:
                raise RuntimeError(f"The zine '{title}' is password-protected.")
            page_urls = []
            page_ratios = []
            target_height = min(page.rect.height for page in document) * RENDER_SCALE
            for page_number, page in enumerate(document, start=1):
                image_path = target_dir / f"page-{page_number:03}.jpg"
                page_scale = target_height / page.rect.height
                pixmap = page.get_pixmap(matrix=pymupdf.Matrix(page_scale, page_scale), alpha=False)
                pixmap.save(image_path, jpg_quality=84)
                page_urls.append(f"/zines/{file_id}/{image_path.name}")
                page_ratios.append(round(pixmap.width / pixmap.height, 6))
    except (pymupdf.FileDataError, pymupdf.EmptyFileError) as error:
        raise RuntimeError(f"The zine '{title}' is not a readable PDF.") from error
    finally:
        pdf_path.unlink(missing_ok=True)

    if not page_urls:
        raise RuntimeError(f"The zine '{title}' has no pages.")
    return {
        "id": file_id,
        "title": title,
        "contentHash": digest,
        "renderVersion": RENDER_VERSION,
        "pageCount": len(page_urls),
        "cover": page_urls[0],
        "pages": page_urls,
        "pageRatios": page_ratios,
        "source": file.get("webViewLink") or f"https://drive.google.com/file/d/{file_id}/view",
    }


def sync(folder_id):
    files = list_pdfs(folder_id)
    previous = read_previous_manifest()
    staging_dir = OUTPUT_DIR.with_name("zines.tmp")
    backup_dir = OUTPUT_DIR.with_name("zines.previous")
    shutil.rmtree(staging_dir, ignore_errors=True)
    staging_dir.mkdir(parents=True)

    try:
        zines = [export_zine(file, staging_dir, previous) for file in files]
        existing_manifest = read_previous_manifest()
        same_manifest = existing_manifest == {item["id"]: item for item in zines}
        complete_existing_assets = all(
            (OUTPUT_DIR / item["id"] / f"page-{number:03}.jpg").is_file()
            for item in zines
            for number in range(1, item["pageCount"] + 1)
        )
        existing_ids = {path.name for path in OUTPUT_DIR.iterdir() if path.is_dir()} if OUTPUT_DIR.exists() else set()
        if same_manifest and complete_existing_assets and existing_ids == {item["id"] for item in zines}:
            shutil.rmtree(staging_dir, ignore_errors=True)
            print("Zine collection is unchanged.")
            return

        payload = {
            "source": "Google Drive",
            "syncedAt": datetime.now(timezone.utc).isoformat(),
            "zines": zines,
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

    print(f"Synced {len(zines)} zines from Google Drive.")


def main():
    load_dotenv(ROOT / ".env.local")
    folder_id = os.getenv("GOOGLE_DRIVE_FOLDER_ID", DEFAULT_FOLDER_ID)
    sync(folder_id)


if __name__ == "__main__":
    try:
        main()
    except RuntimeError as error:
        raise SystemExit(str(error)) from None