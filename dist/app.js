import { app, BrowserWindow, globalShortcut, remote } from 'electron';
var win = null, contents = null;
function createWindow() {
    win = new BrowserWindow({
        width: 540,
        height: 300,
        frame: false,
        titleBarStyle: 'customButtonsOnHover',
        // alwaysOnTop: true,
        webPreferences: {
            enableRemoteModule: true
        }
    });
    win.loadURL('https://youtu.be/AhIEUVZxcq4');
    contents = win.webContents;
    win.on('enter-html-full-screen', function () {
        win.isFullScreen() && win.setFullScreen(false);
    });
}
var fullScreen = function () {
    setTimeout(function () {
        contents.sendInputEvent({ keyCode: 'F', type: 'char' });
        var consoleMain = remote.getGlobal('console');
        consoleMain.log('Funcionou');
    }, 10000);
};
var createShortcuts = function () {
    globalShortcut.register('CmdOrCtrl+J', function () { return contents.toggleDevTools(); });
};
app.whenReady()
    .then(createWindow)
    .then(createShortcuts)
    .then(fullScreen);
// Quit when all windows are closed.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
//# sourceMappingURL=app.js.map