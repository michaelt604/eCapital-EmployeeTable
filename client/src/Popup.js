import { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

//Popup component for editing/adding employee details
export default function Popup({ isOpen, onSave, onCancel, fName, lName, sal }) {
    const [firstName, setFirstName] = useState(fName);
    const [lastName, setLastName] = useState(lName);
    const [salary, setSalary] = useState(sal);

    useEffect(() => {
        resetInputs();
    });

    //Sets all employee details to default values
    const resetInputs = () => {
        setFirstName(fName);
        setLastName(lName);
        setSalary(sal);
    };

    //Clears all employee details
    const clearInputs = () => {
        setFirstName("");
        setLastName("");
        setSalary("");
    };

    //Handles saving employee details input
    const handleSave = () => {
        const data = {
            firstName,
            lastName,
            salary,
        };
        clearInputs();
        onSave(data);
    };

    //Handles cancelling employee details input
    const handleCancel = () => {
        clearInputs();
        onCancel();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onCancel}
            contentLabel="Enter Employee Details"
        >
            <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
        </Modal>
    );
}
