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
