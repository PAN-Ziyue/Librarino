const mysql = require('mysql')
const config = require('../db-config')
var conn = mysql.createConnection(config.db)
conn.connect()
function queryCard() {
    var cno = document.getElementById('cno').value
    if (cno) {
        conn.query('SELECT * FROM card WHERE cno= ?', [cno], function (err, rst, fi) {
            if (rst.length > 0) {
                conn.query('SELECT * FROM book WHERE bno IN (SELECT bno FROM borrow WHERE cno=? AND return_date IS NULL)', [cno], function (err, rst, fi) {
                    if (rst.length > 0) {
                        var rstext = '<center><table border="1">'
                        rstext += '<tr>'
                        rstext += '<td>' + "Book Bumber" + '</td>'
                        rstext += '<td>' + "Category" + '</td>'
                        rstext += '<td>' + "Title" + '</td>'
                        rstext += '<td>' + "Press" + '</td>'
                        rstext += '<td>' + "Year" + '</td>'
                        rstext += '<td>' + "Author" + '</td>'
                        rstext += '<td>' + "Price" + '</td>'
                        rstext += '<td>' + "Total" + '</td>'
                        rstext += '<td>' + "Stock" + '</td>'
                        rstext += '</tr>'
                        for (var i in rst) {
                            rstext += '<tr>'
                            rstext += '<td>' + rst[i].bno + '</td>'
                            rstext += '<td>' + rst[i].category + '</td>'
                            rstext += '<td>' + rst[i].title + '</td>'
                            rstext += '<td>' + rst[i].press + '</td>'
                            rstext += '<td>' + rst[i].year + '</td>'
                            rstext += '<td>' + rst[i].author + '</td>'
                            rstext += '<td>' + rst[i].price + '</td>'
                            rstext += '<td>' + rst[i].total + '</td>'
                            rstext += '<td>' + rst[i].stock + '</td>'
                            rstext += '</tr>'
                        }
                        rstext += '</table></center>'
                        swal({
                            title: "Unreturned Books",
                            text: rstext,
                            type: "success",
                            html: true
                        })
                    } else {
                        swal({
                            title: "Query Succeed",
                            text: "No unreturned books",
                            type: 'success'
                        })
                    }
                })
            } else {
                swal({
                    title: "Query Failed",
                    text: "No such library card",
                    type: 'error',
                    timer: 2000,
                    showConfirmButton: false
                })
            }
        })
    } else {
        swal({
            title: "Incomplete Information",
            text: "Please enter the card number",
            type: 'error',
            timer: 2000,
            showConfirmButton: false
        })
    }
}

function borrowBook(bno, cno) {
    conn.query('SELECT * FROM book WHERE bno=?', [bno], function (err, rst, fi) {
        if (rst.length < 1) {
            swal({
                title: "Borrow Failed",
                text: "No such book",
                type: 'error',
                timer: 2000,
                showConfirmButton: false
            })
        } else if (rst[0].stock <= 0) {
            swal({
                title: "Borrow Failed",
                text: "The stock of this book is 0",
                type: 'error',
                timer: 2000,
                showConfirmButton: false
            })
        } else {
            conn.query('SELECT * FROM borrow WHERE bno=? AND cno=? AND return_date IS NULL', [bno, cno], function (err, rst, fi) {
                if (rst.length > 0) {
                    swal({
                        title: "Borrow Failed",
                        text: "There is already a borrow record of this book",
                        type: 'error',
                        timer: 2000,
                        showConfirmButton: false
                    })
                } else {
                    conn.query('UPDATE book SET stock=stock-1 WHERE bno=?', [bno])
                    conn.query('INSERT INTO borrow VALUES(?,?,NOW(),NULL,"admin")', [cno, bno], function (err, rst, fi) {
                        if (err) {
                            swal({
                                title: "ERROR",
                                text: err + '\nadmin_id:' + admin_id,
                                type: 'error'
                            })
                        } else {
                            swal({
                                title: "Borrow Succeed",
                                type: 'success',
                                timer: 2000,
                                showConfirmButton: false
                            })
                        }
                    })
                }
            })
        }
    })
}

function returnBook(bno, cno) {
    conn.query('SELECT * FROM borrow WHERE bno=? AND cno=? AND return_date IS NULL', [bno, cno], function (err, rst, fi) {
        if (rst.length > 0) {
            conn.query('UPDATE book SET stock=stock+1 WHERE bno=?', [bno])
            conn.query('UPDATE borrow SET return_date=NOW() WHERE bno=? AND cno=? AND return_date IS NULL', [bno, cno])
            swal({
                title: "Return Succeed",
                type: 'success',
                timer: 2000,
                showConfirmButton: false
            })
        } else {
            swal({
                title: "Return Failed",
                text: "No such borrow record",
                type: 'error',
                timer: 2000,
                showConfirmButton: false
            })
        }
    })
}

function operateCard() {
    var bno = document.getElementById('bno').value
    var cno = document.getElementById('cno').value
    var operation
    if (document.getElementById('Borrow').checked) {
        operation = document.getElementById('Borrow').value
    } else if (document.getElementById('Return').checked) {
        operation = document.getElementById('Return').value
    }

    if (bno && cno && operation) {
        conn.query('SELECT * FROM card WHERE cno=?', [cno], function (err, rst, fi) {
            if (rst.length < 1) {
                swal({
                    title: "Operation Failed",
                    text: "No such library card",
                    type: 'error',
                    timer: 2000,
                    showConfirmButton: false
                })
            } else {
                if (operation == 'Borrow')
                    borrowBook(bno, cno)
                else
                    returnBook(bno, cno)
            }
        })
    } else {
        swal({
            title: "Incomplete Information",
            text: "Please re-check the information",
            type: 'error',
            timer: 2000,
            showConfirmButton: false
        })
    }

}
