const { app, BrowserWindow} = require('electron')
const electron = require('electron')
const ipc = electron.ipcMain
const fs = require('fs')
const cp = require('child_process')
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
        }, {
            label: 'Log out',
            click: () => {
                win.loadFile('login.html')
            },
            accelerator: 'CmdOrCtrl+R'
        }, {
            label: 'Minimize',
            role: 'minimize'
        },
        { type: 'separator' },
        {
            label: 'Close',
            role: 'close',
            // accelerator: 'CmdOrCtrl+W'
        }
    ]
}]

let win
app.on('ready', () => {
    win = new BrowserWindow({
        width: 600,
        minWidth: 600,
        maxWidth: 600,
        height: 800,
        minHeight: 800,
        maxHeight: 800,
        icon: './assets/favicon/icon.png',
        webPreferences: { nodeIntegration: true }
    })
    win.loadFile('./pages/login.html')
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
    // win.openDevTools()
    initDB()

    win.on('closed', () => {
        win = null
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

function initDB() {
    var mysql = require('mysql')
    var config = require('./db-config')
    var cmdline = "mysql --user=" + config.db.user + " --password=" + config.db.password + " < ./init.sql"
    cp.exec(cmdline, function (error, stdout, stderr) {
        console.log(error, stdout, stderr)
    })
}

var admin_id_main
ipc.on('save-admin-id', function(event, arg){
    admin_id_main = arg
})

ipc.on('query-admin-id',function(event, arg){
    event.sender.send('send-admin-id', admin_id_main)
})