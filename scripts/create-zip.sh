#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUTPUT="$(dirname "$ROOT")/ajuy-municipality-website-complete.zip"
cd "$ROOT"
rm -f "$OUTPUT"
zip -qr "$OUTPUT" . -x '.git/*' 'node_modules/*' '.next/*' '.vercel/*' '.env.local' '*.zip'
echo "$OUTPUT"
