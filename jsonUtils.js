exports.getFormattedJSON = rawJsonString => {
  const openingBraces = ["{", "["];
  const closingBraces = ["}", "]"];

  // Removes chars outside the braces
  return JSON.parse(
    rawJsonString.substring(
      firstIndexOf(openingBraces, rawJsonString),
      lastIndexOf(closingBraces, rawJsonString) + 1
    )
  );
};

const firstIndexOf = (chars, str) => {
  return Math.min(...chars.map(c => str.indexOf(c)).filter(n => n > -1));
};

const lastIndexOf = (chars, str) => {
  return Math.max(...chars.map(c => str.lastIndexOf(c)));
};
