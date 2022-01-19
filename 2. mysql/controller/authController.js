const { Connection } = require("../db/connection");
var uuid = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 *
 * @param {*} user
 * @returns
 * creates a JWT token
 */

const handleJWT = (user) => {
  return jwt.sign(user, process.env.JWT_KEY, { expiresIn: "30m" });
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 * register the user with given info
 */

const registerUser = async (req, res) => {
  const data = req.body;
  const hashPass = await bcrypt.hash(data.password, 10);
  const q = "INSERT INTO authUsers (id,email,password) VALUES(?,?,?)";
  const alreadyExistsQ = `SELECT * FROM authUsers WHERE email='${data.email}'`;

  if (data.email == null || data.password == null || data.email === "" || data.password === "") {
    return res.send({ status: 200, message: "Please  fill all the fields!!" });
  }

  Connection.query(alreadyExistsQ, (err, result) => {
    if (result.length > 0) {
      return res.send({ status: 200, message: "A user with te same email already exits!!" });
    } else {
      Connection.query(q, [uuid.v4(), data.email, hashPass], (err, result) => {
        if (err) throw err;
        const token = handleJWT({ user: data.email });
        return res.send({
          status: 200,
          message: "Account has been created successfully",
          accessToken: token,
        });
      });
    }
  });
};

/**
 *
 * @param {*} req
 * @param {*} res
 * login user after comparing hash password
 *
 */

const loginUser = (req, res) => {
  const data = req.body;
  const q = `SELECT * FROM authUsers WHERE email='${data.email}'`;
  Connection.query(q, async (err, result) => {
    if (result.length == 0) {
      return res.send({ status: 404, message: "User does not exist!!" });
    } else {
      if (await bcrypt.compare(data.password, result[0].password)) {
        const token = handleJWT({ user: data.email });
        return res.send({ status: 200, message: "Login Success!!", accessToken: token });
      } else {
        return res.send({ status: 404, message: "Password incorrect!" });
      }
    }
  });
};

module.exports = { registerUser, loginUser };
