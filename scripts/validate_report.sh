#!/bin/bash

echo "Checking ESLint Report"

# Specify the path to the ESLint HTML report
REPORT_PATH="./report/eslint_report.html"

# Extract the number of problems from the report
num_problems=$(grep -oP '(?<=<span>)[0-9]+(?= problems</span>)' "$REPORT_PATH" | head -n 1)
echo "$num_problems"
# Check if any problems exist
if [ "$(echo "$num_problems")" -eq 0 ]; then
    echo "No ESLint problems found"
    exit 0
else
    echo "ESLint found $num_problems problems"
    exit 1
fi
