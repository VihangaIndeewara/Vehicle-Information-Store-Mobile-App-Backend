const express = require("express")
const mysql = require('mysql')
const db = require("../configs/db.configs")
const router = express.Router()

const connection = mysql.createConnection(db.database)

connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the MySQL server');
        var userTableQuery = "CREATE TABLE IF NOT EXISTS user(userId INT AUTO_INCREMENT,userRealName VARCHAR (20),userName VARCHAR (20),password VARCHAR(25),CONSTRAINT PRIMARY KEY (userId))"
           
        connection.query(userTableQuery, function (err, result) {
            if (result.warningCount === 0) {
                console.log("User table created!");
            }
        })
    }
})

router.post('/', (req, res) => {
    const userRealname = req.body.realname
    const userName = req.body.usename
    const password = req.body.password
   
    var query = "INSERT INTO user ( userRealname,userName, password) VALUES (?, ?, ?)";

    connection.query(query, [ userRealname,userName, password], (err) => {
        if (err) {
            res.send({
                'status' : '200',
                'message': 'Duplicate entry'
            })
        } else {
            res.send({
                'status' : '200',
                'message': 'User saved successfully'
            })
        }
    })

})

router.post('/login', (req, res) => {
    const userName = req.body.usename
    const password = req.body.password
   
    var query = "SELECT * FROM user WHERE userName=? AND password=?";

    connection.query(query, [ userName,password], (err, row) => {
        if (err) {
            res.send({
                'status' : '200',
                'message': 'Duplicate entry'
            })
        } else {
            if (row.length === 0) {
                res.send({ 
                    'status' : '200',
                    'message': "Incorrect Username or Password" 
                });
              } else {
                res.send({
                    'status' : '200',
                    'message': "Login Successfully", user: row[0]});
              }
        }
    })

})
module.exports = router