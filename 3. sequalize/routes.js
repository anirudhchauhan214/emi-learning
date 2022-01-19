const express = require("express");

const route = express.Router();

const {
  getUsers,
  addUsers,
  updateUser,
  deleteUser,
} = require("../3. sequalize/controller/UserController");

const { validateToken } = require("./middleware/AuthMiddleware");

// const { addData } = require("./controller/AddressController");

const { registerUser, signIn } = require("./controller/AuthController");
const { addAddress } = require("./controller/AddressController");

// user routes
route.get("/", validateToken, getUsers);
route.post("/users/add", validateToken, addUsers);
route.post("/users/update/:id", validateToken, updateUser);
route.delete("/users/delete/:id", validateToken, deleteUser);

// Auth routes
route.post("/users/register", registerUser);
route.post("/users/signIn", signIn);

// Address routes
route.post("/users/address/add", validateToken, addAddress);

module.exports = route;
