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
        <div className="App">
            <h1>Employee</h1>
            <EmployeeTable employees={employees} getEmployees={getEmployees} />
        </div>
    );
}

export default App;
