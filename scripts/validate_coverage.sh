#!/bin/bash

echo "Check Coverage"

COVERAGE_REPORT_PATH="../coverage/clover.xml"

# Parse XML and extract coverage information
statements=$(grep -oP '(?<=statements=")[^"]+' $COVERAGE_REPORT_PATH | sed -n '1p')
covered_statements=$(grep -oP '(?<=coveredstatements=")[^"]+' $COVERAGE_REPORT_PATH | sed -n '1p')

# Calculate coverage percentage
coverage_percentage=$(awk "BEGIN { print $covered_statements / $statements }")

# Represents 80% of coverage
MIN_COVERAGE=0.8

# Check if coverage meets the minimum required
if [( $(awk "BEGIN {print ($coverage_percentage >= $MIN_COVERAGE) ? 1 : 0}") )]; then
    echo "Pass Successful"
    exit 0
else
    echo "Fail Coverage Check!"
    exit 1
fi
