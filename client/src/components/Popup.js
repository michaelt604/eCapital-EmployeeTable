import React, { useState, useEffect } from "react";
import Modal from "react-modal";

import "./Popup.css";

Modal.setAppElement("#root");

//Popup component for editing/adding employee details
export default function Popup({ isOpen, onSave, onCancel, employee }) {
    const [id, setId] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [salary, setSalary] = useState(0);
    const [unsavedChanges, setUnsavedChanges] = useState(false);

    useEffect(() => {
        if (isOpen && employee) {
            // Update the state values with the employee data when the popup is opened for editing
            setId(employee.id);
            setFirstName(employee.firstName);
            setLastName(employee.lastName);
            setSalary(employee.salary);
            setUnsavedChanges(false);
        } else {
            // Reset the state values when the popup is opened for adding
            setId(-1);
            setFirstName("");
            setLastName("");
            setSalary(0);
            setUnsavedChanges(false);
        }
    }, [isOpen, employee]);

    //Handles saving employee details input
    const handleSave = () => {
        const data = {
            id: id,
            firstName: firstName,
            lastName: lastName,
            salary: salary,
        };
        onSave(data);
    };

    //Handles cancelling employee details input
    const handleCancel = () => {
        if (unsavedChanges) {
            const confirmCancel = window.confirm(
                "Are you sure you want to cancel? Your changes will be lost."
            );
            if (confirmCancel) {
                onCancel();
            }
        } else {
            onCancel();
        }
    };

    const handleInputChange = (e) => {
        setUnsavedChanges(true); //Any change sets unsaved changes flag

        // Update input values
        switch (e.target.name) {
            case "firstName":
                setFirstName(e.target.value);
                break;
            case "lastName":
                setLastName(e.target.value);
                break;
            case "salary":
                setSalary(e.target.value);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <Modal
                className="modal-container"
                isOpen={isOpen}
                onRequestClose={handleCancel}
                contentLabel="Enter Employee Details"
            >
                <form
                    className="modal-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={firstName}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="salary"
                        placeholder="Salary"
                        value={salary}
                        onChange={handleInputChange}
                    />
                </form>

                <button className="modal-button" onClick={handleSave}>
                    Save
                </button>
                <button className="modal-button" onClick={handleCancel}>
                    Cancel
                </button>
            </Modal>
        </>
    );
}
