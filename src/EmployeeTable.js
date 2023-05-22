import testData from "./data.json";

function EmployeeTable() {
    return (
        <>
            <table>
                <thead>Employees</thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Salary</th>
                    <th>Edit/Delete</th>
                </tr>

                {testData.map((employee) => {
                    return (
                        <tr key={employee.firstName + " " + employee.lastName}>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.salary}</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    );
                })}
            </table>
        </>
    );
}

export default EmployeeTable;
