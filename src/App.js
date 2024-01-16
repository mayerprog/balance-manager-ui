import React, { useState } from "react";
import "./App.css"; // Импортируйте CSS файл для стилей

function App() {
  const users = [
    { id: 1, name: "Alexey Ivanov", email: "alexey.ivanov@example.com" },
    { id: 2, name: "Maria Sidorova", email: "maria.sidorova@example.com" },
    { id: 3, name: "Ivan Petrov", email: "ivan.petrov@example.com" },
  ];

  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");

  const handleAction = (actionType) => {
    console.log(
      `Action: ${actionType} | User ID: ${userId} | Amount: ${amount}`
    );
    // Добавьте здесь логику обработки действий
  };

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
              <td>{"0.00"}</td>
              <td>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="action-form">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <button onClick={() => handleAction("Deposit")}>Deposit</button>
        <button onClick={() => handleAction("Withdraw")}>Withdraw</button>
        <button onClick={() => handleAction("Transfer")}>Transfer</button>
      </div>
    </div>
  );
}

export default App;
