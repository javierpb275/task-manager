//CRUD create read update delete

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://127.0.0.1:27017"; //or 'mongodb://localhost:27017'
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database");
    }

    const db = client.db(databaseName);
    /*
    db.collection('users').insertOne({
        name: 'Pepe',
        age: 30
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert user');
        }
        console.log(result.ops)//all the documents inserted
    });
    */

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
  }
);
