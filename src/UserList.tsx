import { useState, useEffect } from "react";
interface User {
  ID: string;
  FirstNameLastName: string;
  JobTitle: string;
  Company:string;
  Email: string;
  Phone: string;
}

interface ApiResponse {
  users: User[];
}

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(
          `https://give-me-users-forever.vercel.app/api/users/${currentPage}/next`
        );
        const data: ApiResponse = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUsers();
  }, [currentPage]);

  function handlePreviousPage() {
    setCurrentPage(currentPage - 10);
  }

  function handleNextPage() {
    setCurrentPage(currentPage + 10);
  }

return (
  <div className="user-list">
    {users && users.length > 0 ? (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Job Title</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.ID}>
              <td>{user.FirstNameLastName}</td>
              <td>{user.Email}</td>
              <td>{user.Phone}</td>
              <td>{user.Company}</td>
              <td>{user.JobTitle}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>Loading...</p>
    )}
    <div className="buttons">
      <button onClick={handlePreviousPage} disabled={currentPage === 0}>
        Previous
      </button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  </div>
);

}

export default UserList;
