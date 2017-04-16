'use strict';

const jsonfile = require('jsonfile')

const LocationParser = require('./LocationParser');
const LocationFileHandler = require('./LocationFileHandler');
const LocationModel = require('./LocationModel');
const LocationAnalyzer = require('./LocationAnalyzer');

const parser = new LocationParser();
const model = new LocationModel(parser);
const analyzer = new LocationAnalyzer(parser, model);

const fileHandler = new LocationFileHandler();
const getLocHistory = fileHandler.getFileContents(
  './LocationHistory.json', 'utf8');

getLocHistory.then(unparsedJson => {
  const locHistory = parser.parseLocFileContents(unparsedJson);
  model.addLocations(locHistory);

  // These values should correspond to a lat/lon in your location history
  const startLocation = {latitude: 45, longitude: -121};
  const waypoints = analyzer.predictPath(startLocation, 20);

  jsonfile.writeFile('waypoints.json', waypoints);
});