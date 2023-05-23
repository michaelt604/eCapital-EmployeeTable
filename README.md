# eCapital Employee Table

This app allows you to manage a list of employees. You can add new employees, edit existing ones, delete employees, and view the employee list. The app uses a React frontend and a Node.js backend with a MySQL database.

## Getting Started

1. Clone the repository: `git clone https://github.com/your-username/your-repo.git`.
2. Install dependencies:
    - Frontend: `cd client && npm install`.
    - Backend: `cd server && npm install`.
3. Add the .env file in the server folder (will auto connect to a MySQL database on my server)
4. Start the backend server: `cd server && npm node index.js`.
5. Start the frontend app: `cd client && npm start`.
6. Access the app in your browser at `http://localhost:3000`.

## Technologies Used

-   Frontend:

    -   React: JavaScript library for building user interfaces.
    -   Axios: Promise-based HTTP client for making API requests.
    -   Modal: React component for creating modals.

-   Backend:
    -   Node.js: JavaScript runtime for server-side development.
    -   Express: Web application framework for Node.js.
    -   MySQL: Relational database management system.

## File Structure

-   `index.js`: Entry point of the React frontend.
-   `App.js`: Main component of the React frontend. It handles the state and functionality of the app.
-   `EmployeeTable.js`: Component that displays the employee table and handles employee CRUD operations.
-   `Popup.js`: Component for the popup/modal used for adding/editing employee details.
-   `App.css`, `EmployeeTable.css`, `Popup.css`: CSS stylesheets for styling the app.
-   `server.js`: Backend server file that handles API requests and communicates with the database.

## Frontend Functionality

### App.js

-   State:
    -   `employees`: Array of employees fetched from the backend.
    -   `selectedFile`: The selected JSON file to be uploaded.
-   Ref:

    -   `fileInputRef`: Reference to the file input element for uploading JSON files.

-   Functions:

    -   `getEmployees()`: Fetches the list of employees from the backend.
    -   `handleFileChange(e)`: Handles the file selection and parses the JSON file.
    -   `handleChooseFile()`: Opens the file input dialog.
    -   `handleFileUpload()`: Uploads the selected JSON file to the backend.
    -   `handleCleanDB()`: Deletes all employees from the database.
    -   `handleTogglePopup(employee)`: Toggles the display of the employee details popup.
    -   `onSave(data)`: Saves the employee details entered in the popup.
    -   `deleteEmployee(employee)`: Deletes an employee from the database.

-   Lifecycle Hooks:
    -   `useEffect()`:
        -   Fetches the list of employees when the component is mounted.
        -   Uploads the selected file when `selectedFile` state changes.

## Backend Functionality

### server.js

-   Dependencies:

    -   `express`: Web application framework for Node.js.
    -   `mysql`: MySQL database driver.
    -   `cors`: Middleware to enable Cross-Origin Resource Sharing.

-   Middleware:

    -   `express.json()`: Parses JSON request bodies.
    -   `cors()`: Enables CORS for handling cross-origin requests.

-   API Endpoints:
    -   `POST /importJson`: Imports the default employee table from a JSON file into the database.
    -   `POST /cleanDB`: Deletes all employees from the database.
    -   `GET /employees`: Fetches the list of all employees from the database.
    -   `POST /employee`: Adds a new employee to the database.
    -   `PUT /employee/:id`: Updates the details of an existing employee.
    -   `DELETE /employee/:id`: Deletes an employee from the database.
