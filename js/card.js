const mysql = require('mysql')
const config = require('../db-config')
var connection = mysql.createConnection(config.db)
connection.connect()

function insertCard() {
    var cno = document.getElementById('cno').value
    var name = document.getElementById('name').value
    var department = document.getElementById('department').value
    var type;
    if (document.getElementById('T').checked) {
        type = document.getElementById('T').value
    } else if (document.getElementById('G').checked) {
        type = document.getElementById('G').value
    } else if (document.getElementById('U').checked) {
        type = document.getElementById('U').value
    } else if(document.getElementById('O').checked){
        type = document.getElementById('O').value
    }

    if (cno && name && department && type) {
        connection.query('SELECT * FROM card WHERE cno= ?', [cno], function (error, rst, fields) {
            if (rst.length > 0) {
                swal({
                    title: "Duplicate Card Number",
                    text: "Duplicate card number Found, insert failed",
                    type: "error",
                    timer: 2000,
                    showConfirmButton: false
                })
            } else {
                connection.query('INSERT INTO card VALUES(?,?,?,?)', [cno, name, department, type], function (err, rst, fields) {
                    if (error) {
                        swal({
                            title: "Insert Failed",
                            text: error,
                            type: "error",
                            timer: 2000,
                            showConfirmButton: false
                        })
                    } else {
                        swal({
                            title: "Insert Succeed",
                            type: "success",
                            timer: 2000,
                            showConfirmButton: false
                        })
                    }
                })
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


function deleteCard() {
    var dno = document.getElementById('dno').value
    if (dno) {
        connection.query('SELECT * FROM card WHERE cno= ?', [dno], function (error, rst, fields) {
            if (rst.length > 0) {
                connection.query('SELECT * FROM borrow WHERE cno= ? AND return_date is null', [dno], function (error, rst, fields){
                    if(rst.length > 0){
                        swal({
                            title: "Deletion Failed",
                            text: "There are unreturned books associated with this card",
                            type: 'error',
                            timer: 2000,
                            showConfirmButton: false
                        })
                    }else{
                        connection.query('DELETE FROM card WHERE cno=?', [dno], function (error, rst, fields){
                            if(error){
                                swal({
                                    title: "Deletion Failed",
                                    text: error,
                                    type: 'error',
                                    timer: 2000,
                                    showConfirmButton: false
                                })
                            }else{
                                swal({
                                    title: "Deletion Succeed",
                                    text: "One card is deleted from the system",
                                    type: 'success',
                                    timer: 2000,
                                    showConfirmButton: false
                                })
                            }
                        })
                    }
                })
                
            } else {
                swal({
                    title: "Deletion Failed",
                    text: "No compatible card number",
                    type: 'error',
                    timer: 2000,
                    showConfirmButton: false
                })
            }
        })

    }
}