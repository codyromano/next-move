'use strict';

const emitter = require('./Emitter');
const log = message => console.log(message);

let lastProgress = 0;

emitter.on('logInfo', message => log(message));
emitter.on('loadLocationFileProgress', (fileName, progress) => {
  // Log every progress every 25%
  progress = Math.round(progress);
  if (progress !== lastProgress && progress % 25 === 0) {
    log(`Loading ${fileName} (${progress}%)`);
    lastProgress = progress;
  }
});