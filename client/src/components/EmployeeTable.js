import "./EmployeeTable.css";
import Axios from "axios";
import React, { useState } from "react";
import Popup from "./Popup";
import employeeData from "../data.json";

export default function EmployeeTable({ employees, getEmployees }) {
    const [showPopup, setShowPopup] = useState(false);
    const [popupData, setPopupData] = useState(null);

    //Toggles Popup: Set's popupData for use when modal is closed
    const handleTogglePopup = (employee) => {
        setPopupData(employee);
        setShowPopup(true);
    };

    //Handles data saving: If id exists (not -1), edit employee, else add new employee
    const onSave = async (data) => {
        const updateEmployee = { ...popupData, ...data };
        setPopupData(updateEmployee);
        setShowPopup(false);

        try {
            if (updateEmployee.id === -1) {
                // Add new employee
                const response = await Axios.post("http://localhost:3001/addEmployee", {
                    firstName: updateEmployee.firstName,
                    lastName: updateEmployee.lastName,
                    salary: updateEmployee.salary,
                });
                console.log(response);
            } else {
                // Edit existing employee
                const response = await Axios.post("http://localhost:3001/editEmployee", {
                    firstName: updateEmployee.firstName,
                    lastName: updateEmployee.lastName,
                    salary: updateEmployee.salary,
                    id: updateEmployee.id,
                });
                console.log(response);
            }
            getEmployees();
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    };

    //Deletes employee with given id then refresh table
    const deleteEmployee = async (employee) => {
        try {
            await Axios.post("http://localhost:3001/deleteEmployee", {
                id: employee.id,
            });
            getEmployees();
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    return (
        <>
            <Popup className="table-popup" isOpen={showPopup} onSave={onSave} onCancel={() => setShowPopup(false)} employee={popupData} />
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
                                <td>
                                    {new Intl.NumberFormat(undefined, {
                                        style: "currency",
                                        currency: "USD",
                                        maximumFractionDigits: 0,
                                        minimumFractionDigits: 0,
                                    }).format(employee.salary)}
                                </td>
                                <td className="table-body-buttons">
                                    <div className="btn-container">
                                        <button className="sub-btn" onClick={() => handleTogglePopup(employee)}>
                                            Edit
                                        </button>
                                        <button className="sub-btn" onClick={() => deleteEmployee(employee)}>
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="bottom-div">
                <button
                    className="bottom-btn"
                    onClick={() =>
                        handleTogglePopup({
                            id: -1,
                            firstName: "",
                            lastName: "",
                            salary: 0,
                        })
                    }>
                    Add Employee
                </button>
            </div>
        </>
    );
}
