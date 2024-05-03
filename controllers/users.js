const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().db('project1').collection('users').find();
 
  // console.log("mongodb: " + JSON.stringify(mongodb));
  // console.log("mongodb.getDatabase(): " + JSON.stringify(mongodb.getDatabase()));
  // console.log("mongodb.getDatabase().db(): " + JSON.stringify(mongodb.getDatabase().db()));
  // console.log("mongodb.getDatabase().db().collection('users'): " + JSON.stringify(mongodb.getDatabase().db().collection('users')));
  result.toArray().then((users) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db('project1').collection('users').find({ _id: userId });
  result.toArray().then((users) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users[0]);
  });
};

const createUser = async (req, res) => {
  
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  }
  const response = await mongodb.getDatabase().db('project1')
  .collection('users').insertOne(user);
  console.log("response: " + JSON.stringify(response));
  if(response.acknowledged == true){
    res.status(201).send();
  }else{
    res.status(500).json(response.error || "Failed to create user." );
  }
};
const updateUser = async (req, res) => {
  
  const userId = new ObjectId(req.params.id);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  }
  const response = await mongodb.getDatabase().db('project1')
  .collection('users').replaceOne({_id:userId},user);
  console.log("response: " + JSON.stringify(response));
  if(response.modifiedCount > 0){
    res.status(204).send();
  }else{
    res.status(500).json(response.error || "Failed to update user." );
  }
};
const deleteUser = async (req, res) => {
  
  const userId = new ObjectId(req.params.id);
 
  const response = await mongodb.getDatabase().db('project1')
  .collection('users').deleteOne({_id:userId});
  console.log("response: " + JSON.stringify(response));
  if(response.deletedCount > 0){
    res.status(204).send();
  }else{
    res.status(500).json(response.error || "Failed to update user." );
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser
};
