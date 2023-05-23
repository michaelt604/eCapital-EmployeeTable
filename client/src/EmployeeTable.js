import "./App.css";
import Axios from "axios";
import testData from "./data.json";
import { useState } from "react";
import Popup from "./Popup";

export default function EmployeeTable({ employees, getEmployees }) {
    const [showPopup, setShowPopup] = useState(false);
    const [popupData, setPopupData] = useState({
        firstName: "",
        lastName: "",
        salary: 0,
    });

    //Toggles Popup
    const handleTogglePopup = () => {
        setShowPopup(!showPopup);
    };

    //Handles data saving
    const handleSave = (data) => {
        console.log(data);
        setPopupData(data);
        setShowPopup(false);
    };

    //Handles popup closing
    const handleCancel = () => {
        setShowPopup(false);
    };

    //Adds new employee to database
    const addEmployee = () => {
        setPopupData({ firstName: "", lastName: "", salary: 0 });

        handleTogglePopup();
    };

    //Edits employee with given id
    const editEmployee = (employee) => {
        console.log(employee);
        setPopupData(employee);
        handleTogglePopup();
        /*
        Axios.post("http://localhost:3001/editEmployee", {
            firstName: "Test",
            lastName: "Test2",
            salary: 12345,
            id: employee.id,
        }).then((response) => {
            console.log("EmployeeEdited " + employee.id);
        });*/
    };

    //Deletes employee with given id
    const deleteEmployee = (employee) => {
        Axios.post("http://localhost:3001/deleteEmployee", {
            id: employee.id,
        }).then((response) => {
            if (response) {
                /* Might add back later after looking up best practices
                employees = employees.filter((e) => e.id !== employee.id);
                document.getElementById(employee.id).remove();*/
                getEmployees();
            }
        });
    };

    return (
        <>
            <Popup
                isOpen={showPopup}
                onSave={handleSave}
                onCancel={handleCancel}
                fName={popupData.firstName}
                lName={popupData.lastName}
                sal={popupData.salary}
            />
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
            <button onClick={addEmployee}>Add Employee</button>
        </>
    );
}
