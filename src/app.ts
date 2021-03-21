import { app, BrowserWindow, globalShortcut, remote, WebContents } from 'electron';
import * as path from "path";

let win: BrowserWindow = null, contents: WebContents = null;

function createWindow () {

  win = new BrowserWindow({
    width: 480,
    height: 270,
    x: 1440,
    y: 745,
    frame: false,
    titleBarStyle: 'customButtonsOnHover',
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      enableRemoteModule: true
    },
  })

  win.loadURL('https://www.google.com')

  contents = win.webContents;

  win.on('enter-html-full-screen', () => {
    win.isFullScreen() && win.setFullScreen(false);
  });

  contents.openDevTools();
}

const createShortcuts = () => {
  globalShortcut.register('CmdOrCtrl+J', () => contents.toggleDevTools());
}

app.whenReady()
  .then(createWindow)
  .then(createShortcuts);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
  }
})