const mysql = require('mysql')
const { dialog } = require('electron').remote
const fs = require('fs')
const readline = require('readline')

const config = require('../db-config')
var connection = mysql.createConnection(config.db)
connection.connect()

function insertBook(bno, category, title, press, year, author, price, number) {
    connection.query('SELECT * FROM book WHERE bno= ?', [bno], function (error, rst, fields) {
        if (rst.length > 0) {
            if (rst[0].category == category && rst[0].title == title && rst[0].press == press && rst[0].year == year && rst[0].author == author && rst[0].price == price) {
                connection.query('UPDATE book SET total=total+? WHERE bno= ?', [number, bno])
                connection.query('UPDATE book SET stock=stock+? WHERE bno= ?', [number, bno])
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
            var querystring = 'INSERT INTO book VALUES(?,?,?,?,?,?,?,?,?)'
            connection.query(querystring, [bno, category, title, press, year, author, price, number, number], function (error, rst, fields) {
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
                        title: "No Book Found, Insert One",
                        type: "success",
                        timer: 2000,
                        showConfirmButton: false
                    })
                }
            })
        }
    })
}

function insertSingle() {
    var bno = document.getElementById('bno').value
    var category = document.getElementById('category').value
    var title = document.getElementById('title').value
    var press = document.getElementById('press').value
    var year = document.getElementById('year').value
    var author = document.getElementById('author').value
    var price = document.getElementById('price').value

    if (bno && category && title && press && year && author && price) {
        insertBook(bno, category, title, press, year, author, price, 1)
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

function readFileToArr(fReadName, callback) {
    var fRead = fs.createReadStream(fReadName);
    var objReadline = readline.createInterface({
        input: fRead
    });
    var arr = new Array();
    objReadline.on('line', function (line) {
        arr.push(line);
        //console.log('line:'+ line);
    });
    objReadline.on('close', function () {
        // console.log(arr);
        callback(arr);
    });
}


var openCSV = document.getElementById('openCSV')
openCSV.onclick = function () {
    dialog.showOpenDialog({
        title: 'Select Your CSV File',
        filters: [{ name: 'File', extensions: ['csv'] }]
    }).then(rst => {
        if (rst.canceled == false) {
            readFileToArr(rst.filePaths[0], function (dataset) {
                var record = ''
                dataset.forEach(function (data) {
                    var str = data.split(",")
                    if (str[0] && str[1] && str[2] && str[3] && str[4] && str[5] && str[6] && str[7]) {
                        var bno = str[0]
                        var category = str[1]
                        var title = str[2]
                        var press = str[3]
                        var year = str[4]
                        var author = str[5]
                        var price = str[6]
                        var number = str[7]
                        connection.query('SELECT * FROM book WHERE bno= ?', [bno], function (error, rst, fields) {
                            if (rst.length > 0) {
                                if (rst[0].category == category && rst[0].title == title && rst[0].press == press && rst[0].year == year && rst[0].author == author && rst[0].price == price) {
                                    connection.query('UPDATE book SET total=total+? WHERE bno= ?', [number, bno])
                                    connection.query('UPDATE book SET stock=stock+? WHERE bno= ?', [number, bno])
                                }
                                else
                                    record += i + ', '
                            } else {
                                var querystring = 'INSERT INTO book VALUES(?,?,?,?,?,?,?,?,?)'
                                connection.query(querystring, [bno, category, title, press, year, author, price, number, number], function (error, rst, fields) {
                                    if (error) record += i + ', '
                                })
                            }
                        })
                    } else record += i + ', '
                })
                if (record == '') {
                    swal({
                        title: "Import Finished",
                        text: "All data are imported",
                        type: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    })
                } else {
                    swal({
                        title: "Import Finished",
                        text: "Record at" + record + 'failed to be imported',
                        icon: 'info',
                        timer: 2000,
                        showConfirmButton: false
                    })
                }
            })
        }
    }).catch(err => {
        console.log(err)
    })
}
