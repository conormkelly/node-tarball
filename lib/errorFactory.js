/**
 * Converts errors into more helpful/readable forms.
 */
exports.determineError = (err, filename) => {
  if (!filename) {
    return Error(`InvalidArgument: Invalid file path supplied`);
  } else if (
    err.message.includes('Unexpected end of JSON input') ||
    err.message.includes('Unexpected token')
  ) {
    return Error(`InvalidJSON: Failed to parse '${filename}'`);
  } else if (err.message.includes('no such file or directory')) {
    return Error(`FileNotFound: '${filename}'`);
  } else if (err.message.includes('unexpected end of file')) {
    return Error(`EmptyFile: '${filename}'`);
  } else if (err.message.includes('incorrect header check')) {
    return Error(`InvalidFileFormat: '${filename}'`);
  } else {
    return err;
  }
};
