const electron = require('electron');
const path = require('path');

let pluginName

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
electron.app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName))

electron.app.commandLine.appendSwitch('ppapi-flash-version', '17.0.0.169')

electron.app.on('ready', () => {
  mainWindow = new electron.BrowserWindow({
    width: 1280,
    height: 800,
    resizable: false,
    movable: true,
    webPreferences: {
      plugins: true
    },
  });
  mainWindow.loadURL('file://' + __dirname + '/dist/views/index/index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
