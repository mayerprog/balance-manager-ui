import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { usersAPI } from "./api/usersAPI";
import { balanceAPI } from "./api/balanceAPI";

function App() {
  const [users, setUsers] = useState([]);
  const [usersData, setUsersData] = useState({});

  const fetchUsersWithBalances = useCallback(async () => {
    try {
      const allUsers = await usersAPI.getUsers();
      const usersWithBalances = await Promise.all(
        allUsers.map(async (user) => {
          const balance = await balanceAPI.getBalance(user.id);
          return { ...user, balance };
        })
      );
      setUsers(usersWithBalances);
      return allUsers;
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const allUsers = await fetchUsersWithBalances();

        const initialUserData = {};
        allUsers.forEach((user) => {
          initialUserData[user.id] = {
            depositAmount: "",
            withdrawAmount: "",
            transferAmount: "",
            toUserId: "",
          };
        });
        setUsersData(initialUserData);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [fetchUsersWithBalances]);

  const isValidAmount = (amount) => !isNaN(amount) && Number(amount) > 0;
  const canPerformAction = (userId, actionType) => {
    const userData = usersData[userId];
    if (!userData) return false;

    switch (actionType) {
      case "Deposit":
      case "Withdraw":
        return isValidAmount(userData[`${actionType.toLowerCase()}Amount`]);
      case "Transfer":
        return (
          isValidAmount(userData.transferAmount) &&
          userData.toUserId &&
          userData.toUserId !== userId
        );
      default:
        return false;
    }
  };

  const handleAction = async (actionType, userId, amount, toUserId) => {
    if (!canPerformAction(userId, actionType)) {
      alert("Invalid input");
      return;
    }

    try {
      switch (actionType) {
        case "Deposit":
          await balanceAPI.updateBalance(userId, amount);
          break;
        case "Withdraw":
          await balanceAPI.updateBalance(userId, -amount);
          break;
        case "Transfer":
          await balanceAPI.transferFunds(userId, toUserId, amount);
          break;
        default:
          return;
      }
      await fetchUsersWithBalances();
    } catch (err) {
      console.error(err);
      alert("Operation failed. Please try again.");
    }
  };

  const handleInputChange = (userId, field, value) => {
    setUsersData({
      ...usersData,
      [userId]: {
        ...usersData[userId],
        [field]: value,
      },
    });
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
              <td>
                <div>{user.balance || "0.00"}</div>
                <div>rub.</div>
              </td>
              <td>
                <div className="flex-container">
                  <input
                    type="number"
                    value={usersData[user.id]?.depositAmount || ""}
                    onChange={(e) =>
                      handleInputChange(
                        user.id,
                        "depositAmount",
                        e.target.value
                      )
                    }
                    placeholder="Amount"
                    min="0"
                  />
                  <button
                    onClick={() =>
                      handleAction(
                        "Deposit",
                        user.id,
                        usersData[user.id].depositAmount
                      )
                    }
                    disabled={!canPerformAction(user.id, "Deposit")}
                  >
                    Deposit
                  </button>
                </div>
              </td>
              <td>
                <div className="flex-container">
                  <input
                    type="number"
                    value={usersData[user.id]?.withdrawAmount || ""}
                    onChange={(e) =>
                      handleInputChange(
                        user.id,
                        "withdrawAmount",
                        e.target.value
                      )
                    }
                    placeholder="Amount"
                    min="0"
                  />
                  <button
                    onClick={() =>
                      handleAction(
                        "Withdraw",
                        user.id,
                        usersData[user.id].withdrawAmount
                      )
                    }
                    disabled={!canPerformAction(user.id, "Withdraw")}
                  >
                    Withdraw
                  </button>
                </div>
              </td>
              <td>
                <div className="flex-container">
                  <input
                    type="number"
                    value={usersData[user.id]?.toUserId || ""}
                    onChange={(e) =>
                      handleInputChange(user.id, "toUserId", e.target.value)
                    }
                    placeholder="User Id"
                    min="0"
                  />
                  <input
                    type="number"
                    value={usersData[user.id]?.transferAmount || ""}
                    onChange={(e) =>
                      handleInputChange(
                        user.id,
                        "transferAmount",
                        e.target.value
                      )
                    }
                    placeholder="Amount"
                    min="0"
                  />
                  <button
                    onClick={() =>
                      handleAction(
                        "Transfer",
                        user.id,
                        usersData[user.id].transferAmount,
                        usersData[user.id].toUserId
                      )
                    }
                    disabled={!canPerformAction(user.id, "Transfer")}
                  >
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
