const mysql = require('mysql')
const config = require('../db-config')
var connection = mysql.createConnection(config.db)
connection.connect()


function searchBook() {
    var category = document.getElementById('category').value
    var title = document.getElementById('title').value
    var press = document.getElementById('press').value
    var minyear = document.getElementById('minyear').value
    var maxyear = document.getElementById('maxyear').value
    var author = document.getElementById('author').value
    var minprice = document.getElementById('minprice').value
    var maxprice = document.getElementById('maxprice').value

    if (category || title || press || minyear || maxyear || author || minprice || maxprice) {
        var querystring = 'SELECT * FROM book WHERE'
        var first = true
        if (category) {
            if (first) {
                querystring += ' category="' + category + '"'
                first = false
            }
            else querystring += ' AND category="' + category + '"'
        }
        if (title) {
            if (first) {
                querystring += ' title="' + title + '"'
                first = false
            }
            else querystring += ' AND title="' + title + '"'
        }
        if (press) {
            if (first) {
                querystring += ' press="' + press + '"'
                first = false
            }
            else querystring += ' AND press="' + press + '"'
        }
        if (minyear) {
            if (first) {
                querystring += ' year>=' + minyear
                first = false
            }
            else querystring += ' AND year>=' + minyear
        }
        if (maxyear) {
            if (first) {
                querystring += ' year<=' + maxyear
                first = false
            }
            else querystring += ' AND year<=' + maxyear
        }
        if (author) {
            if (first) {
                querystring += ' author="' + author + '"'
                first = false
            }
            else querystring += ' AND author="' + author + '"'
        }
        if (minprice) {
            if (first) {
                querystring += ' price>=' + minprice
                first = false
            }
            else querystring += ' AND price>=' + minprice
        }
        if (maxprice) {
            if (first) {
                querystring += ' price<=' + maxprice
                first = false
            }
            else querystring += ' AND price<=' + maxprice
        }
        connection.query(querystring, null, function (err, rst, fields) {
            if (err) {
                swal({
                    title: "Query Failed",
                    text: err,
                    type: "error",
                    timer: 2000,
                    showConfirmButton: false
                })
            } else {
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
                        title: "Query Succeed",
                        text: rstext,
                        type: "success",
                        html: true
                    })
                } else {
                    swal({
                        title: "Query Succeed",
                        text: "Find no books",
                        type: "success"
                    })
                }
            }
        })
    } else {
        swal({
            title: "Incomplete Information",
            text: "At least one condition should be provided",
            type: "error",
            timer: 2000,
            showConfirmButton: false
        })
    }

}