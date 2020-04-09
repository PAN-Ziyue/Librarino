const mysql = require('mysql')
const { dialog } = require('electron').remote
const fs = require('fs')

const config = require('../db-config')
var connection = mysql.createConnection(config.db)
connection.connect()

function insertSingle() {
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

// function readFileToArr(fReadName,callback){
//     var fRead = fs.createReadStream(fReadName);
//     var objReadline = readline.createInterface({
//         input:fRead
//     });
//     var arr = new Array();
//     objReadline.on('line',function (line) {
//         arr.push(line);
//         //console.log('line:'+ line);
//     });
//     objReadline.on('close',function () {
//        // console.log(arr);
//         callback(arr);
//     });
// }

var openCSV = document.getElementById('openCSV')
openCSV.onclick = function () {
    dialog.showOpenDialog({
        title: 'Select Your TXT File',
        filters: [{ name: 'File', extensions: ['txt'] }]
    }, function (files) {
        if(files===undefined){
            console.log("No file selected")
        }else{
            fs.readFile(files[0], 'uft-8', (err,data)=>{
                if(err){
                    alert("An error ocurred reading the file :" + err.message);
                }else{
                    console.log("The file content is : " + data);
                }
            })
        }
    })
}
