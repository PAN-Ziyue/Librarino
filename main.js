const electron = require('electron')
const app = electron.app
const {dialog} = require('electron')
const fs = require('fs')
const mysql = require('mysql')
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
            role: 'reload',
            accelerator: null
        },
        { type: 'separator' },
        {
            label: 'Close',
            role: 'close',
            // accelerator: 'CmdOrCtrl+W'
        }
    ]
}, {
    label: 'View',
    submenu: [
        {
            label: 'Minimize',
            role: 'minimize'
        }, {
            label: 'Full Screen',
            role: 'togglefullscreen'
        }
    ]
}]


app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        minWidth: 680,
        height: 600,
        icon: './assets/icon.png',
        webPreferences: { nodeIntegration: true }
    })
    mainWindow.loadFile('index.html')
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

    Connect()

    mainWindow.on('closed', () => {
        mainWindow = null
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

function Connect() {
    var config
    fs.readFile('./config.json', 'utf8', (err, jsonString) => {
        if (err) {
            dialog.showErrorBox('ERROR', 'Cannot Find Configuration')
            app.quit()
        }
        try {
            config = JSON.parse(jsonString)
        } catch(err) {
            console.log('Error parsing configuration:', err)
        }
    })

    // var connection = mysql.createConnection({
    //     host: config.host,
    //     user: config.user,
    //     password: config.password,
    //     database: config.database
    // })
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'AlphaVake_903517',
        database: 'library'
    })
    connection.connect()
}

