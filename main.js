// Core node modules
const { unzipSync } = require("zlib");
const path = require("path");
const fs = require("fs");

// Local files
const { determineError } = require("./errorFactory");
const { getFormattedJSON } = require("./jsonUtils");

// Constants
const {
  STRING_ENCODING,
  TARFILE_SEPARATOR,
  HEADER_DATA
} = require("./constants");

module.exports.extractJSONArray = (inputFilePath, onComplete) => {
  let filename;

  try {
    filename = path.basename(inputFilePath);
    const buffer = fs.readFileSync(inputFilePath);

    const results = unzipSync(buffer)
      .toString(STRING_ENCODING)
      .split(TARFILE_SEPARATOR) // Separate into headers & files
      .slice(HEADER_DATA) // First 2 entries are headers
      .map(rawJsonString => getFormattedJSON(rawJsonString));

    onComplete(null, results);
  } catch (err) {
    const error = determineError(err, filename);
    onComplete(error);
  }
};
