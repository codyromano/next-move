'use strict';

const config = require('./config');
const emitter = require('./Emitter');

const LocationParser = require('./LocationParser');
const LocationFileHandler = require('./LocationFileHandler');
const LocationModel = require('./LocationModel');
const LocationAnalyzer = require('./LocationAnalyzer');
const LocationLogger = require('./LocationLogger');

const parser = new LocationParser();
const model = new LocationModel(parser);
const analyzer = new LocationAnalyzer(parser, model);

const fileHandler = new LocationFileHandler();
const getLocHistory = fileHandler.getFileContents(
  './LocationHistory.json', 'utf8');

getLocHistory.then(unparsedJson => {
  const locHistory = parser.parseLocFileContents(unparsedJson);
  model.addLocations(locHistory);

  const randomLatLon = model.getRandomState();
  const startLocation = parser.objectify(randomLatLon);

  emitter.emit('logInfo',
    `Starting at ${randomLatLon} (random location)`);

  const waypoints = analyzer.predictPath(startLocation, config.totalWaypoints);
  fileHandler.writeWaypoints(waypoints);
});