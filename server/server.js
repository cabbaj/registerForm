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
  let id = req.params.id;
  // find index that user.id = id it will return index in array (index in array start at 0)
  let selectIdx = users.findIndex((user) => user.id == id);

  res.json(users[selectIdx]);
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
  let id = req.params.id;
  let updateUser = req.body;
  let selectIdx = users.findIndex((user) => user.id == id);

  // update
  // user[selectIdx] is object you want to update 
  // updateUser is what you want to update to object
  Object.assign(users[selectIdx], updateUser);

  res.json({
    msg: "updated",
    data: {
      userUpdate: updateUser,
      index: selectIdx,
    },
  });
});

// delete
app.delete("/users/:id", (req, res) => {
  let id = req.params.id;
  let selectIdx = users.findIndex((user) => user.id == id);

  users.splice(selectIdx, 1);

  res.json({
    msg: "deleted",
  });
});

// connect to the server
app.listen(port, () => {
  console.log("server is running on port", port);
});
