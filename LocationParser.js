'use strict';

class LocationParser {
  normalize(n) {
    return parseFloat(n.toPrecision(5));
  }
  stringify(latitude, longitude) {
    latitude = this.normalize(latitude);
    longitude = this.normalize(longitude);

    return `${latitude},${longitude}`;
  }
  sortRecordsByTime(itemA, itemB) {
    if (itemA.timestampMs === itemB.timestampMs) {
      return 0;
    }
    return (itemA.timestampMs > itemB.timestampMs) ? 1 : -1;
  }
  parseLocFileContents(contents) {
    const parsed = JSON.parse(contents).data.items;
    const sorted = parsed.sort(this.sortRecordsByTime);
    return sorted.map(item => this.stringify(item.latitude, item.longitude));
  }
}

module.exports = LocationParser;