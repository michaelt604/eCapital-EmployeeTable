import "./App.css";
import EmployeeTable from "./EmployeeTable";
import Axios from "axios";
import React, { useState, useEffect, useRef } from "react";

export default function App() {
    const [employees, setEmployees] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const getEmployees = async () => {
        try {
            Axios.get("http://localhost:3001/getEmployee").then((response) => {
                setEmployees(response.data);
            });
        } catch (error) {
            console.error("Error getting employees:", error);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file && file.type === "application/json") {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const jsonData = JSON.parse(e.target.result);
                    setSelectedFile(jsonData);
                } catch (error) {
                    console.error("Error parsing JSON file:", error);
                }
            };
            reader.readAsText(file);
        } else {
            setSelectedFile(null);
            console.error("Invalid file format. Please select a JSON file.");
        }
    };

    const handleChooseFile = () => {
        fileInputRef.current.click();
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            console.error("No file selected");
            return;
        }

        try {
            await Axios.post("http://localhost:3001/importJson", {
                json: selectedFile.employees,
            });

            //Reset file input
            setSelectedFile(null);

            console.log("JSON file uploaded successfully");
            getEmployees();
        } catch (error) {
            console.error("Error uploading JSON file:", error.message);
        }
    };

    const handleCleanDB = async () => {
        try {
            await Axios.post("http://localhost:3001/cleanDB");
            getEmployees();
        } catch (error) {
            console.error("Error cleaning database:", error);
        }
    };

    //Displays a list of employees of page refresh
    useEffect(() => {
        getEmployees();
    }, []);

    return (
        <div className="app">
            <h1 className="employee-header">Employees</h1>
            <EmployeeTable
                className="employee-table"
                employees={employees}
                getEmployees={getEmployees}
            />
            <div className="file-upload">
                <button className="bottom-btn" onClick={() => handleCleanDB()}>
                    Clean DataBase
                </button>
                <button
                    className="bottom-btn"
                    id="import-btn"
                    onClick={() => handleFileUpload()}>
                    Import JSON
                </button>
                <input
                    type="file"
                    accept=".json"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    style={{ display: "none" }}
                />
                <button className="bottom-btn" onClick={handleChooseFile}>
                    Choose File
                </button>
            </div>
        </div>
    );
}
