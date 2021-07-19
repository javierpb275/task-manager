require("./db/mongoose"); //load mongoose file
const express = require("express");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //automatically parse json to an object


const router = new express.Router();

router.get('/test', (req, res) => {
  res.send('This is from my other router');
})

app.use(router);

app.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.patch("/users/:id", async (req, res) => {
  const {params, body} = req;
  //check if what we try to update is NOT one of the properties of user:
  const updates = Object.keys(body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update))
  if (!isValidOperation) {
    return res.status(400).send({error: 'Invalid updates!'});
  }
  //-------------------------
  try {
    const user = await User.findByIdAndUpdate(params.id, body, {new: true, runValidators: true});
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch(e) {
    res.status(400).send(e);
  }
});

app.delete("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      return res.status(404).send()
    }
    res.status(200).send(user);
  } catch(e) {
    res.status(500).send(e);
  }
});

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
