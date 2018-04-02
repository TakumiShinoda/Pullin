console.log('load finished');
const ipc = require('electron').ipcRenderer;

var mode = false;
var tags = document.getElementsByTagName("*");

function elementSelect(){
  var ele = $(':hover');

  if(mode){
    ele[ele.length - 1].style.backgroundColor = 'rgba(122, 0, 0, 0.5)';
  }
}

function elementOut(ele){
  ele.style.backgroundColor = '';
}

for(var i = 0; i < tags.length; i++){
  tags[i].setAttribute('onmouseover', 'elementSelect()')
  tags[i].setAttribute('onmouseout', 'elementOut(this)')
}

ipc.on('modeChange', () => {
  mode = !mode;
  ipc.sendToHost('modeSync', mode);
});
