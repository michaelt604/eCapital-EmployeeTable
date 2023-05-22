import "./App.css";
import Axios from "axios";
import testData from "./data.json";

export default function EmployeeTable({ employees }) {
    //Edits employee with given id
    const editEmployee = (employee) => {
        Axios.post("http://localhost:3001/editEmployee", {
            firstName: "Test",
            lastName: "Test2",
            salary: 12345,
            id: employee.id,
        }).then((response) => {
            console.log("EmployeeEdited " + employee.id);
        });
    };

    //Deletes employee with given id
    const deleteEmployee = (employee) => {
        Axios.post("http://localhost:3001/deleteEmployee", {
            id: employee.id,
        }).then((response) => {
            if (response) {
                employees = employees.filter((e) => e.id !== employee.id);
                document.getElementById(employee.id).remove();
            }
        });
    };

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
                            <tr key={employee.id} id={employee.id}>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.salary}</td>
                                <td>
                                    <button
                                        onClick={() => editEmployee(employee)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteEmployee(employee)}
                                    >
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
