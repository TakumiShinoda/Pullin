var mode = false;
var urlTree = {
  urls: [],
  position: -1,
  status: 'top'
}

$(document).ready(() => {
  var webview = document.getElementById('searchView');

  webview.openDevTools();

  webview.addEventListener('dom-ready', () => {
    $.get(jsPath('/index/webviewResources/addWebView/beforeLoad.js'), (text) => {
      webview.executeJavaScript(text, false, () => {
        console.log("before load");
      });
    });
  });

  webview.addEventListener('did-finish-load', () => {
    $.get(jsPath('/index/webviewResources/addWebView/afterLoad.js'), (text) => {
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
      case 'moveSite':
        var url = ev.args[0];
        var urls = urlTree.urls;
        var lastPos = urlTree.urls.length - 1;
        var position = urlTree.position;
        var status = urlTree.status;

        if(status == "top"){
          if(position < lastPos){
            var diff = lastPos - position;

            for(var i = 0; i < diff; i++){
              urls.pop();
            }
          }
          urls.push(url);
          urlTree.position += 1;

          storage.get('histories', (err, data) => {
            var histUrl = data.histories.urls;
            var histAccess = data.histories.access;

            var now = new Date();
            let year = now.getFullYear();
            let month = now.getMonth() + 1;
            let day = now.getDate();
            let hour = now.getHours();
            let minute = now.getMinutes();
            let second = now.getSeconds();

            if(err){throw err}
            if(histUrl.indexOf(url) < 0){
              histUrl.push(url);
              histAccess.push(year + '_' + month + '_' + day + '_' + hour + '_' + minute + '_' + second);
            }else{
              histAccess[histUrl.indexOf(url)] = year + '_' + month + '_' + day + '_' + hour + '_' + minute + '_' + second;
            }
            storage.set('histories', data, (err) => {
              if(err){throw err}
            });
          });
        }else if(status == "backed"){
          urlTree.status = 'top';
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

  $('#back').on('click', () => {
    if(urlTree.position > 0){
      urlTree.status = 'backed';
      urlTree.position -= 1;
      $('#searchView')[0].src = urlTree.urls[urlTree.position];
    }
  });

  $('#next').on('click', () => {
    if(urlTree.position < urlTree.urls.length - 1){
      urlTree.status = 'backed';
      urlTree.position += 1;
      $('#searchView')[0].src = urlTree.urls[urlTree.position];
    }
  });

  $('#history').on('click', () => {
    webview.src = "histories.html";
  });
});
