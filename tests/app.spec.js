const chai = require("chai");
const expect = chai.expect;

const tarball2JS = require("../app");

describe("Valid JSON Arrays", () => {
  describe("given a tarball containing 1 valid jsonArray file", () => {
    it("should return an array", () => {
      const resultData = tarball2JS.parseTarball(
        "./tarballs/array-1-item.tar.gz"
      );

      expect(Array.isArray(resultData)).to.be.true;
    });
  });

  describe("given a tarball containing 1 valid jsonArray file", () => {
    it("should return an array of length 1", () => {
      const resultData = tarball2JS.parseTarball(
        "./tarballs/array-1-item.tar.gz"
      );
      expect(resultData.length === 1).to.be.true;
    });
  });

  describe("given a tarball containing 3 valid jsonArray files", () => {
    it("should return an array of length 3", () => {
      const resultData = tarball2JS.parseTarball(
        "./tarballs/array-3-items.tar.gz"
      );
      expect(resultData.length === 3).to.be.true;
    });
  });

  describe("given a tarball containing no files", () => {
    it("should return an empty array", () => {
      const resultData = tarball2JS.parseTarball("./tarballs/no-files.tar.gz");
      expect(resultData.length === 0).to.be.true;
    });
  });
});

describe("Valid JSON Object", () => {
  describe("given a tarball containing 1 valid json Object file", () => {
    it("should return an array", () => {
      const resultData = tarball2JS.parseTarball("./tarballs/valid-obj.tar.gz");

      expect(Array.isArray(resultData)).to.be.true;
    });
  });

  describe("given a tarball containing 1 valid json Object file", () => {
    it("should return an array of length 1", () => {
      const resultData = tarball2JS.parseTarball(
        "./tarballs/array-1-item.tar.gz"
      );
      expect(resultData.length === 1).to.be.true;
    });
  });

  describe("given a tarball containing 1 empty json Object file", () => {
    it("should return an array of length 1", () => {
      const resultData = tarball2JS.parseTarball("./tarballs/empty-obj.tar.gz");
      expect(resultData.length === 1).to.be.true;
    });
  });
});

describe("Invalid JSON Types", () => {
  describe("given a tarball containing 1 invalid jsonArray file", () => {
    it("should throw an InvalidJSON error", () => {
      expect(
        tarball2JS.parseTarball.bind(tarball2JS, "./tarballs/invalid-array.tar.gz")
      ).to.throw("InvalidJSON: Failed to parse 'invalid-array.tar.gz'");
    });
  });

  describe("given a tarball containing 1 invalid json Object file", () => {
    it("should throw an InvalidJSON error", () => {
      expect(
        tarball2JS.parseTarball.bind(tarball2JS, "./tarballs/invalid-obj.tar.gz")
      ).to.throw("InvalidJSON: Failed to parse 'invalid-obj.tar.gz'");
    });
  });

});

describe("Invalid Path supplied", () => {
  describe("given a file that doesn't exist", () => {
    it("should throw a FileNotFound error", () => {
      expect(
        tarball2JS.parseTarball.bind(tarball2JS, "./tarballs/invalid-filename.tar.gz")
      ).to.throw("FileNotFound: 'invalid-filename.tar.gz'");
    });
  });

  describe("given empty filePath argument", () => {
    it("should throw an InvalidArgument error", () => {
      expect(
        tarball2JS.parseTarball.bind(tarball2JS, "")
      ).to.throw("InvalidArgument: Invalid file path supplied");
    });
  });

  describe("given NO filePath argument", () => {
    it("should throw an InvalidArgument error", () => {
      expect(
        tarball2JS.parseTarball.bind(tarball2JS, null)
      ).to.throw("InvalidArgument: Invalid file path supplied");
    });
  });

  describe("given empty file", () => {
    it("should throw an EmptyFile error", () => {
      expect(
        tarball2JS.parseTarball.bind(tarball2JS, "./tarballs/empty.tar.gz")
      ).to.throw("EmptyFile: 'empty.tar.gz'");
    });
  });

  describe("given wrong file type", () => {
    it("should throw an InvalidFileFormat error", () => {
      expect(
        tarball2JS.parseTarball.bind(tarball2JS, "./tarballs/not-a-tar.gz")
      ).to.throw("InvalidFileFormat: 'not-a-tar.gz'");
    });
  });
});