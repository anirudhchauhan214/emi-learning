const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log("Listening at http://localhost:" + port);
});

const getData = () => {
  const data = fs.readFileSync("demo.json");
  return JSON.parse(data);
};

const saveData = (data) => {
  const stringData = JSON.stringify(data);
  fs.writeFileSync("demo.json", stringData);
};

// Read json file

app.get("/list", (req, res) => {
  const userData = getData();
  res.send(userData);
});

// add new data to json file
app.post("/add", (req, res) => {
  const allUsers = getData();
  const newData = req.body;

  if (
    newData.name == null ||
    newData.age == null ||
    newData.gender == null ||
    newData.number == null ||
    newData.rollNo == null
  ) {
    return res.status(401).send({
      error: true,
      code: 401,
      message: "User data is missing, please fill the form correctly.",
    });
  }

  const filterUsers = allUsers.filter((user) => user.name === newData.name);
  if (filterUsers.length !== 0) {
    return res.status(409).send({
      error: true,
      code: 409,
      message: "A user with that name already exists.Please try with different name",
    });
  }

  allUsers.push(newData);
  saveData(allUsers);
  res.send({ code: 200, message: "User added Successfully." });
});

// update data ofjson file

app.patch("/update/:name", (req, res) => {
  const allUsers = getData();
  const updatedUser = req.body;
  const changedName = req.params.name;

  const userExists = allUsers.find((user) => user.name === changedName);

  if (!userExists) {
    return res.status(404).send({ error: true, code: 404, message: "User Not Found" });
  }

  const delData = allUsers.filter((user) => user.name !== changedName);

  delData.push(updatedUser);
  saveData(delData);
  res.status(200).send({ code: 200, message: "User updated Successfully." });
});

// delete a user from database

app.delete("/delete/:name", (req, res) => {
  const allUsers = getData();
  const userName = req.params.name;

  const filterData = allUsers.filter((user) => user.name !== userName);
  if (filterData.length === allUsers.length) {
    return res.status(404).send({ error: true, code: 404, message: "User not found." });
  }

  saveData(filterData);

  res.send({ code: 200, message: "User Deleted successfully" });
});
