'use strict';

const config = require('./config');
const emitter = require('./Emitter');
const Utils = require('./Utils');

class LocationModel {
  constructor(parser) {
    this.parser = parser;
    this.markov = {};
    this.currentState = null;
    this.frequencies = {};
    this.visited = {};

    this.filterPossibleNext = this.filterPossibleNext.bind(this);
  }
  getRandomState() {
    return Utils.random(Object.keys(this.markov));
  }
  getMode() {
    let maxFrequency = 0;
    let result = null;

    for (const latLon in this.frequencies) {
      const freq = this.frequencies[latLon];
      if (freq > maxFrequency) {
        maxFrequency = freq;
        result = latLon;
      }
    }
    return result;
  }
  addLocations(locations) {
    const total = locations.length;
    if (total < 2) {
      return 0;
    }
    emitter.emit('logInfo', `Creating model from ${total} waypoints`);

    let totalAdded = 0;

    locations.slice(0, -1).forEach((loc, i) => {
      const nextLoc = locations[i + 1];
      this.markov[loc] = this.markov[loc] || [];

      this.frequencies[loc] = this.frequencies[loc] || 0;
      this.frequencies[loc]+= 1;

      // TODO: Each state could be associated with a hashmap instead of
      // an array so we don't have to iterate with indexOf to check for dupes
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
  filterPossibleNext(state) {
    if (config.noRevisits) {
      if (this.visited[state]) {
        return false;
      } else {
        this.visited[state] = true;
        return true;
      }
    }
    return true;
  }
  getNextState() {
    // noRevisits
    const current = this.currentState;
    const maybeNext = this.markov[this.currentState].filter(
      this.filterPossibleNext);
    const next = Utils.random(maybeNext) || this.getRandomState();

    this.setState(next);
    emitter.emit('logInfo', `${current} => ${next}`);

    return next || null;
  }
}

module.exports = LocationModel;