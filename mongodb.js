//CRUD create read update delete

const { MongoClient, ObjectID } = require("mongodb");

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

    const updatePromise = db.collection('users').updateOne({
      _id: new ObjectID('60edcc7699b2ad1840e045d0')
    }, {
      /*$set: {
        name: 'Mike'
      }*/
      $inc: {
        age: 1
      }
    })

    updatePromise.then(result => {
      console.log(result);
    }).catch(error => {
      console.log(error);
    });

    db.collection('tasks').updateMany({
      completed: true
    }, {
      $set: {
        completed: false
      }
    }).then(result => {
      console.log(result.modifiedCount);
    }).catch(error => {
      console.log(error);
    })

  }
);
