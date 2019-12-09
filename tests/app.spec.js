const chai = require("chai");
const expect = chai.expect;

const tarball2JS = require("../main");

describe("Valid JSON Arrays", () => {
  describe("given a tarball containing 1 valid jsonArray file", () => {
    it("should return an array", done => {
      tarball2JS.extractJSONArray(
        "./tarballs/array-1-item.tar.gz",
        (err, results) => {
          expect(err).to.be.null;
          expect(Array.isArray(results)).to.be.true;
          done();
        }
      );
    });
  });

  describe("given a tarball containing 1 valid jsonArray file", () => {
    it("should return an array of length 1", done => {
      tarball2JS.extractJSONArray(
        "./tarballs/array-1-item.tar.gz",
        (err, results) => {
          expect(err).to.be.null;
          expect(results.length === 1).to.be.true;
          done();
        }
      );
    });
  });

  describe("given a tarball containing 3 valid jsonArray files", () => {
    it("should return an array of length 3", done => {
      tarball2JS.extractJSONArray(
        "./tarballs/array-3-items.tar.gz",
        (err, results) => {
          expect(err).to.be.null;
          expect(results.length === 3).to.be.true;
          done();
        }
      );
    });
  });

  describe("given a tarball containing no files", () => {
    it("should return an empty array", done => {
      tarball2JS.extractJSONArray(
        "./tarballs/no-files.tar.gz",
        (err, results) => {
          expect(err).to.be.null;
          expect(results.length === 0).to.be.true;
          done();
        }
      );
    });
  });
});

describe("Valid JSON Object", () => {
  describe("given a tarball containing 1 valid json Object file", () => {
    it("should return an array", done => {
      tarball2JS.extractJSONArray(
        "./tarballs/array-1-item.tar.gz",
        (err, results) => {
          expect(err).to.be.null;
          expect(Array.isArray(results)).to.be.true;
          done();
        }
      );
    });
  });

  describe("given a tarball containing 1 valid json Object file", () => {
    it("should return an array of length 1", done => {
      tarball2JS.extractJSONArray(
        "./tarballs/array-1-item.tar.gz",
        (err, results) => {
          expect(err).to.be.null;
          expect(results.length === 1).to.be.true;
          done();
        }
      );
    });
  });

  describe("given a tarball containing 1 empty json Object file", () => {
    it("should return an array of length 1", done => {
      tarball2JS.extractJSONArray(
        "./tarballs/empty-obj.tar.gz",
        (err, results) => {
          expect(err).to.be.null;
          expect(results.length === 1).to.be.true;
          done();
        }
      );
    });
  });
});

describe("Invalid JSON Types", () => {
  describe("given a tarball containing 1 invalid jsonArray file", () => {
    it("should throw an InvalidJSON error", done => {
      tarball2JS.extractJSONArray(
        "./tarballs/invalid-array.tar.gz",
        (err, results) => {
          expect(err.message).to.equal(
            "InvalidJSON: Failed to parse 'invalid-array.tar.gz'"
          );
          expect(results).to.be.undefined;
          done();
        }
      );
    });
  });

  describe("given a tarball containing 1 invalid json Object file", () => {
    it("should throw an InvalidJSON error", done => {
      tarball2JS.extractJSONArray(
        "./tarballs/invalid-obj.tar.gz",
        (err, results) => {
          expect(err.message).to.equal(
            "InvalidJSON: Failed to parse 'invalid-obj.tar.gz'"
          );
          expect(results).to.be.undefined;
          done();
        }
      );
    });
  });
});

describe("Invalid Path supplied", () => {
  describe("given a file that doesn't exist", () => {
    it("should throw a FileNotFound error", done => {
      tarball2JS.extractJSONArray(
        "./tarballs/invalid-filename.tar.gz",
        (err, results) => {
          expect(err.message).to.equal(
            "FileNotFound: 'invalid-filename.tar.gz'"
          );
          expect(results).to.be.undefined;
          done();
        }
      );
    });
  });

  describe("given empty filePath argument", () => {
    it("should throw an InvalidArgument error", done => {
      tarball2JS.extractJSONArray("", (err, results) => {
        expect(err.message).to.equal(
          "InvalidArgument: Invalid file path supplied"
        );
        expect(results).to.be.undefined;
        done();
      });
    });
  });

  describe("given NO filePath argument", () => {
    it("should throw an InvalidArgument error", done => {
      tarball2JS.extractJSONArray(null, (err, results) => {
        expect(err.message).to.equal(
          "InvalidArgument: Invalid file path supplied"
        );
        expect(results).to.be.undefined;
        done();
      });
    });
  });

  describe("given empty file", () => {
    it("should throw an EmptyFile error", done => {
      tarball2JS.extractJSONArray("./tarballs/empty.tar.gz", (err, results) => {
        expect(err.message).to.equal("EmptyFile: 'empty.tar.gz'");
        expect(results).to.be.undefined;
        done();
      });
    });
  });

  describe("given wrong file type", () => {
    it("should throw an InvalidFileFormat error", done => {
      tarball2JS.extractJSONArray("./tarballs/not-a-tar.gz", (err, results) => {
        expect(err.message).to.equal("InvalidFileFormat: 'not-a-tar.gz'");
        expect(results).to.be.undefined;
        done();
      });
    });
  });
});
