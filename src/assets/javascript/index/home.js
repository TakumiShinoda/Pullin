$(document).ready(() => {
  var newsWebViews = document.getElementsByClassName('newsView');

  for(var i = 0; i < newsWebViews.length; i++){
    var viewResize = new Promise((rs, rj) => {
      var n = newsWebViews[i];
      // n.openDevTools();
      n.src = 'http://www.gooogle.com';
      n.addEventListener('dom-ready', () => {
        $.get('../../js/index/webviewResources/newsWebView/newsBeforeLoad.js', (text) => {
          n.executeJavaScript(text, false, () => {
            console.log("before load");
          });
        });
      });
      n.addEventListener('did-finish-load', () => {
        $.get('../../js/index/webviewResources/newsWebView/newsAfterLoad.js', (text) => {
          n.executeJavaScript(text, false, () => {
            console.log("load finished");
          });
        });
      });

      rs(i);
    });

    viewResize.then((value) => {
    }, (err) => {
    });
  }
});
