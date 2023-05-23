import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

//Popup component for editing/adding employee details
export default function Popup({ isOpen, onSave, onCancel }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [salary, setSalary] = useState("");

    const handleSave = () => {
        const data = {
            firstName,
            lastName,
            salary,
        };
        onSave(data);
    };

    const handleCancel = () => {
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
