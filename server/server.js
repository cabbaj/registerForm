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

// error check function if value is null
const validateData = (userData) => {
    const errors = [];

    if (!userData.firstname) {
        errors.push("put your First Name");
    }

    if (!userData.lastname) {
        errors.push("put your Last Name");
    }

    if (!userData.age) {
        errors.push("put your Age");
    }

    if (!userData.gender) {
        errors.push("put your Gender");
    }

    if (!userData.interests) {
        errors.push("put your Interests");
    }

    if (!userData.description) {
        errors.push("put your Description");
    }
    return errors;
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
        let userData = req.body;
        const errors = validateData(userData);

        // check if it have error
        if (errors.length > 0) {
            throw {
                msg: "Incomplete information",
                errors: errors,
            };
        }

        // ? is for value of user
        await conn.query(`INSERT INTO users SET ?`, userData);

        res.json({
            msg: "inserted",
        });
    } catch (error) {
        // define msg, errors for store value from throw error
        const errorMsg = error.message || "something wrong";
        const errors = error.errors || [];

        console.log("error message:", errorMsg);

        // send this to front-end
        res.status(666).json({
            msg: errorMsg,
            error: errors,
        });
    }
});

// put for replace old data (that have data every field if not send data it will remove that field)
app.put("/users/:id", async (req, res) => {
    try {
        let userData = req.body;
        let id = req.params.id;

        // ? is for value of user
        await conn.query(`UPDATE users SET ? WHERE id = ?`, [userData, id]);

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

app.get("/", (req, res) => {
 res.render("index.html");   
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
