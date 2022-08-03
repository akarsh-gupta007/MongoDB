const express = require("express");
const app = express();

const MongoClient = require("mongodb").MongoClient;   // conecting mongodb and (.MongoClient)is inbuilt in mongo library.
const emplyeeData=require("./employee");
const url = "mongodb://localhost:27017";
var dbConnected;
MongoClient.connect(url, (err, db) => {
  if (err) console.log(err);
  else {

    var database = db.db("mydb");         //here
    dbConnected = database;
    database.createCollection("items2", (error, suc) => {   // it creates the collection and it takes 2 argument one is item and another is callback
      console.log("collection created succesfully");
      // db.close();   // this is used top close the database
      console.log("Connection successful");
    });

  }
});

// to insert only one item

app.get("/insertOne", function (req, res) {
  const stu1 = { id: 1, name: "John" };
  dbConnected.collection("items2").insertOne(stu1, (error, suc) => {
    if (error) {
      console.log(error);
    }
    console.log("inserted");
    res.send("inserted");
  });
});


// to insert more than one

app.get("/insertMany", function (req, res) {


  const stu1 = { id: 3, name: "John" };
  const stu2 = { id: 2, name: "John" };
  dbConnected.collection("items2").insertMany([stu1, stu2], (error, suc) => {
    if (error) {
      console.log(error);
    }
    else {
      console.log("inserted");


      res.send("inserted");
    }
  });
});


// to find only one item

app.get("/findOne", function (req, res) {

  dbConnected.collection("items2").findOne({}, (error, suc) => {
    if (error) {
      console.log(error);
    }
    else {

      console.log("find");
      res.json(suc);
    }
  });
});


// to findall the items
app.get("/findAll", function (req, res) {


  dbConnected.collection("items2")
    .find({})
    .toArray(function (error, suc) {
      if (error) {
        console.log(error);
      }
      else {

        res.json(suc);
      }
    });
});



app.get("/deleteOne", function (req, res) {

  dbConnected.collection("items2").deleteOne({id:2}, (error, suc) => {
    if (error) {
      console.log(error);
    }
    else {

      console.log("find");
      res.json(suc);
    }
  });
});

// to delete more than one
app.get("/deleteMany", function (req, res) {

  dbConnected.collection("items2").deleteMany({id:2}, (error, suc) => {
    if (error) {
      console.log(error);
    }
    else {

      console.log("find");
      res.json(suc);
    }
  });
});


app.listen(4000);











































