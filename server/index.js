require("dotenv").config();
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    connectionLimit: 5,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Imports the default employee table into the database
app.post("/employees/import", (req, res) => {
    const json = req.body.json;
    const values = json.map(({ firstName, lastName, salary }) => [firstName, lastName, salary]);

    // Validate inputs
    if (!(Array.isArray(json) && json.length > 0)) {
        return res.status(400).json({ error: "Missing required employees" });
    }
    for (let j of json) {
        if (!j.firstName || !j.lastName || !j.salary) {
            return res.status(400).json({ error: "Missing required employee field" });
        }
    }

    db.query(`INSERT INTO employees (firstName, lastName, salary) VALUES ?`, [values], (error, result) => {
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
app.delete("/employees/clear", (req, res) => {
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
app.post("/employees", (req, res) => {
    const { firstName, lastName, salary } = req.body;

    // Validate inputs
    if (!firstName || !lastName || !salary) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    if (isNaN(parseFloat(salary))) {
        return res.status(400).json({ error: "Invalid salary" });
    }

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
app.put("/employees/:id", (req, res) => {
    const { firstName, lastName, salary } = req.body;
    const id = req.params.id;

    // Validate inputs
    if (!firstName || !lastName || !salary || !id) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    if (isNaN(parseFloat(salary))) {
        return res.status(400).json({ error: "Invalid salary" });
    }

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
app.delete("/employees/:id", (req, res) => {
    const id = req.params.id;

    // Validate inputs
    if (!id) {
        return res.status(400).json({ error: "Missing required field: id" });
    }

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
app.get("/employees", (req, res) => {
    db.query(`SELECT * FROM employees`, (error, result) => {
        if (error) {
            console.error("Error fetching employees:", error);
            return res.status(500).json({ error: "Failed to fetch employees" });
        }

        console.log("Employees fetched successfully");
        res.status(200).json(result);
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
