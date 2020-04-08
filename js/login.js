function validate() {
    var mysql = require('mysql')
    var config = require('./db-config')
    var connection = mysql.createConnection(config.db)
    connection.connect()

    var username = document.getElementById('username').value
    var password = document.getElementById('password').value

    if (username && password) {
        connection.query('SELECT * FROM admin WHERE admin_id= ? AND password = ?', [username, password], function (error, results, fields) {
            if (results.length > 0) {
                window.location.href='./pages/insert.html'
                setTimeout("javascript:location.href='./pages/insert.html'", 5000)
            } else {
                window.location.href='./pages/error.html'
                setTimeout("javascript:location.href='./pages/error.html'", 5000)
            }
        })
    }
}