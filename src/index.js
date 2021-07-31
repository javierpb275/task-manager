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

const pet = {
  name: 'pepe'
};

pet.toJSON = function () {
  console.log(this);
  return {};
}

console.log(JSON.stringify(pet));

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});