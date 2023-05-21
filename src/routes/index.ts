import express from "express";
import { User } from "models/user.model";
const router = express.Router();

router.post('/regist', (req, res) => {
  if (!req.body.email) {
    res.json({ status: 400, message: "Bad request" })
  } else {
    const newUser = new User({
      email: req.body.email,
      name: req.body.name,
      date: Date.now(),
    });
    newUser.save((err) => {
      if (err) {
        res.json({ status: 500, message: "MongoDb save error" });
      } else {
        res.json()
      }
    })
    res.json({ status: 500, data: newUser });
  }
});

export default router;