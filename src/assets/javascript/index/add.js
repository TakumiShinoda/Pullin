var mode = false;

$(document).ready(() => {
  var webview = document.getElementById('searchView');

  webview.openDevTools();

  webview.addEventListener('dom-ready', () => {
    $.get('../../js/index/webviewResources/addWebView/beforeLoad.js', (text) => {
      webview.executeJavaScript(text, false, () => {
        console.log("before load");
      });
    });
  });

  webview.addEventListener('did-finish-load', () => {
    $.get('../../js/index/webviewResources/addWebView/afterLoad.js', (text) => {
      webview.executeJavaScript(text, false, () => {
        console.log("load finished");
      });
    });
  });

  webview.addEventListener('ipc-message', (ev) => {
    switch(ev.channel){
      case 'modeSync':
        var targetStyle = $('#modeChange')[0].style;
        mode = ev.args[0];

        if(mode){
          targetStyle.color = 'rgb(200, 0, 0)';
        }else{
          targetStyle.color = 'rgb(0, 0, 0)';
        }
        break;
      case 'finishedLoad':
        $('#searchView')[0].style.display = '';
        $('#loading')[0].style.display = 'none';
        break;
      default:
        console.log('recieve unknown task');
        break;
    }
  });

  $('#modeChange').on('click', (ev) => {
    webview.send('modeChange', 'hogehoge');
  });

  $('#home').on('click', (ev) => {
    $('#searchView')[0].style.display = 'none';
    $('#loading')[0].style.display = '';
    $('#searchView')[0].src = 'http://www.google.com';
  });

  $('#updatePage').on('click', (ev) => {
    webview.reloadPage();
  });
});
