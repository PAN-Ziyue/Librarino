const mysql = require('mysql')
const {dialog} = require('electron').remote

function insertSingle() {
    var config = require('../db-config')
    var connection = mysql.createConnection(config.db)
    connection.connect()

    var bno = document.getElementById('bno').value
    var category = document.getElementById('category').value
    var title = document.getElementById('title').value
    var press = document.getElementById('press').value
    var year = document.getElementById('year').value
    var author = document.getElementById('author').value
    var price = document.getElementById('price').value

    if (bno && category && title && press && year && author && price) {
        connection.query('SELECT * FROM book WHERE bno= ?', [bno], function (error, rst, fields) {
            if (rst.length > 0) {
                if (rst[0].category == category && rst[0].title == title && rst[0].press == press && rst[0].year == year && rst[0].author == author && rst[0].price == price) {
                    connection.query('UPDATE book SET total=total+1 WHERE bno= ?', [bno])
                    connection.query('UPDATE book SET stock=stock+1 WHERE bno= ?', [bno])
                    swal({
                        title: "Found A Book",
                        text: "Increment the stock by 1",
                        type: "success",
                        timer: 2000,
                        showConfirmButton: false
                    })
                }
                else {
                    swal({
                        title: "Incompatible Information",
                        text: "Found the same book number, but the information doesn't match",
                        type: "error",
                        timer: 3000,
                        showConfirmButton: false
                    })
                }
            } else {
                connection.query('INSERT INTO book VALUES(?,?,?,?,?,?,?,1,1)', [bno, category, title, press, year, author, price], function (error, rst, fields) {
                    if (error) {
                        swal({
                            title: "Insert Failed",
                            text: error,
                            type: "error",
                            timer: 2000,
                            showConfirmButton: false
                        })
                    }
                    else {
                        swal({
                            title: "No Book Fount, Insert One",
                            text: "Please re-check the information",
                            type: "success",
                            timer: 2000,
                            showConfirmButton: false
                        })
                    }
                })

            }
        })
    }
    else {
        swal({
            title: "Incomplete Information",
            text: "Please re-check the information",
            type: 'error',
            timer: 2000,
            showConfirmButton: false
        })
    }
}

var openCSV = document.getElementById('openCSV')
openCSV.onclick = function(){
    dialog.showOpenDialog({
        title: 'Select Your CSV File'
    })
}