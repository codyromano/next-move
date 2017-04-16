'use strict';

const fs = require('fs');
const emitter = require('./Emitter');

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
        }).on('end', () => resolve(data));
      });

      return loadContent;
    });
  }
}

module.exports = LocationFileHandler;