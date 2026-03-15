var express = require('express');
var router = express.Router();
let userModel = require('../schemas/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/enable', async function (req, res, next) {
  try {
    let { email, username } = req.body;
    let user = await userModel.findOne({ email, username, isDeleted: false });
    if (user) {
      user.status = true;
      await user.save();
      res.send({ success: true, user });
    } else {
      res.status(404).send({ message: "User not found or credentials mismatch" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.post('/disable', async function (req, res, next) {
  try {
    let { email, username } = req.body;
    let user = await userModel.findOne({ email, username, isDeleted: false });
    if (user) {
      user.status = false;
      await user.save();
      res.send({ success: true, user });
    } else {
      res.status(404).send({ message: "User not found or credentials mismatch" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
