const {app, BrowserWindow} = require('electron');
const path = require('path');
const fs = require('fs');
const storage = require('electron-json-storage');

let pluginName
let histories = {
  histories: {
    urls: [],
    access: [],
  }
}

switch(process.platform){
  case 'win32':
    pluginName = 'pepflashplayer.dll'
    break
  case 'darwin':
    pluginName = 'PepperFlashPlayer.plugin'
    break
  case 'linux':
    pluginName = 'libpepflashplayer.so'
    break
}
app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName))
app.commandLine.appendSwitch('ppapi-flash-version', '	29.0.0.140')

app.on('ready', () => {
  var mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    resizable: false,
    movable: true,
    webPreferences: {
      plugins: true
    },
  });

  storage.get('test', (err, data) => {
    if(err){throw err}
    if(Object.keys(data) == 0){
      storage.set('histories', histories, (err) => {
        if(err){throw err}
      });
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  mainWindow.loadURL('file://' + __dirname + '/dist/views/index/index.html');
});
