exports.determineError = (err, filename) => {
  if (!filename) {
    return new Error(`InvalidArgument: Invalid file path supplied`);
  } else if (
    err.message.includes('Unexpected end of JSON input') ||
    err.message.includes('Unexpected token')
  ) {
    return new Error(`InvalidJSON: Failed to parse '${filename}'`);
  } else if (err.message.includes('no such file or directory')) {
    return new Error(`FileNotFound: '${filename}'`);
  } else if (err.message.includes('unexpected end of file')) {
    return new Error(`EmptyFile: '${filename}'`);
  } else if (err.message.includes('incorrect header check')) {
    return new Error(`InvalidFileFormat: '${filename}'`);
  } else {
    return err;
  }
};
