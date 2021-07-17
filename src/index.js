require('./db/mongoose');//load mongoose file
const express = require('express');
const User = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());//automatically parse json to an object

app.post('/users', (req, res) => {
    const user = new User(req.body);
    user.save().then(() => {
        res.send(user);
    }).catch(e => {
        res.status(400).send(e);
    })
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});