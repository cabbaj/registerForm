const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const port = 3000;

// for test
let users = [];
let counter = 1;

// define the format from body request (client send)
app.use(bodyParser.json());

// get all user
app.get("/users", (req, res) => {
  const fliterUsers = users.map((user) => {
    return { id: user.id, firstname: user.firstname, lastname: user.lastname };
  });

  res.json(fliterUsers);
});

// get user by id
app.get("/users/:id", (req, res) => {
  let id = Number(req.params.id);

  // return object of user
  let user = users.find((user) => user.id === id);

  res.json(user);
});

// create user
app.post("/user", (req, res) => {
  let user = req.body;
  user.id = counter;
  counter += 1;

  users.push(user);
  res.json({
    msg: "added",
    user: user,
  });
});

// put for replace old data (that have data every field if not send data it will remove that field)
app.put("/users/:id", (req, res) => {
  let id = Number(req.params.id);
  let updateUser = req.body;

  let user = users.find((user) => user.id === id);

  Object.assign(user, updateUser);

  res.json({
    msg: "updated",
    data: updateUser,
    id: user.id,
  });
});

// delete
app.delete("/users/:id", (req, res) => {
  let id = Number(req.params.id);
  let selectIdx = users.findIndex((user) => user.id === id);

  users.splice(selectIdx, 1);

  res.json({
    msg: "deleted",
  });
});

// connect to the server
app.listen(port, () => {
  console.log("server is running on port", port);
});
