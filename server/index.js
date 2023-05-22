const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "company",
});

//Add new employee to the database
app.post("/addEmployee", (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const salary = req.body.salary;

    db.query(
        `INSERT INTO employee (firstName, lastName, salary) VALUES (?, ?, ?)`,
        [firstName, lastName, salary],
        (error, result) => {
            error ? console.log(error) : res.send("Added Employee");
        }
    );
});

app.post("/editEmployee", (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const salary = req.body.salary;
    const id = req.body.id;

    db.query(
        `UPDATE employee SET firstName = ?, lastName = ?, salary = ? WHERE id = ?`,
        [firstName, lastName, salary, id],
        (error, result) => {
            error ? console.log(error) : res.send("Edited Employee");
        }
    );
});

//Request to get all employees from the database
app.get("/getEmployees", (req, res) => {
    db.query("SELECT * FROM employees", (error, result) => {
        error ? console.log(error) : res.send(result);
    });
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
