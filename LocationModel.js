'use strict';

class LocationModel {
  constructor(parser) {
    this.parser = parser;
    this.markov = {};
    this.currentState = null;
  }
  addLocations(locations) {
    if (locations.length < 2) {
      return 0;
    }

    let totalAdded = 0;

    locations.slice(0, -1).forEach((loc, i) => {
      const nextLoc = locations[i + 1];
      this.markov[loc] = this.markov[loc] || [];
      if (this.markov[loc].indexOf(nextLoc) === -1) {
        this.markov[loc] = this.markov[loc].concat(nextLoc);
      }
      ++totalAdded;
    });

    return totalAdded;
  }
  setState(state) {
    if (this.markov[state]) {
      this.currentState = state;
      return true;
    }
    return false;
  }
  getNextState() {
    const maybeNext = this.markov[this.currentState];
    const next = maybeNext[Math.floor(Math.random() * maybeNext.length)];
    return next || null;
  }
}

module.exports = LocationModel;