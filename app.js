// Core node modules
const { unzipSync } = require("zlib");

const path = require("path");
const fs = require("fs");

// Clean each resulant chunk of unformatted json
module.exports.parseTarball = inputFilePath => {
  let filename;

  try {
    filename = path.basename(inputFilePath);
    // Get the buffer from the file
    const buffer = fs.readFileSync(inputFilePath);

    return unzipSync(buffer)
      .toString("utf-8")
      .split("\0ustar") // Separate into headers & files
      .slice(2) // First 2 entries are headers
      .map(rawJsonString => getFormattedJSON(rawJsonString));
  } catch (err) {
    handleError(err, filename);
  }
};

function handleError(err, filename) {
  if (!filename) {
    throw new Error(`InvalidArgument: Invalid file path supplied`);
  } else if (
    err.message.includes("Unexpected end of JSON input") ||
    err.message.includes("Unexpected token")
  ) {
    throw new Error(`InvalidJSON: Failed to parse '${filename}'`);
  } else if (err.message.includes("no such file or directory")) {
    throw new Error(`FileNotFound: '${filename}'`);
  } else if (err.message.includes("unexpected end of file")) {
    throw new Error(`EmptyFile: '${filename}'`);
  } else if (err.message.includes("incorrect header check")) {
    throw new Error(`InvalidFileFormat: '${filename}'`);
  } else {
    throw err;
  }
}

function getFormattedJSON(rawJsonString) {
  const openingBraces = ["{", "["];
  const closingBraces = ["}", "]"];

  // Removes chars outside the braces
  return JSON.parse(
    rawJsonString.substring(
      firstIndexOf(openingBraces, rawJsonString),
      lastIndexOf(closingBraces, rawJsonString) + 1
    )
  );
}

// Helper functions
function firstIndexOf(chars, str) {
  return Math.min(...chars.map(c => str.indexOf(c)).filter(n => n > -1));
}

function lastIndexOf(chars, str) {
  return Math.max(...chars.map(c => str.lastIndexOf(c)));
}
