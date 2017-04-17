#!/bin/sh

# Exit if any command fails
set -e

# Clone project and install dependencies
git clone https://github.com/codyromano/next-move.git
cd next-move
npm install

# Remove unnecessary metadata from Google Takeout
python ./third-party/location_history_json_converter.py ../RawLocationHistory.json -o LocationHistory.json -f json

# Generate waypoints
node generateWaypointsJSON.js

http-server


