import "./App.css";
import Axios from "axios";
import testData from "./data.json";

export default function EmployeeTable({ employees }) {
    const editEmployee = (e) => {
        Axios.post("http://localhost:3001/editEmployee").then((response) => {
            console.log(response);
        });
    };

    const deleteEmployee = (e) => {};

    return (
        <>
            <table className="EmployeeTable">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Salary</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {employees.map((employee) => {
                        return (
                            <tr
                                key={
                                    employee.firstName + " " + employee.lastName
                                }
                            >
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.salary}</td>
                                <td>
                                    <button onClick={editEmployee}>Edit</button>
                                    <button onClick={deleteEmployee}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}
