const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");

const port = 3000;

// define the format from body request (client send)
app.use(bodyParser.json());

let conn = null;

// call this function to create connection to db at start up the server
const initMysql = async () => {
  try {
    conn = await mysql.createPool({
      host: "localhost",
      user: "root",
      password: "",
      database: "register_form",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    console.log("MySQL pool created ✅");
  } catch (error) {
    console.error("MySQL connection failed ❌", error.message);
  }
};

// get all user
app.get("/users", async (req, res) => {
  try {
    // [] is take the first item in array
    const [rows] = await conn.query("SELECT * FROM users");

    // choose the first array
    res.json(rows);
  } catch (error) {
    console.log("error msg:", error.message);
    res.status(666).json({ error: "error fetching data" });
  }
});

// get user by id
app.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // [] is take the first item in array
    const [user] = await conn.query(`SELECT * FROM users WHERE id = ${id}`);

    // choose the first array
    res.json(user);
  } catch (error) {
    console.log("error msg:", error.message);
    res.status(666).json({ error: "error fetching data" });
  }
});

// create user
app.post("/user", async (req, res) => {
  try {
    let user = req.body;

    // ? is for value of user
    const data = await conn.query(`INSERT INTO users SET ?`, user);

    res.json({
      msg: "inserted",
    });
  } catch (error) {
    res.json({
      errorMsg: error.message,
    });
  }
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

// connect the db and run the server
(async () => {
  await initMysql(); // Initialize DB before starting the server

  app.listen(port, () => {
    console.log(`Server running on port ${port} 🚀`);
  });
})();

// connect to the server
// app.listen(port, async () => {
//   await initMysql();
//   console.log("server is running on port", port);
// });
