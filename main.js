const {app, BrowserWindow} = require('electron');
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
app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName))
app.commandLine.appendSwitch('ppapi-flash-version', '17.0.0.169')

app.on('ready', () => {
  mainWindow = new BrowserWindow({
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
