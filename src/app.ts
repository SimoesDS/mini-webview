
import { app, BrowserWindow, globalShortcut, remote, WebContents } from 'electron';

let win: BrowserWindow = null, contents: WebContents = null;

function createWindow () {

  win = new BrowserWindow({
    width: 540,
    height: 300,
    frame: false,
    titleBarStyle: 'customButtonsOnHover',
    // alwaysOnTop: true,
    webPreferences: {
      enableRemoteModule: true
    },
  })

  win.loadURL('https://youtu.be/AhIEUVZxcq4')

  contents = win.webContents;

  win.on('enter-html-full-screen', () => {
    win.isFullScreen() && win.setFullScreen(false);
  })
}

const fullScreen = () => {
  setTimeout(() => {
    contents.sendInputEvent({ keyCode: 'F', type: 'char' });
    const consoleMain = remote.getGlobal('console');
    consoleMain.log('Funcionou')
  },
  10000);
}

const createShortcuts = () => {
  globalShortcut.register('CmdOrCtrl+J', () => contents.toggleDevTools());
}

app.whenReady()
  .then(createWindow)
  .then(createShortcuts)
  .then(fullScreen)

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