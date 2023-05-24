# eCapital Employee Table

This app allows you to manage a list of employees. You can add new employees, edit existing ones, delete employees, and view the employee list. The app uses a React frontend and a Node.js backend with a MySQL database.

## Getting Started

1. Clone the repository: `git clone https://github.com/michaelt604/eCapital-EmployeeTable`.
2. Install dependencies:
    - Frontend: `cd client && npm install`.
    - Backend: `cd server && npm install`.
3. Add the .env file in the server folder (will auto connect to a MySQL database on my server)
4. Start the backend server: `cd server && node index.js`.
5. Start the frontend app: `cd client && npm start`.
6. Access the app in your browser at `http://localhost:3000`.

## Additional Instructions
- To start the table with a fresh import,

## Frontend Functionality

### Form

-   **Add Employee**: Opens a popup to submit First Name, Last Name, and Salary
-   **Clean Database**: Opens a confirmation box before clearning all employees from the database
-   **Upload JSON**: Opens a file explorer to select a json to upload to the database (format must match data.json from the start folder)

### Table

-   **Edit**: Opens a popup to edit selected employee First Name, Last Name, and Salary
-   **Delete**: Opens a confirmation box before removing selected employee from the database

### Popup

-   **First Name**: Employee First Name
-   **Last Name**: Employee Last Name
-   **Salary**: Employee Salary
-   **Save**: Saves Employee Details
-   **Cancel**: Cancels Entering Employee Details

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
