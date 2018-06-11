const $ = require('jquery');
const ipc = require('electron').ipcRenderer;
const storage = require('electron-json-storage');
const {srcPath, distPath} = require('../../../dev/path');