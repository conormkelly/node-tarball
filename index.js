// Core node modules
const { unzipSync } = require('zlib');
const path = require('path');
const fs = require('fs');

// Local files
const { determineError } = require('./lib/errorFactory');
const { getFormattedJSON } = require('./lib/jsonUtils');

// Constants
const {
  STRING_ENCODING,
  TARFILE_SEPARATOR,
  HEADERS_LENGTH
} = require('./lib/constants');

/**
 * Returns a JSON array from a tar.gz file containing one or more valid JSON files.
 * @param {string} inputFilePath
 * @param {(err: Error, results: any[]) => void} onComplete
 */
module.exports.extractJSONArray = (inputFilePath, onComplete) => {
  let filename;

  try {
    filename = path.basename(inputFilePath);
    const buffer = fs.readFileSync(inputFilePath);

    const results = unzipSync(buffer)
      .toString(STRING_ENCODING)
      .split(TARFILE_SEPARATOR) // Separate into headers & files
      .slice(HEADERS_LENGTH) // First 2 entries are headers
      .map(rawJsonString => getFormattedJSON(rawJsonString));

    onComplete(null, results);
  } catch (err) {
    const error = determineError(err, filename);
    onComplete(error);
  }
};
