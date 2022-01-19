const express = require("express");

const route = express.Router();
const { validateToken } = require("../middleware/Authenticate");

const {
  getCustomers,
  addCustomers,
  updateCustomer,
  deleteCustomer,
} = require("../controller/customers");

const { registerUser, loginUser } = require("../controller/authController");

route.get("/", validateToken, getCustomers);
route.post("/customers/add", validateToken, addCustomers);
route.put("/customers/edit/:id", validateToken, updateCustomer);
route.delete("/customers/delete/:id", validateToken, deleteCustomer);
route.post("/customers/signup", registerUser);
route.post("/customers/login", loginUser);

module.exports = route;
