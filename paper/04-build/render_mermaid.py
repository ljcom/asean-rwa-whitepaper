#!/usr/bin/env python3
import hashlib
import os
import re
import subprocess
import sys
from pathlib import Path
from typing import Optional


MERMAID_FENCE_RE = re.compile(r"```mermaid\s*\n(.*?)\n```", re.DOTALL)
DEFAULT_HEIGHT = os.environ.get("MERMAID_HEIGHT", "70%")
DEFAULT_ALIGN = os.environ.get("MERMAID_ALIGN", "center")
DEFAULT_FORMAT = os.environ.get("MERMAID_FORMAT", "png").strip().lower() or "png"
DEFAULT_BG = os.environ.get("MERMAID_BACKGROUND", "white").strip() or "white"


def _parse_positive_float(raw: str) -> Optional[float]:
    raw = raw.strip()
    if not raw:
        return None
    try:
        value = float(raw)
    except ValueError:
        return None
    if value <= 0:
        return None
    return value


def _parse_positive_int(raw: str) -> Optional[int]:
    raw = raw.strip()
    if not raw:
        return None
    try:
        value = int(raw)
    except ValueError:
        return None
    if value <= 0:
        return None
    return value


def sha1(text: str) -> str:
    return hashlib.sha1(text.encode("utf-8")).hexdigest()


def run(cmd: list[str]) -> None:
    subprocess.run(cmd, check=True)


def run_with_fallback(primary: list[str], fallback: list[str]) -> None:
    try:
        run(primary)
        return
    except subprocess.CalledProcessError:
        print(
            "Warning: Mermaid render failed with optional flags; retrying with a reduced command...",
            file=sys.stderr,
        )
    run(fallback)


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

    render_scale = _parse_positive_float(os.environ.get("MERMAID_SCALE", "2"))
    render_width = _parse_positive_int(os.environ.get("MERMAID_RENDER_WIDTH", ""))
    render_height = _parse_positive_int(os.environ.get("MERMAID_RENDER_HEIGHT", ""))

    md = input_md.read_text(encoding="utf-8")

    def replace(match: re.Match) -> str:
        mermaid_src = match.group(1).strip() + "\n"
        render_key = (
            f"format={DEFAULT_FORMAT};bg={DEFAULT_BG};scale={render_scale};"
            f"w={render_width};h={render_height}"
        )
        digest = sha1(mermaid_src + "\n" + render_key)[:16]
        out_name = f"mermaid-{digest}.{DEFAULT_FORMAT}"
        out_path = output_dir / out_name

        if not out_path.exists():
            tmp_mmd = output_dir / f"mermaid-{digest}.mmd"
            tmp_mmd.write_text(mermaid_src, encoding="utf-8")

            cmd_base = [
                "mmdc",
                "-i",
                str(tmp_mmd),
                "-o",
                str(out_path),
                "--backgroundColor",
                DEFAULT_BG,
            ]

            optional_args: list[str] = []
            if render_scale is not None and render_scale != 1:
                optional_args += ["--scale", str(render_scale)]
            if render_width is not None:
                optional_args += ["--width", str(render_width)]
            if render_height is not None:
                optional_args += ["--height", str(render_height)]

            # Render via mermaid-cli (mmdc). Some older mmdc versions may not support
            # scaling/width/height flags, so retry without them if needed.
            run_with_fallback(cmd_base + optional_args + puppeteer_args, cmd_base + puppeteer_args)

            try:
                tmp_mmd.unlink()
            except OSError:
                pass

        rel = os.path.relpath(out_path, output_md.parent)
        return f"![]({rel}){{height={DEFAULT_HEIGHT} fig-align={DEFAULT_ALIGN}}}"

    rendered = MERMAID_FENCE_RE.sub(replace, md)
    output_md.write_text(rendered, encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
