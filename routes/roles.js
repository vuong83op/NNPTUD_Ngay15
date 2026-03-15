var express = require('express');
var router = express.Router();
let roleModel = require('../schemas/role');
let userModel = require('../schemas/user');

router.get('/', async function (req, res, next) {
  try {
    let result = await roleModel.find({ isDeleted: false });
    res.send(result);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

router.get('/:id', async function (req, res, next) {
  try {
    let id = req.params.id;
    let result = await roleModel.findOne({ isDeleted: false, _id: id });
    if (result) {
      res.send(result);
    } else {
      res.status(404).send({ message: "ID NOT FOUND" });
    }
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

router.post('/', async function (req, res, next) {
  try {
    let newRole = new roleModel({
      name: req.body.name,
      description: req.body.description
    });
    await newRole.save();
    res.send(newRole);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    let id = req.params.id;
    let updatedItem = await roleModel.findByIdAndUpdate(id, req.body, { new: true });
    res.send(updatedItem);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    let id = req.params.id;
    let updatedItem = await roleModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    res.send(updatedItem);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

router.get('/:id/users', async function (req, res, next) {
  try {
    let id = req.params.id;
    let users = await userModel.find({ role: id, isDeleted: false }).populate('role');
    res.send(users);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

module.exports = router;
