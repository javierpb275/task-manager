//CRUD create read update delete

/*const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;*/

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = "mongodb://127.0.0.1:27017"; //or 'mongodb://localhost:27017'
const databaseName = "task-manager";

const id = new ObjectID();
console.log(id);
console.log(id.getTimestamp());
console.log(id.id.length);
console.log(id.toHexString().length);

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database");
    }

    const db = client.db(databaseName);

 /*   db.collection("tasks").insertMany(
      [
        {
          description: "make the bed",
          completed: true,
        },
        {
          description: "do the shopping",
          completed: true,
        },
        {
          description: "make dinner",
          completed: false,
        },
      ],
      (error, result) => {
        if (error) {
          return console.log("Unable to insert tasks");
        }
        console.log(result.ops);
      }
    );*/

    db.collection('users').insertOne({
        _id: id,
        name: 'Paquito',
        age: 21
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert user');
        }
        console.log(result.ops)//all the documents inserted
    });
    
/*
    db.collection("users").insertMany(
      [
        {
          name: "Paco",
          age: 40,
        },
        {
          name: "Maria",
          age: 20,
        },
      ],
      (error, result) => {
        if (error) {
          return console.log("Unable to insert users");
        }
        console.log(result.ops); //all the documents inserted
      }
    );
    */
  }
);
