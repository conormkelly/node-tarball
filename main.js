// Core node modules
const { unzipSync } = require('zlib');
const path = require('path');
const fs = require('fs');

// Local files
const { determineError } = require('./errorFactory');
const { getFormattedJSON } = require('./jsonUtils');

module.exports.extractJSONArray = (inputFilePath, onComplete) => {
  let filename;

  try {
    filename = path.basename(inputFilePath);
    // Get the buffer from the file
    const buffer = fs.readFileSync(inputFilePath);

    const results = unzipSync(buffer)
      .toString('utf-8')
      .split('\0ustar') // Separate into headers & files
      .slice(2) // First 2 entries are headers
      .map(rawJsonString => getFormattedJSON(rawJsonString));

    onComplete(null, results);
  } catch (err) {
    const error = determineError(err, filename);
    onComplete(error);
  }
};
