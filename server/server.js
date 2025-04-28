const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
const cors = require("cors");

const port = 3000;

// allow website can access this file (API)
app.use(cors());

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
    console.log("error message:", error.message);
    res.status(666).json({ error: "error fetching data" });
  }
});

// get user by id
app.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // [[]] for select only object
    const [[user]] = await conn.query(`SELECT * FROM users WHERE id = ?`, id);

    if (user) {
      res.json(user);
    }
    throw new Error("can't find");
  } catch (error) {
    console.log("error msg:", error.message);
    res.status(666).json({ error: error.message });
  }
});

// create user
app.post("/users", async (req, res) => {
  try {
    let data = req.body;

    // ? is for value of user
    await conn.query(`INSERT INTO users SET ?`, data);

    res.json({
      msg: "inserted",
    });
  } catch (error) {
    console.log("error message:", error.message);
    res.status(500).json({
      msg: "something wrong",
    });
  }
});

// put for replace old data (that have data every field if not send data it will remove that field)
app.put("/users/:id", async (req, res) => {
  try {
    let data = req.body;
    let id = req.params.id;

    // ? is for value of user
    await conn.query(`UPDATE users SET ? WHERE id = ?`, [data, id]);

    res.json({
      msg: "updated",
    });
  } catch (error) {
    console.log("error message:", error.message);
    res.status(500).json({
      msg: "something wrong",
    });
  }
});

// delete
app.delete("/users/:id", async (req, res) => {
  try {
    let id = req.params.id;

    await conn.query("DELETE FROM users WHERE id = ?", id);

    res.json({
      msg: "deleted",
    });
  } catch (error) {
    console.log("error message:", error.message);
    res.status(500).json({
      msg: "something wrong",
    });
  }
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
