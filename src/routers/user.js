const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = new express.Router();
const multer = require('multer');

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/users/logout", auth, async (req, res) => {
  const { user } = req;
  try {
    user.tokens = user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  const { user } = req;
  try {
    user.tokens = [];
    await user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
  const { body, user } = req;
  //check if what we try to update is NOT one of the properties of user:
  const updates = Object.keys(body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  //-------------------------
  try {
    updates.forEach((update) => (user[update] = body[update]));
    await user.save();
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  const { user } = req;
  try {
    await req.user.remove();
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

const upload = multer({
  limits: {
    fileSize: 1000000 //measured in bytes. 1 megabyte: 1 million bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'))
    } else {
      cb(undefined, true)
    }
  }
})

router.post("/users/me/avatar", auth, upload.single('avatar'), async (req, res) => {
  req.user.avatar = req.file.buffer
  await req.user.save();
  res.send();
}, (error, req, res, next) => {
  res.status(400).send({error: error.message})
})

module.exports = router;
