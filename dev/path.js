const path = require('path');

module.exports = {
  srcPath: {
    js: (file) => {
      return path.resolve(__dirname, '../src/assets/javascript') + file;
    },
    entries: (file) => {
      return path.resolve(__dirname, '../src/entries') + file;
    }
  },
  distPath: {
    bundle: (file) => {
      return __dirname + '/../dist/bundles' + file;
    },
    images: (file) => {
      return __dirname + '/../dist/images' + file;
    },
    js: (file) => {
      return __dirname + '/../dist/js' + file;
    },
    views: (file) => {
      return __dirname + '/../dist/views' + file;
    },
  }
}