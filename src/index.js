require("./db/mongoose"); //load mongoose file
const express = require("express");
const Task = require("./models/task");
const userRouter = require('./routers/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //automatically parse json to an object

app.use(userRouter);

app.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.patch("/tasks/:id", async (req, res) => {
  const {params, body} = req;
    //check if what we try to update is NOT one of the properties of task:
    const updates = Object.keys(body);
    const allowedUpdates = ['completed', 'description'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))
    if (!isValidOperation) {
      return res.status(400).send({error: 'Invalid updates!'});
    }
    //------------------------
  try {
    const task = await Task.findByIdAndUpdate(params.id, body, {new: true, runValidators: true});
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch(e) {
    res.status(400).send(e);
  }
});

app.delete("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findByIdAndDelete(_id);
    if (!task) {
      return res.status(404).send()
    }
    res.status(200).send(task);
  } catch(e) {
    res.status(500).send(e);
  }
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
