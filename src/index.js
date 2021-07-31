require("./db/mongoose"); //load mongoose file
const express = require("express");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  if (req.method === 'GET') {
    res.send('GET request are disabled');
  } else {
    next();
  }
});

app.use(express.json(), userRouter, taskRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

const jwt = require('jsonwebtoken');

const myFunction = async () => {
  //the aim of jwt is to create data (id) that is verifiable via this signature: 'thisisnodejs'
  const token = jwt.sign({_id: 'abc123'}, 'thisisnodejs', {expiresIn: '7 days'});//expiresIn: the token will expire when that time has passed.
  console.log(token);
  //to make sure that the user is authenticated correctly:
  const data = jwt.verify(token, 'thisisnodejs');
  console.log(data);
}

myFunction();
