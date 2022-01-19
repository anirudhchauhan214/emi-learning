const db = require("../models/index");
const jwt = require("jsonwebtoken");

const Users = db.Users;
const Address = db.Address;

/**
 *
 * @param {*} req
 * @param {*} res
 * get the users from db AND show it to user
 */

const getUsers = async (req, res) => {
  // find all users with findAll and to find one use findOnex
  const data = await Address.findAll({ include: Users });

  // const data = await Users.findAll();
  let response = {
    status: 200,
    message: "Users fetched successfully!!",
    data,
  };

  res.json(response);
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns add a new user to db
 */

const addUsers = async (req, res) => {
  const { userId } = req.params;
  const userData = req.body;

  try {
    if (
      userData.name == null ||
      userData.name == "" ||
      userData.email == null ||
      userData.email == "" ||
      userData.address == null ||
      userData.address == ""
    ) {
      return res.status(409).send({ status: 409, message: "Please fill the form correctly!!" });
    }

    const existingUser = await Users.findOne({ where: { email: req.body.email } });
    if (existingUser) {
      return res
        .status(200)
        .send({ status: 200, message: "User with this email already exists!!" });
    } else {
      // use create to automatically add data to db
      // add bulk users using Users.bulkCreate()

      const data = await Users.create({ ...req.body, userId });
      let response = {
        status: 200,
        message: "User created successfully!",
        data: data.dataValues,
      };
      return res.json(response);
    }
  } catch (err) {
    return res.json({ error: err.message });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns update an existing user to db
 */
const updateUser = async (req, res) => {
  const userData = req.body;

  try {
    if (
      userData.name == null ||
      userData.name == "" ||
      userData.email == null ||
      userData.email == "" ||
      userData.address == null ||
      userData.address == ""
    ) {
      return res.status(409).send({ status: 409, message: "Please fill the form correctly!!" });
    }

    const existingUser = await Users.find({ where: { name: userData.name } });

    if (existingUser.length > 0) {
      return res.status(404).send({ status: 404, message: "Name already exists!" });
    } else {
      const data = await Users.update({ ...userData }, { where: { id: req.params.id } });
      return res
        .status(200)
        .json({ status: 200, message: "User updated successfully.", data: data.dataValues });
    }
  } catch (err) {
    return res.status(500).json({ status: 500, message: err });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const isStored = await Users.findAll({ where: { id: userId } });
    if (isStored.length === 0) {
      return res.status(404).json({ status: 404, message: "User not found!!" });
    } else {
      await Users.destroy({ where: { id: userId } });
      return res.status(200).json({ status: 200, message: "User deleted successfully!!" });
    }
  } catch (err) {}
};

module.exports = { getUsers, addUsers, updateUser, deleteUser };
