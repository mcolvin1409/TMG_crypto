#!/bin/sh

# Usage Example
# $> bash scripts/genCrypto.sh -s A000-1234-5678 -v 1.0.0 -r "A" -t 9

while getopts ":r:s:t:v:" opt; do
  case $opt in
    r) rev="$OPTARG"
    ;;
    s) id="$OPTARG"
    ;;
    t) type="$OPTARG"
    ;;
    v) swv="$OPTARG"
    ;;
    \?) echo "Invalid option -$OPTARG" >&2
    exit 1
    ;;
  esac

  case $OPTARG in
    -*) echo "Option $opt needs a valid argument"
    exit 1
    ;;
  esac
done

FILE=./server/config/cryptoinfo.json

generate_post_data()
{
  cat << EOF
{
  "unitId": "$id",
  "unitType": $type,
  "revision": "$rev",
  "swversion": "$swv"
}
EOF
}

if [ -f "$FILE" ]; then
    echo "System Configuration already exists."
else 
    echo "Creating system configuration"

    curl -X POST http://localhost:5000/system/props \
      -H "Accept: application/json" \
      -H "Content-Type: application/json"  \
      -d "$(generate_post_data)"
fi
