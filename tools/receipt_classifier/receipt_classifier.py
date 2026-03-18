#!/usr/bin/env python3
"""Parse plain-text receipts and classify costs for construction projects.

Usage:
  python receipt_classifier.py --input ./receipts --output classified.csv
"""

from __future__ import annotations

import argparse
import csv
import json
import re
from dataclasses import dataclass, asdict
from datetime import datetime
from pathlib import Path
from typing import Iterable


CATEGORY_RULES: dict[str, tuple[str, ...]] = {
    "materials": (
        "lumber",
        "concrete",
        "cement",
        "drywall",
        "plywood",
        "rebar",
        "brick",
        "paint",
        "insulation",
        "gravel",
        "sealant",
        "fastener",
    ),
    "equipment_rental": (
        "rental",
        "rent",
        "backhoe",
        "excavator",
        "scissor lift",
        "generator",
        "compressor",
        "loader",
    ),
    "labor": (
        "hourly",
        "labor",
        "wage",
        "payroll",
        "install",
        "installation",
        "crew",
    ),
    "subcontractor": (
        "subcontract",
        "plumbing",
        "electrical",
        "hvac",
        "roofing",
        "masonry",
        "framing",
    ),
    "permits_and_fees": (
        "permit",
        "inspection",
        "license",
        "city fee",
        "county fee",
    ),
    "fuel_and_transport": (
        "fuel",
        "diesel",
        "gasoline",
        "delivery",
        "freight",
        "shipping",
        "truck",
        "toll",
    ),
    "safety": (
        "hard hat",
        "gloves",
        "vest",
        "ppe",
        "respirator",
        "safety",
        "harness",
    ),
    "waste_disposal": (
        "dumpster",
        "waste",
        "debris",
        "landfill",
        "haul away",
    ),
    "lodging_and_meals": (
        "hotel",
        "motel",
        "meal",
        "restaurant",
        "catering",
        "per diem",
    ),
    "office_admin": (
        "printer",
        "paper",
        "office",
        "software",
        "subscription",
        "internet",
        "phone",
    ),
}

DATE_PATTERNS = (
    r"\b\d{4}-\d{2}-\d{2}\b",
    r"\b\d{2}/\d{2}/\d{4}\b",
    r"\b\d{2}-\d{2}-\d{4}\b",
)

TOTAL_PATTERNS = (
    r"(?im)^\s*total\s*[:$]?\s*([\d,]+\.\d{2})\s*$",
    r"(?im)^\s*amount due\s*[:$]?\s*([\d,]+\.\d{2})\s*$",
    r"(?im)^\s*balance due\s*[:$]?\s*([\d,]+\.\d{2})\s*$",
)

TAX_PATTERNS = (
    r"(?im)^\s*tax\s*[:$]?\s*([\d,]+\.\d{2})\s*$",
    r"(?im)^\s*sales tax\s*[:$]?\s*([\d,]+\.\d{2})\s*$",
)


@dataclass
class ReceiptRecord:
    filename: str
    vendor: str
    date: str | None
    subtotal: float | None
    tax: float | None
    total: float | None
    category: str
    confidence: float
    matched_keywords: str
    notes: str


@dataclass
class ParsedReceipt:
    vendor: str
    date: str | None
    total: float | None
    tax: float | None
    subtotal: float | None
    full_text: str


def load_receipt_text(path: Path) -> str:
    raw = path.read_text(encoding="utf-8", errors="ignore")

    if path.suffix.lower() == ".json":
        try:
            payload = json.loads(raw)
            if isinstance(payload, dict):
                return "\n".join(str(v) for v in payload.values())
            if isinstance(payload, list):
                return "\n".join(str(item) for item in payload)
        except json.JSONDecodeError:
            pass

    return raw


def parse_date(text: str) -> str | None:
    for pattern in DATE_PATTERNS:
        match = re.search(pattern, text)
        if not match:
            continue
        candidate = match.group(0)
        for fmt in ("%Y-%m-%d", "%m/%d/%Y", "%m-%d-%Y"):
            try:
                return datetime.strptime(candidate, fmt).date().isoformat()
            except ValueError:
                continue
    return None


def parse_money(patterns: Iterable[str], text: str) -> float | None:
    for pattern in patterns:
        match = re.search(pattern, text)
        if match:
            return float(match.group(1).replace(",", ""))
    return None


def parse_vendor(text: str, fallback: str) -> str:
    lines = [ln.strip() for ln in text.splitlines() if ln.strip()]
    if not lines:
        return fallback

    # Most receipts have vendor in the first one or two lines.
    for idx in range(min(2, len(lines))):
        line = lines[idx]
        if re.search(r"\d", line) and idx == 0:
            continue
        return line[:100]

    return fallback


def parse_receipt(text: str, fallback_vendor: str) -> ParsedReceipt:
    total = parse_money(TOTAL_PATTERNS, text)
    tax = parse_money(TAX_PATTERNS, text)
    subtotal = round(total - tax, 2) if total is not None and tax is not None else None

    return ParsedReceipt(
        vendor=parse_vendor(text, fallback_vendor),
        date=parse_date(text),
        total=total,
        tax=tax,
        subtotal=subtotal,
        full_text=text.lower(),
    )


def classify_receipt(parsed: ParsedReceipt) -> tuple[str, float, list[str]]:
    scores: dict[str, int] = {category: 0 for category in CATEGORY_RULES}
    matched: dict[str, list[str]] = {category: [] for category in CATEGORY_RULES}

    for category, keywords in CATEGORY_RULES.items():
        for kw in keywords:
            if kw in parsed.full_text:
                scores[category] += 1
                matched[category].append(kw)

    best_category, best_score = max(scores.items(), key=lambda item: item[1])
    if best_score == 0:
        return "unclassified", 0.0, []

    total_hits = sum(scores.values())
    confidence = round(best_score / total_hits, 2) if total_hits else 0.0
    return best_category, confidence, sorted(set(matched[best_category]))


def build_record(path: Path) -> ReceiptRecord:
    text = load_receipt_text(path)
    parsed = parse_receipt(text, fallback_vendor=path.stem)
    category, confidence, matched = classify_receipt(parsed)

    notes = ""
    if parsed.total is None:
        notes = "Total amount not found."
    if parsed.date is None:
        notes = (notes + " Date not found.").strip()

    return ReceiptRecord(
        filename=path.name,
        vendor=parsed.vendor,
        date=parsed.date,
        subtotal=parsed.subtotal,
        tax=parsed.tax,
        total=parsed.total,
        category=category,
        confidence=confidence,
        matched_keywords=", ".join(matched),
        notes=notes,
    )


def parse_directory(input_dir: Path) -> list[ReceiptRecord]:
    if not input_dir.exists() or not input_dir.is_dir():
        raise FileNotFoundError(f"Input directory not found: {input_dir}")

    records: list[ReceiptRecord] = []
    supported = {".txt", ".json", ".md", ".log"}

    for path in sorted(input_dir.iterdir()):
        if path.is_file() and path.suffix.lower() in supported:
            records.append(build_record(path))

    return records


def write_csv(records: list[ReceiptRecord], output: Path) -> None:
    output.parent.mkdir(parents=True, exist_ok=True)
    with output.open("w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=list(asdict(records[0]).keys()))
        writer.writeheader()
        for record in records:
            writer.writerow(asdict(record))


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", required=True, help="Directory containing text receipts")
    parser.add_argument("--output", default="classified_receipts.csv", help="CSV output path")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    records = parse_directory(Path(args.input))
    if not records:
        raise SystemExit("No supported receipt files found (.txt, .json, .md, .log).")

    write_csv(records, Path(args.output))
    print(f"Processed {len(records)} receipts into {args.output}")


if __name__ == "__main__":
    main()
