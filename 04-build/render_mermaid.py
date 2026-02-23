#!/usr/bin/env python3
import hashlib
import os
import re
import subprocess
import sys
from pathlib import Path


MERMAID_FENCE_RE = re.compile(r"```mermaid\s*\n(.*?)\n```", re.DOTALL)
DEFAULT_HEIGHT = os.environ.get("MERMAID_HEIGHT", "50%")
DEFAULT_ALIGN = os.environ.get("MERMAID_ALIGN", "center")


def sha1(text: str) -> str:
    return hashlib.sha1(text.encode("utf-8")).hexdigest()


def run(cmd: list[str]) -> None:
    subprocess.run(cmd, check=True)


def main() -> int:
    if len(sys.argv) != 4:
        print(
            "Usage: render_mermaid.py <input_md> <output_md> <output_dir>",
            file=sys.stderr,
        )
        return 2

    input_md = Path(sys.argv[1]).resolve()
    output_md = Path(sys.argv[2]).resolve()
    output_dir = Path(sys.argv[3]).resolve()

    output_dir.mkdir(parents=True, exist_ok=True)

    puppeteer_config = os.environ.get("MERMAID_PUPPETEER_CONFIG", "").strip()
    puppeteer_args: list[str] = []
    if puppeteer_config:
        puppeteer_args = ["-p", puppeteer_config]

    md = input_md.read_text(encoding="utf-8")

    def replace(match: re.Match) -> str:
        mermaid_src = match.group(1).strip() + "\n"
        digest = sha1(mermaid_src)[:16]
        png_name = f"mermaid-{digest}.png"
        png_path = output_dir / png_name

        if not png_path.exists():
            tmp_mmd = output_dir / f"mermaid-{digest}.mmd"
            tmp_mmd.write_text(mermaid_src, encoding="utf-8")

            # Render to PNG via mermaid-cli (mmdc)
            run(
                [
                    "mmdc",
                    "-i",
                    str(tmp_mmd),
                    "-o",
                    str(png_path),
                    "--backgroundColor",
                    "white",
                ]
                + puppeteer_args
            )

            try:
                tmp_mmd.unlink()
            except OSError:
                pass

        rel = os.path.relpath(png_path, output_md.parent)
        return f"![]({rel}){{height={DEFAULT_HEIGHT} fig-align={DEFAULT_ALIGN}}}"

    rendered = MERMAID_FENCE_RE.sub(replace, md)
    output_md.write_text(rendered, encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
