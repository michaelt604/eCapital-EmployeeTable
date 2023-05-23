import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function Popup({ isOpen, onRequestClose }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [salary, setSalary] = useState("");

    const handleSave = () => {
        //Reset input fields
        setFirstName("");
        setLastName("");
        setSalary("");

        //Close Popup
        onRequestClose();
    };

    const handleCancel = () => {
        // Reset the input fields
        setFirstName("");
        setLastName("");
        setSalary("");

        // Close the popup
        onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
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
            <button className="cancel-button" onClick={handleCancel}>
                Cancel
            </button>
        </Modal>
    );
}
