$(document).ready(() => {
  var newsWebViews = document.getElementsByClassName('newsView');

  for(var i = 0; i < newsWebViews.length; i++){
    var viewResize = new Promise((rs, rj) => {
      var n = newsWebViews[i];
      n.src = 'http://www.gooogle.com';
      n.addEventListener('dom-ready', () => {
        $.get(jsPath('/index/webviewResources/newsWebView/beforeLoad.js'), (text) => {
          n.executeJavaScript(text, false, () => {
          });
        });
      });
      n.addEventListener('did-finish-load', () => {
        $.get(jsPath('/index/webviewResources/newsWebView/afterLoad.js'), (text) => {
          n.executeJavaScript(text, false, () => {
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
