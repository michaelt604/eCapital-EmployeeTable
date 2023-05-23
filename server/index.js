const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    connectionLimit: 5,
    host: "72.137.54.82",
    user: "mysql_user",
    password: "mysql_password",
    database: "company",
});

//Imports the default employee table into the database
app.post("/importJson", (req, res) => {
    const json = req.body.json;

    db.query(`INSERT INTO employees (firstName, lastName, salary) VALUES ?`, [json], (error, result) => {
        if (error) {
            console.error("Error inserting employees:", error);
            return res.status(500).json({ error: "Failed to insert employees" });
        }
        console.log("Employees inserted successfully");
        res.status(200).json({
            message: "Employees inserted successfully",
        });
    });
});

// Clears all employees in the database
app.post("/cleanDB", (req, res) => {
    db.query(`DELETE FROM employees`, (error, result) => {
        if (error) {
            console.error("Error deleting employees:", error);
            return res.status(500).json({ error: "Failed to delete employees" });
        }

        console.log("Employees deleted successfully");
        res.status(200).json({
            message: "Employees deleted successfully",
        });
    });
});

//Add new employee to the database
app.post("/addEmployee", (req, res) => {
    const { firstName, lastName, salary } = req.body;

    db.query(`INSERT INTO employees (firstName, lastName, salary) VALUES (?, ?, ?)`, [firstName, lastName, salary], (error, result) => {
        if (error) {
            console.error("Error adding employee:", error);
            return res.status(500).json({ error: "Failed to add employee" });
        }

        console.log("Employee added successfully");
        res.status(200).json({
            message: "Employee added successfully",
        });
    });
});

//Edits a selected employee in the database using its id
app.post("/editEmployee", (req, res) => {
    const { firstName, lastName, salary, id } = req.body;

    db.query(`UPDATE employees SET firstName = ?, lastName = ?, salary = ? WHERE id = ?`, [firstName, lastName, salary, id], (error, result) => {
        if (error) {
            console.error("Error editing employee:", error);
            return res.status(500).json({ error: "Failed to edit employee" });
        }

        console.log("Employee edited successfully");
        res.status(200).json({
            message: "Employee edited successfully",
        });
    });
});

//Delete a selected employee from the database using its id
app.post("/deleteEmployee", (req, res) => {
    const id = req.body.id;

    db.query(`DELETE FROM employees WHERE id =?`, [id], (error, result) => {
        if (error) {
            console.error("Error deleting employee:", error);
            return res.status(500).json({ error: "Failed to delete employee" });
        }

        console.log("Employee deleted successfully");
        res.status(200).json({
            message: "Employee deleted successfully",
        });
    });
});

//Request to get all employees from the database
app.get("/getEmployee", (req, res) => {
    db.query(`SELECT * FROM employees`, (error, result) => {
        if (error) {
            console.error("Error fetching employees:", error);
            return res.status(500).json({ error: "Failed to fetch employees" });
        }

        console.log("Employees fetched successfully");
        res.status(200).json(result);
    });
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
