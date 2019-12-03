// Core node modules
const { unzipSync } = require("zlib");
const fs = require("fs");


// Clean each resulant chunk of unformatted json
function parseTarball(inputFilePath) {
  // Get the buffer from the file
  const buffer = fs.readFileSync(inputFilePath);

  return unzipSync(buffer)
    .toString("utf-8")
    .split("\0ustar") // Separate into headers & files
    .slice(2) // First 2 entries are headers
    .map(rawJsonString => getFormattedJSON(rawJsonString));
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

const jsonArray = parseTarball("./tarballs/array-1-item.tar.gz");
console.log(JSON.stringify(jsonArray, null, 2));
