module.exports = {
  srcPath: {
  },
  distPath: {
    bundle: (file) => {
      if(file == undefined){
        return undefined;
      }
      return __dirname + '/../dist/bundles' + file;
    },
    images: (file) => {
      if(file == undefined){
        return undefined;
      }
      return __dirname + '/../dist/images' + file;
    },
    js: (file) => {
      if(file == undefined){
        return undefined;
      }
      return __dirname + '/../dist/js' + file;
    },
    views: (file) => {
      if(file == undefined){
        return undefined;
      }
      return __dirname + '/../dist/views' + file;
    },
  }
}