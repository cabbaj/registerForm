const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const port = 3000;

// for test
let users = [];
let counter = 1;

// define the format from body request (client send)
app.use(bodyParser.json());

// get user
app.get("/users", (req, res) => {
  res.json(users);
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

// update user with params
app.put("/users/:id", (req, res) => {
  let id = req.params.id;

});

// connect to the server
app.listen(port, () => {
  console.log("server is running on port", port);
});
