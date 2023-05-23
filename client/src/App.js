import "./App.css";
import EmployeeTable from "./EmployeeTable";
import Axios from "axios";
import { useState, useEffect } from "react";

function App() {
    const [employees, setEmployees] = useState([]);

    const getEmployees = () => {
        Axios.get("http://localhost:3001/getEmployee").then((response) => {
            setEmployees(response.data);
        });
    };

    //Displays a list of employees of page refresh
    useEffect(() => {
        getEmployees();
    }, []);

    return (
        <div className="app">
            <h1 className="employee-header">Employee</h1>
            <EmployeeTable
                className="employee-table"
                employees={employees}
                getEmployees={getEmployees}
            />
        </div>
    );
}

export default App;
