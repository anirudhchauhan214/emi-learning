const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../models/index");

const Auth = db.Auth;

const registerUser = async (req, res) => {
  let data = req.body;

  if (data.email == null || data.password == null || data.email == "" || data.password == "") {
    return res.status(404).send({ status: false, message: "Please fill the form correctly!!" });
  }

  const query = await Auth.findAll({ where: { email: data.email } });
  const hashPass = await bcrypt.hash(data.password, 10);

  try {
    if (query.length === 0) {
      const userData = await Auth.create({ ...data, password: hashPass });
      const response = { status: true, message: "User registered successfully!!", data: userData };
      return res.status(200).json(response);
    } else {
      return res.send({ status: false, message: "User already exists!" });
    }
  } catch (err) {
    return res.status(404).send({ status: false, message: err.message });
  }
};

const signIn = async (req, res) => {
  const data = req.body;

  if (data.email == null || data.password == null || data.email == "" || data.password == "") {
    return res.status(404).send({ status: false, message: "Please fill the form correctly!!" });
  }

  const userData = await Auth.findAll({ where: { email: data.email } });
  if (userData.length === 0) {
    return res.status(404).send({ status: false, message: "User not Found" });
  } else {
    if (await bcrypt.compare(data.password, userData[0].password)) {
      const jsonToken = jwt.sign({ userId: userData[0].dataValues.userId }, "jsonwebkey", {
        expiresIn: "1h",
      });
      return res
        .status(200)
        .json({ status: true, message: "User login success!!", accessToken: jsonToken });
    } else {
      return res.status(404).json({ status: false, message: "Password Incorrect!!" });
    }
  }
};

module.exports = { registerUser, signIn };
