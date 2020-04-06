const { app, BrowserWindow } = require('electron')
const electron = require('electron')
const { dialog } = require('electron')
const fs = require('fs')
const mysql = require('mysql')
const Menu = electron.Menu
var path = require('path')

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

let win
app.on('ready', () => {
    win = new BrowserWindow({
        width: 800,
        minWidth: 680,
        height: 600,
        icon: './assets/icon.png',
        webPreferences: { nodeIntegration: true }
    })
    win.loadFile('index.html')
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

    mysqlConnect()

    win.on('closed', () => {
        win = null
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

function mysqlConnect() {
    var config = require('./db-config')
    var connection = mysql.createConnection(config.db)
    connection.connect()
}







// connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'AlphaVake_903517',
//     database: 'library'
// })