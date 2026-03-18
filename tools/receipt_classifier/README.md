# Receipt Parser + Classifier (Construction)

This utility parses plain-text receipts and classifies each record into a construction cost bucket.

## Features
- Parses receipts from `.txt`, `.json`, `.md`, and `.log` files.
- Extracts key fields: vendor, date, tax, subtotal, total.
- Classifies each receipt into categories such as:
  - `materials`
  - `equipment_rental`
  - `labor`
  - `subcontractor`
  - `permits_and_fees`
  - `fuel_and_transport`
  - `safety`
  - `waste_disposal`
  - `lodging_and_meals`
  - `office_admin`
- Outputs structured CSV for accounting/reporting import.

## Run
```bash
python3 tools/receipt_classifier/receipt_classifier.py \
  --input tools/receipt_classifier/sample_receipts \
  --output tools/receipt_classifier/output/classified_receipts.csv
```

## Output columns
- `filename`
- `vendor`
- `date`
- `subtotal`
- `tax`
- `total`
- `category`
- `confidence`
- `matched_keywords`
- `notes`

## Notes
- This version assumes receipts are already converted to text.
- For scans/images, pair this with OCR first (e.g., Tesseract or cloud OCR), then feed extracted text files into this tool.
