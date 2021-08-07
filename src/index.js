require("./db/mongoose"); //load mongoose file
const express = require("express");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

/* app.use((req, res, next) => {
    res.status(503).send('Site is currently down for maintenance. Check back soon!');
}) */

const multer = require('multer');
const upload = multer({
  dest: 'images',
  limits: {
    fileSize: 1000000 //measured in bytes. 1 megabyte: 1 million bytes
  },
  fileFilter(req, file, cb/*callback*/) {
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error('Please upload a Word document'))
    } else {
      cb(undefined, true)
    }
/*  cb(new Error('File must be a PDF'))
    cb(undefined, true)
    cb(undefined, false) */
  }
})

const errorMiddleware = (req, res, next) => {
  throw new Error('From my middleware');
}
app.post('/upload', errorMiddleware, (req, res) => {
  res.send();
}, (error, req, res, next) => {
  res.status(400).send({error: error.message});
})

app.use(express.json(), userRouter, taskRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
