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
        var userTableQuery = "CREATE TABLE IF NOT EXISTS vehical(vehicalNumber VARCHAR (25),vehicalName VARCHAR (20),location VARCHAR (50),vehicalImage VARCHAR (255),vehicalAddDate VARCHAR(25),otherDetails VARCHAR(255),CONSTRAINT PRIMARY KEY (vehicalNumber))"
           
        connection.query(userTableQuery, function (err, result) {
            if (result.warningCount === 0) {
                console.log("vehical table created!");
            }else{
                console.log("error")
            }
        })
    }
})

router.post('/', (req, res) => {
    console.log(req.body)
    const vehicalNumber = req.body.vehicalNumber
    const vehicalName = req.body.vehicalName
    const location = req.body.location
    const vehicalImage = req.body.vehicalImage
    const addDate = req.body.vehicalAddDate
    const otherDetails = req.body.otherDetails
   
    var query = "INSERT INTO vehical ( vehicalNumber,vehicalName, location,vehicalImage,vehicalAddDate,otherDetails) VALUES (?, ?, ?,?,?,?)";

    connection.query(query, [ vehicalNumber,vehicalName, location,vehicalImage,addDate,otherDetails], (err) => {
        if (err) {
            console.log(err)
            res.send({
                'status' : '200',
                'message': 'Duplicate entry'
            })
        } else {
            res.send({
                'status' : '200',
                'message': 'Vehical saved successfully'
            })
        }
    })

})

router.get("/", (req, res) => {
    var query = "SELECT * FROM vehical"
    connection.query(query, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

router.put("/", (req, res) => {

    const vehicalNumber = req.body.vehicalNumber
    const otherDetails = req.body.otherDetails
    console.log(vehicalNumber+"  "+otherDetails)
  
    var query = "UPDATE vehical SET otherDetails=? WHERE vehicalNumber=?";
    connection.query(query,[otherDetails,vehicalNumber],(err) => {
        if (err) {
            res.send({
                'status' : '200',
                'message': 'Vehical Updated Fail'
            })
        } else {
            res.send({
                'status' : '200',
                'message': 'Vehical Successfully Updated'
            })
        }
      } )
  });

  router.delete("/:id", (req, res) => {
    let id = req.params.id;
    var query = "DELETE FROM vehical WHERE vehicalNumber=?";
    connection.query(query, [id], (err) => {
      if (err) {
        res.send({
            'status' : '200',
            'message': 'Vehical Delete Fail'
        })
      } else {
        res.send({
            'status' : '200',
            'message': 'Vehical Successfully Deleted'
        })
      }
    });
  });

module.exports = router