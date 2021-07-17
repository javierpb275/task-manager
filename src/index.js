require('./db/mongoose');//load mongoose file
const express = require('express');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());//automatically parse json to an object

app.post('/users', (req, res) => {
    const user = new User(req.body);
    user.save().then(() => {
        res.status(201).send(user);
    }).catch(e => {
        res.status(400).send(e);
    })
});

app.get('/users', (req, res) => {
    User.find({}).then(users => {
        res.status(200).send(users);
    }).catch(e => {
        res.status(500).send(e);
    })
})

app.get('/users/:id', (req, res) => {
    const _id = req.params.id;
    User.findById(_id).then(user => {
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user);
    }).catch(e => {
        res.status(404).send(e);
    })
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);
    task.save().then(() => {
        res.status(201).send(task);
    }).catch(e => {
        res.status(400).send(e);
    })
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});