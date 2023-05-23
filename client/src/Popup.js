import { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

//Popup component for editing/adding employee details
export default function Popup({ isOpen, onSave, onCancel, employee }) {
    const [id, setId] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [salary, setSalary] = useState(0);

    useEffect(() => {
        if (isOpen && employee) {
            // Update the state values with the employee data when the popup is opened for editing
            setId(employee.id);
            setFirstName(employee.firstName);
            setLastName(employee.lastName);
            setSalary(employee.salary);
        } else {
            // Reset the state values when the popup is opened for adding
            setId(-1);
            setFirstName("");
            setLastName("");
            setSalary(0);
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
        onCancel();
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
                        "";
                        e.preventDefault();
                        setFirstName("");
                        setLastName("");
                        setSalary(0);
                        //props.newEmployee(id, firstName, lastName, salary);
                    }}
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
