#!/usr/bin/env bash
set -euo pipefail

TEMP=${1:-1538}
ORES=("Fe" "Cu" "Zn")

for ore in "${ORES[@]}"; do
  if [[ "$TEMP" -ge 1500 ]]; then
    echo "Smelting $ore at ${TEMP}°C" | tee -a smelt.log
  else
    printf 'Too cold for %s\n' "$ore" >&2
    exit 1
  fi
done
