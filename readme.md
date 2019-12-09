# node-tarball

## About

This is a simple pure node solution for parsing a tarball (_.tar.gz_) containing one or more _.json_ files.

## Usage

```javascript
extractJSONArray('./example.tar.gz', (err, results) => {
  if (!err) {
    console.log(results);
  }
}
```

### Limitations

This only works for tarballs containing **only** valid JSON files.

## Unit tests

Run `npm test`.
