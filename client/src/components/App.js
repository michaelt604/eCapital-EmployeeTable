import "./App.css";
import EmployeeTable from "./EmployeeTable";
import Axios from "axios";
import React, { useState, useEffect } from "react";

export default function App() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    const getEmployees = async () => {
        try {
            Axios.get("http://localhost:3001/getEmployee").then((response) => {
                setEmployees(response.data);
            });
        } catch (error) {
            console.error("Error getting employees:", error);
        }
    };

    //Displays a list of employees of page refresh
    useEffect(() => {
        getEmployees();
    }, []);

    return (
        <div className="app">
            <h1 className="employee-header">Employees</h1>
            <EmployeeTable
                className="employee-table"
                employees={employees}
                getEmployees={getEmployees}
            />
        </div>
    );
}
