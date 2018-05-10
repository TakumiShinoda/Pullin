module.exports = {
  methods:{
    cur_view: () => {
      var url = location.pathname;
      var urlArr = url.split('/');
      return urlArr[urlArr.length - 2];
    },
  },
  bundlePath: (file) => {
    if(file == undefined){
      return undefined;
    }
    return __dirname + '/dist/bundles' + file;
  },
  imagesPath: (file) => {
    if(file == undefined){
      return undefined;
    }
    return __dirname + '/dist/images' + file;
  },
  jsPath: (file) => {
    if(file == undefined){
      return undefined;
    }
    return __dirname + '/dist/js' + file;
  },
  viewsPath: (file) => {
    if(file == undefined){
      return undefined;
    }
    return __dirname + '/dist/views' + file;
  },
}
