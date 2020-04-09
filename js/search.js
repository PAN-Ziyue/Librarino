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
    
    if(category||title||press||minyear||maxyear||author||minprice||maxprice){
        var querystring = 'SELECT * FROM book WHERE'
        var first = true
        if(category){
            if(first) {
                querystring += ' category='+category
                first = false
            }
            else querystring += ' AND category='+category
        }
        if(title){
            if(first) {
                querystring += ' title='+title
                first = false
            }
            else querystring += ' AND title='+title
        }
        if(press){
            if(first) {
                querystring += ' press='+press
                first = false
            }
            else querystring += ' AND press='+press
        }
        if(minyear){
            if(first) {
                querystring += ' year>='+minyear
                first = false
            }
            else querystring += ' AND year>='+minyear
        }
        if(maxyear){
            if(first) {
                querystring += ' year<='+maxyear
                first = false
            }
            else querystring += ' AND year<='+maxyear
        }
        if(author){
            if(first) {
                querystring += ' author='+author
                first = false
            }
            else querystring += ' AND author='+author
        }
        if(minprice){
            if(first) {
                querystring += ' price>='+minprice
                first = false
            }
            else querystring += ' AND price>='+minprice
        }
        if(maxprice){
            if(first) {
                querystring += ' price<='+maxprice
                first = false
            }
            else querystring += ' AND price<='+maxprice
        }
        swal({
            title: "query",
            text: querystring,
            type: "success",
            timer: 2000,
            showConfirmButton: false
        })
    }else{
        swal({
            title: "Incomplete Information",
            text: "At least one condition should be provided",
            type: "error",
            timer: 2000,
            showConfirmButton: false
        })
    }

}