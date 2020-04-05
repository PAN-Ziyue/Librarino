const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu

const template = [{
    label: 'System',
    submenu: [
        {
            label: 'About',
            role: 'about',
            click: () => {
                electron.shell.openExternal('https://github.com/PAN-Ziyue/Librarino/wiki/About-Librarino')
            }
        },
        {
            label: 'Log out',
            role: 'reload'
        },
        { type: 'separator' },
        {
            label: 'Close',
            role: 'quit'
        }
    ]
}]

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        minWidth: 680,
        height: 600,
        webPreferences: { nodeIntegration: true }
    })
    mainWindow.loadFile('index.html')
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
    mainWindow.on('closed', () => {
        mainWindow = null
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

