import "./App.css";
import Axios from "axios";
import testData from "./data.json";
import { useState } from "react";
import Popup from "./Popup";

export default function EmployeeTable({ employees, getEmployees }) {
    const [showPopup, setShowPopup] = useState(false);
    const [popupData, setPopupData] = useState(null);

    //Handles popup closing
    const handleCancel = () => {
        setShowPopup(false);
    };

    //Toggles Popup: Set's popupData for use when modal is closed
    const handleTogglePopup = (employee) => {
        setPopupData(employee);
        setShowPopup(!showPopup);
    };

    //Handles data saving: If id exists (not -1), edit employee, else add new employee
    const onSave = (data) => {
        data.id = popupData.id;
        setPopupData(data);
        console.log("Updated data: " + JSON.stringify(popupData));
        setShowPopup(false);

        data.id === -1 ? addEmployee(data) : editEmployee(data);
    };

    //Adds new employee to database
    const addEmployee = async (employee) => {
        console.log("AddEmployee " + JSON.stringify(employee));

        await Axios.post("http://localhost:3001/addEmployee", {
            firstName: employee.firstName,
            lastName: employee.lastName,
            salary: employee.salary,
        }).then((response) => {
            getEmployees(); //Refresh table
        });
    };

    //Edits employee with given id
    const editEmployee = async (employee) => {
        console.log("EditEmployee " + JSON.stringify(employee));

        await Axios.post("http://localhost:3001/editEmployee", {
            firstName: employee.firstName,
            lastName: employee.lastName,
            salary: employee.salary,
            id: employee.id,
        }).then((response) => {
            getEmployees(); //Refresh table
        });
    };

    //Deletes employee with given id then refresh table
    const deleteEmployee = (employee) => {
        Axios.post("http://localhost:3001/deleteEmployee", {
            id: employee.id,
        }).then((response) => {
            if (response) {
                getEmployees();
            }
        });
    };

    return (
        <>
            <Popup
                className="table-popup"
                isOpen={showPopup}
                onSave={onSave}
                onCancel={handleCancel}
                employee={popupData}
                //fName={popupData.firstName}
                //lName={popupData.lastName}
                //sal={popupData.salary}
            />
            <table className="employee-table">
                <thead className="table-head">
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Salary</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody className="table-body">
                    {employees.map((employee) => {
                        return (
                            <tr key={employee.id} id={employee.id}>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.salary}</td>
                                <td>
                                    <button
                                        onClick={() =>
                                            handleTogglePopup(employee)
                                        }
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
            <button
                className="add-employee-btn"
                onClick={() =>
                    handleTogglePopup({
                        id: -1,
                        firstName: "",
                        lastName: "",
                        salary: 0,
                    })
                }
            >
                Add Employee
            </button>
        </>
    );
}
