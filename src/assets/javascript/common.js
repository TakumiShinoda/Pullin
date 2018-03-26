$(document).ready(() => {
  $('.menuSelector').on('click', (ev) => {
    hide('.contents');
    show('.' + ev.target.attributes.name.value);
  });

  var webview = document.getElementById('searchView');
  console.log($('#searchView'));

  webview.openDevTools();
  webview.addEventListener('did-finish-load', () => {
    console.log('fin')
    webview.executeJavaScript('console.log($(":hover"));', false, () => {
      console.log("suc");
    })
  });
});

function hide(ele){
  $(ele).css('display', 'none');
}

function show(ele){
  $(ele).css('display', 'block');
}
