const mongoose = require('mongoose');

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager-api";

mongoose.connect(`${connectionURL}/${databaseName}`, {
    useNewUrlParser: true, 
    useCreateIndex: true
});

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    }
})

const user1 = new User({
    name: 'Mery',
    age: 25
});

user1.save().then(user => {
    console.log(user);
}).catch(error => {
    console.log('Error!', error)
})

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
});

/*
const task1 = new Task({
    description: 'Make the bed',
    completed: true
});


task1.save().then(task => {
    console.log(task);
}).catch(error => {
    console.log('Error!', error);
});


const user1 = new User({
    name: 'Pepe',
    age: 30
});

user1.save().then(user => {
    console.log(user);
}).catch(error => {
    console.log('Error!', error)
})
*/