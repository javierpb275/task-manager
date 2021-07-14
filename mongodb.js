//CRUD create read update delete

const { MongoClient, ObjectID } = require('mongodb');

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

    db.collection('users').findOne({_id: new ObjectID("60ef20e45d69933984efd8ce")}, (error, user) => {
        if (error) {
          return console.log('Unable to fetch user');
        }
        console.log(user);
    })

    db.collection('users').find({age: 30}).toArray((error, users) => {
      if (error) {
        return console.log('Unable to fetch users');
      }
      console.log(users);
    })

    db.collection('users').find({age: 30}).count((error, count) => {
      if (error) {
        return console.log('Unable to fetch users');
      }
      console.log(count);
    })

    db.collection('tasks').findOne({_id: new ObjectID("60edd2018232341a64ef9e25")}, (error, task) => {
      if (error) {
        return console.log('Unable to fetch task');
      }
      console.log(task);
    })

    db.collection('tasks').find({completed: true}).toArray((error, tasks) => {
      if (error) {
        return console.log('Unable to fetch tasks');
      }
      console.log(tasks);
    })

  }
);
