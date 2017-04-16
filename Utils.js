'use strict';

const Utils = {
  random(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
};

module.exports = Utils;