const $ = require('jquery');
const ipc = require('electron').ipcRenderer;
const storage = require('electron-json-storage');
const {bundlePath, imagesPath, jsPath, viewsPath} = require('../../../router');
