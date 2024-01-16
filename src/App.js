import React, { useEffect, useState } from "react";
import "./App.css"; // Импортируйте CSS файл для стилей
import { usersAPI } from "./api/usersAPI";
import { balanceAPI } from "./api/balanceAPI";

function App() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");

  const handleAction = (actionType) => {
    console.log(
      `Action: ${actionType} | User ID: ${userId} | Amount: ${amount}`
    );
    // Добавьте здесь логику обработки действий
  };

  useEffect(() => {
    (async () => {
      try {
        const allUsers = await usersAPI.getUsers();

        const usersWithBalances = await Promise.all(
          allUsers.map(async (user) => {
            const balance = await balanceAPI.getBalance(user.id);
            return { ...user, balance };
          })
        );

        console.log("Users with balances", usersWithBalances);
        setUsers(usersWithBalances);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className="App">
      <h2>User Balance Management</h2>

      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Balance</th>
            <th>Deposit</th>
            <th>Withdraw</th>
            <th>Transfer to</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.balance || "0.00"}</td>
              <td>
                <div className="flex-container">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                  />
                  <button onClick={() => handleAction("Transfer")}>
                    Deposit
                  </button>
                </div>
              </td>
              <td>
                <div className="flex-container">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                  />
                  <button onClick={() => handleAction("Transfer")}>
                    Withdraw
                  </button>
                </div>
              </td>
              <td>
                <div className="flex-container">
                  <input
                    type="number"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="UserId"
                  />
                  <button onClick={() => handleAction("Transfer")}>
                    Transfer
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
