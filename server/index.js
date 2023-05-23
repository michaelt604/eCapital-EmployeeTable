const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "72.137.54.82",
    user: "mysql_user",
    password: "mysql_password",
    database: "company",
});

//Imports the default employee table into the database
app.post("/importJson", (req, res) => {
    const json = req.body.json;

    const query = `INSERT INTO employees (firstName, lastName, salary) VALUES ?`;

    db.query(query, [json], (error, result) => {
        if (error) {
            console.error("Error inserting employees:", error);
            res.status(500).json({ error: "Failed to insert employees" });
        } else {
            console.log("Employees inserted successfully");
            res.status(200).json({
                message: "Employees inserted successfully",
            });
        }
    });
});

//Cleares all employees in the database
app.post("/cleanDB", (req, res) => {
    db.query("DELETE FROM employees", (error, result) => {
        error ? console.log(error) : res.send("Success");
    });
});

//Add new employee to the database
app.post("/addEmployee", (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const salary = req.body.salary;

    db.query(`INSERT INTO employees (firstName, lastName, salary) VALUES (?, ?, ?)`, [firstName, lastName, salary], (error, result) => {
        error ? console.log(error) : res.send("Success");
    });
});

//Edits a selected employee in the database using its id
app.post("/editEmployee", (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const salary = req.body.salary;
    const id = req.body.id;
    db.query(`UPDATE employees SET firstName = ?, lastName = ?, salary = ? WHERE id = ?`, [firstName, lastName, salary, id], (error, result) => {
        error ? console.log(error) : res.send("Success");
    });
});

//Delete a selected employee from the database using its id
app.post("/deleteEmployee", (req, res) => {
    const id = req.body.id;
    db.query(`DELETE FROM employees WHERE id =?`, [id], (error, result) => {
        error ? console.log(error) : res.send("Success");
    });
});

//Request to get all employees from the database
app.get("/getEmployee", (req, res) => {
    db.query("SELECT * FROM employees", (error, result) => {
        error ? console.log(error) : res.send(result);
    });
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
