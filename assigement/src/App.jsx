 
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://api.github.com/users");

        if (!response.ok) {
          throw new Error("Failed to fetch GitHub users");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <h2 className="message">Loading GitHub users...</h2>;
  }

  if (error) {
    return <h2 className="message error">{error}</h2>;
  }

  return (
    <div className="app">
      <header className="header">
        <h1>GitHub Users</h1>
        <p>Assignment 7 — Fetch API with useEffect</p>
        <span>Total Users: {users.length}</span>
      </header>

      <main className="user-grid">
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            <img
              className="avatar"
              src={user.avatar_url}
              alt={`${user.login} avatar`}
            />

            <h2>{user.login}</h2>
            <p className="user-type">{user.type}</p>

            <a
              className="profile-link"
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
            >
              View GitHub Profile
            </a>

            <div className="details">
              {Object.entries(user).map(([key, value]) => (
                <div className="detail-row" key={key}>
                  <strong>{key.replaceAll("_", " ")}:</strong>
                  <span>
                    {typeof value === "object"
                      ? JSON.stringify(value)
                      : String(value ?? "N/A")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
