const electron = require('electron');

electron.app.on('ready', () => {
  mainWindow = new electron.BrowserWindow({
    width: 1280,
    height: 800,
    resizable: false,
    movable: true,
  });
  mainWindow.loadURL('file://' + __dirname + '/dist/views/index/index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
