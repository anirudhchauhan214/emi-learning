const { Connection } = require("../db/connection");
var uuid = require("uuid");
const bcrypt = require("bcrypt");

/**
 *
 * @param {*} req
 * @param {*} res
 * get all users from database
 */

const getCustomers = (req, res) => {
  const q = "SELECT* FROM customers";
  try {
    Connection.query(q, (err, result) => {
      if (err) throw err;
      return res.status(200).send({ status: 200, data: result });
    });
  } catch (err) {
    return res.send({ status: 200, message: err.message });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * add a new user to the database
 */

const addCustomers = (req, res) => {
  const data = req.body;
  const q = "INSERT INTO customers (id,name,address) VALUES (?,?,?)";
  const alreadyExistsQ = `SELECT * FROM customers WHERE name='${data.name}'`;

  if (data.name == null || data.address == null || data.name === "" || data.address === "") {
    return res.send({ status: 400, message: "Please fill all the fields!!" });
  }

  Connection.query(alreadyExistsQ, (err, result) => {
    if (result.length > 0) {
      return res
        .status(409)
        .send({ status: false, message: "User already exists, Please try wiith different name" });
    } else if ((data.name != null || data.address != null) && result.length === 0) {
      Connection.query(q, [uuid.v4(), data.name, data.address], (err, result) => {
        return res.send({ status: 200, message: "User Created Successfully!", data: result });
      });
    }
  });
};

/**
 *
 * @param {*} req
 * @param {*} res
 * update an existing user
 */

const updateCustomer = (req, res) => {
  const data = req.body;
  const q = `UPDATE customers SET name=?,address=? ,WHERE id='${req.params.id}'`;
  const alreadyExistsQ = `SELECT * FROM customers WHERE name='${data.name}'`;

  if (data.name == null || data.address == null || data.name === "" || data.address === "") {
    return res.send({ status: 200, message: "Please  fill all the fields!!" });
  }
  Connection.query(alreadyExistsQ, (err, result) => {
    if (result.length > 0) {
      return res.status(409).send({
        status: false,
        message: "User name already exists, Please try wiith different name!!",
      });
    } else {
      try {
        Connection.query(q, [data.name, data.address], (err, result) => {
          if (err) throw err;
          return res.send({ status: 200, message: "User successfully updated!!" });
        });
      } catch (err) {
        console.log(err);
      }
    }
  });
};

/**
 *
 * @param {*} req
 * @param {*} res
 * delete a user
 */

const deleteCustomer = (req, res) => {
  const data = req.body;
  const q = `DELETE FROM customers WHERE id='${req.params.id}'`;

  Connection.query(q, (err, result) => {
    if (err) throw err;
    return res.send({ status: 200, message: "User deleted successfully!!" });
  });
};

module.exports = { getCustomers, addCustomers, updateCustomer, deleteCustomer };
