require("./db/mongoose"); //load mongoose file
const express = require("express");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

/* app.use((req, res, next) => {
    res.status(503).send('Site is currently down for maintenance. Check back soon!');
}) */

app.use(express.json(), userRouter, taskRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

const Task = require('./models/task');

const main = async () => {
  const task = await Task.findById('610ad82e69cb6d3b6469d70e');
  await task.populate('owner').execPopulate();
  console.log(task.owner)
}

main()