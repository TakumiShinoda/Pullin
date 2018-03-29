$(document).ready(() => {
  $('.menuSelector').on('click', (ev) => {
    hide('.contents');
    show('.' + ev.target.attributes.name.value);
  });

  var webview = document.getElementById('searchView');

  // webview.openDevTools();

  webview.addEventListener('dom-ready', () => {
    $.get('../../js/index/webviewResources/beforeLoad.js', (text) => {
      webview.executeJavaScript(text, false, () => {
        console.log("before load");
      });
    });
  });

  webview.addEventListener('did-finish-load', () => {
    $.get('../../js/index/webviewResources/afterLoad.js', (text) => {
      webview.executeJavaScript(text, false, () => {
        console.log("load finished");
      });
    });
  });
});

function hide(ele){
  $(ele).css('display', 'none');
}

function show(ele){
  $(ele).css('display', 'block');
}
