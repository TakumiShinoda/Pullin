console.log('start load');
const ipc = require('electron').ipcRenderer;

var jqLoad = document.createElement('script');
jqLoad.setAttribute('src',"https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js");
jqLoad.setAttribute('type', "text/javascript")
document.head.appendChild(jqLoad);

ipc.sendToHost('moveSite', location.href);
