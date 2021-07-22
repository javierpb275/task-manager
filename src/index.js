require("./db/mongoose"); //load mongoose file
const express = require("express");
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json(), userRouter, taskRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

const bcrypt = require('bcryptjs');

const myFunction = async () => {  
  const password = 'Red123!'
  const hashedPassword = await bcrypt.hash(password, 8);

  console.log(password);
  console.log(hashedPassword);

  const isMatch = await bcrypt.compare(password, hashedPassword);

  console.log(isMatch);

}

myFunction();
