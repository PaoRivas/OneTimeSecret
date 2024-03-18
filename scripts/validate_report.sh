#!/bin/bash

echo "Checking ESLint Report"

# Specify the path to the ESLint HTML report
REPORT_PATH="./report/eslint_report.html"

# Extract the number of problems from the report
num_problems=$(grep -oP '(?<=<span>)[0-9]+(?= problems</span>)' "$REPORT_PATH" | head -n 1)

# Initialize a variable to store the total number of problems
total_problems=0

# Loop through each occurrence and sum up the total
for problem_count in $num_problems; do
    total_problems=$((total_problems + problem_count))
done

# Check if any problems exist
if [ "$(echo "$total_problems")" -eq 0 ]; then
    echo "No ESLint problems found"
    exit 0
else
    echo "ESLint found $num_problems problems"
    exit 1
fi
