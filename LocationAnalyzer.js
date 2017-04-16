'use strict';

const emitter = require('./Emitter');

class LocationAnalyzer {
  constructor(parser, model) {
    this.parser = parser;
    this.model = model;
  }
  predictPath(startLoc, limit) {
    let result = [];
    let location = this.parser.stringify(startLoc.latitude,
      startLoc.longitude);

    this.model.setState(location);

    while (Number.isInteger(limit) && limit-- > 0) {
      result.push(this.model.getNextState());
    }
    return result;
  }
}

module.exports = LocationAnalyzer;