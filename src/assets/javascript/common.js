$(document).ready(() => {
  $('.menuSelector').on('click', (ev) => {
    hide('.contents');
    show('.' + ev.target.attributes.name.value);
  });

  var webview = document.getElementById('searchView');

  webview.openDevTools();
  webview.addEventListener('did-finish-load', () => {
    $.get('../../js/index/webviewResources/webview.js', (text) => {
      webview.executeJavaScript(text, false, () => {
        console.log("suc");
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
