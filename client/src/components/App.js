import "./App.css";
import EmployeeTable from "./EmployeeTable";
import Axios from "axios";
import React, { useState, useEffect, useRef, useCallback } from "react";

export default function App() {
    const [employees, setEmployees] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const getEmployees = useCallback(async () => {
        try {
            const response = await Axios.get("http://localhost:3001/getEmployee");
            setEmployees(response.data);
        } catch (error) {
            console.error("Error getting employees:", error);
        }
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file && file.type === "application/json") {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const jsonData = JSON.parse(e.target.result);
                    if (jsonData !== selectedFile) {
                        setSelectedFile(jsonData);
                    }
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

    const handleFileUpload = useCallback(async () => {
        if (!selectedFile) {
            console.error("No file selected");
            return;
        }

        try {
            await Axios.post("http://localhost:3001/importJson", {
                json: selectedFile.employees,
            });

            fileInputRef.current.value = "";
            setSelectedFile(null);

            console.log("JSON file uploaded successfully");
            getEmployees();
        } catch (error) {
            console.error("Error uploading JSON file:", error.message);
        }
    }, [selectedFile, getEmployees]);

    const handleCleanDB = async () => {
        try {
            await Axios.post("http://localhost:3001/cleanDB");
            getEmployees();
        } catch (error) {
            console.error("Error cleaning database:", error);
        }
    };

    //Ensure we only handle file upload if we have a file to upload
    useEffect(() => {
        if (selectedFile) {
            handleFileUpload();
        }
    }, [selectedFile, handleFileUpload]);

    //Displays a list of employees of page refresh
    useEffect(() => {
        getEmployees();
    }, [getEmployees]);

    return (
        <div className="app">
            <h1 className="employee-header">Employees</h1>
            <EmployeeTable className="employee-table" employees={employees} getEmployees={getEmployees} />
            <div className="file-upload">
                <button className="bottom-btn" onClick={() => handleCleanDB()}>
                    Clean DataBase
                </button>
                <input key={selectedFile ? "file-selected" : "file-input"} type="file" accept=".json" onChange={handleFileChange} ref={fileInputRef} style={{ display: "none" }} />
                <button className="bottom-btn" onClick={handleChooseFile}>
                    Upload JSON
                </button>
            </div>
        </div>
    );
}
