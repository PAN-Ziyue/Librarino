const { app, BrowserWindow } = require('electron')
const electron = require('electron')
const fs = require('fs')
const mysql = require('mysql')
const Alert = require("electron-alert")
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
        },{
            label: 'Log out',
            click: () => {
                win.loadFile('index.html')
            },
            accelerator: 'CmdOrCtrl+R'
        },{
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
let alert = new Alert();
let swalOptions = {
	title: "Are you sure you want to delete?",
	text: "You won't be able to revert this!",
	type: "warning",
	showCancelButton: true
};

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
    win.loadFile('index.html')
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
    // win.openDevTools()
    // initDB()


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
    var connection = mysql.createConnection(config.db)
    connection.connect()
}
