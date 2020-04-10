const mysql = require('mysql')
const config = require('../db-config')
const electron = require('electron')
const ipc = electron.ipcRenderer
var conn = mysql.createConnection(config.db)
conn.connect()

function validate() {
    var username = document.getElementById('username').value
    var password = document.getElementById('password').value

    if (username && password) {
        conn.query('SELECT * FROM admin WHERE admin_id= ? AND password = ?', [username, password], function (error, results, fields) {
            if (results.length > 0) {
                ipc.send('save-admin-id', username)
                window.location.href = './insert.html'
                setTimeout("javascript:location.href='./insert.html'", 5000)
            } else {
                window.location.href = './error.html'
                setTimeout("javascript:location.href='./error.html'", 5000)
            }
        })
    }
}
