'use strict';

const path = require('path');
const fs = require('fs');
const jsonfile = require('jsonfile');
const emitter = require('./Emitter');
const config = require('./config');

class LocationFileHandler {
  getFileSize(locFile) {
    return new Promise(resolve => {
      fs.stat(locFile, (err, stats) => resolve(stats.size));
    });
  }
  getFileContents(locFile, encoding) {
    return this.getFileSize(locFile).then(size => {
      const stream = fs.createReadStream(locFile, encoding);
      let data = '';

      const loadContent = new Promise(resolve => {
        stream.on('data', chunk => {  
          data += chunk;
          emitter.emit(`loadLocationFileProgress`, locFile,
            (data.length / size) * 100);
        }).on('end', function() {
          resolve(data);
        });
      });

      return loadContent;
    });
  }
  writeWaypoints(waypoints) {
    const filename = path.join(__dirname, config.waypointsFilename);
    jsonfile.writeFile(filename, waypoints);
    emitter.emit('logInfo', `Created ${filename}`);
  }
}

module.exports = LocationFileHandler;