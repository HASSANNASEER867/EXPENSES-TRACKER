import React, { useMemo, useState } from "react";
import { Check, X, Database, LogOut  } from "lucide-react";
import { initialRecords } from "../utils/records";
import { useMatch } from "react-router-dom";


const Dashboard = () => {
  const backgroundImage = useMemo(() => {
    return "https://images.unsplash.com/photo-1507917570388-d661984ea008?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TklHSFQlMjBTS1klMjBJTiUyMERFU0VSVHxlbnwwfHwwfHx8MA%3D%3D";
  }, []);

  const [records, setRecords] = useState(initialRecords);
  const [newRecord, setNewRecord] = useState({
    title: "",
    amount: "",
    date: "",
    type: "expense",
  });

  const totalAmount = records.reduce((sum, record) => sum + record.amount, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newRecord.title || !newRecord.amount || !newRecord.date) return;

    const amount =
      newRecord.type === "expense"
        ? -Math.abs(parseFloat(newRecord.amount))
        : Math.abs(parseFloat(newRecord.amount));
    setRecords([{ id: Date.now(), ...newRecord, amount: amount }, ...records]);

    setNewRecord({
      title: "",
      amount: "",
      date: "",
      type: "expense",
    });
  };

  const handleSort = (e) => {
    const sortBy = e.target.value;
    let sortedRecords;

    switch (sortBy) {
      case "date(NEW TO OLD)":
        sortedRecords = [...records].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        break;
      case "date(OLD TO NEW)":
        sortedRecords = [...records].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        break;
      case "MAX TO MIN":
        sortedRecords = [...records].sort((a, b) => b.amount - a.amount);
        break;
      case "MIN TO MAX":
        sortedRecords = [...records].sort((a, b) => a.amount - b.amount);
        break;
      default:
        sortedRecords = [...records];
    }

    setRecords(sortedRecords);
  };

  const handleEdit = (id) => {
    const recordToEdit = records.find((record) => record.id === id);
    if (recordToEdit) {
      setNewRecord({
        title: recordToEdit.title,
        amount: Math.abs(recordToEdit.amount),
        date: recordToEdit.date,
        type: recordToEdit.amount < 0 ? "expense" : "income",
      });
      setRecords(records.filter((record) => record.id !== id)); // Remove the record for editing
    }
  };

  const handleDelete = (id) => {
    setRecords(records.filter((record) => record.id !== id)); // Remove the record
  };

  return (
    <div className="h-screen bg-gray-50 mx-8">
          {/* HEADER */}
          <div className="w-full bg-white shadow-sm py-4 flex items-center justify-between">
            <Database className="h-6 w-6 text-primary" />
            
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Mutahhir khan</span>
              <button className="bg-primary text-white px-4 py-1 flex items-center gap-2 rounded-full transition-colors">
                <LogOut size={"16"} strokeWidth={3}/>
                Sign Out
              </button>
            </div>

          </div>

      {/* Main Content with Sidebar */}
      <div className=" mx-auto flex flex-col md:flex-row mt-6">
        {/* Sidebar - Add Record Form */}
        <div style={{
              backgroundImage: `url(${backgroundImage})`,
        }} className="px-4 flex flex-col justify-center sticky text-white top-6 shadow-lg bg-cover bg-center bg-no-repeat">
          
            <h3 className="text-2xl font-semibold mb-4">Add a Record</h3>
            <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
              <input
                type="text"
                placeholder="Title"
                className="w-full bg-transparent border border-gray-300 rounded p-2 focus:outline-none focus:border-gray-500"
                value={newRecord.title}
                onChange={(e) =>
                  setNewRecord({ ...newRecord, title: e.target.value })
                }
              />
              <div className="flex gap-4">
                <select
                  className="bg-transparent border border-gray-300 rounded p-2 focus:outline-none focus:border-gray-500"
                  value={newRecord.type}
                  onChange={(e) =>
                    setNewRecord({ ...newRecord, type: e.target.value })
                  }
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
                <input
                  type="number"
                  placeholder="Amount"
                  className="flex-1 bg-transparent border border-gray-300 rounded p-2 focus:outline-none focus:border-gray-500"
                  value={newRecord.amount}
                  onChange={(e) =>
                    setNewRecord({ ...newRecord, amount: e.target.value })
                  }
                />
              </div>
              <input
                type="date"
                className="w-full bg-transparent border border-gray-300 rounded p-2 focus:outline-none focus:border-gray-500"
                value={newRecord.date}
                onChange={(e) =>
                  setNewRecord({ ...newRecord, date: e.target.value })
                }
              />
              {/* <input
                type="hidden"
                value={newRecord.backgroundImage}
                onChange={(e) =>
                  setNewRecord({
                    ...newRecord,
                    backgroundImage: e.target.value,
                  })
                }
              /> */}
              <button
                type="submit"
                className="w-full text-white px-4 py-2 rounded  transition-colors flex items-center justify-center gap-2"
              >
                <span>+</span> Add
              </button>
            </form>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-4">
          {/* Balance and Sort */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg">
              PKR {totalAmount.toLocaleString().replace(/1000/g, "1k")}
            </div>
            <select
              className="border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleSort}
            >
              <option value="date(NEW TO OLD)">Date (NEW TO OLD)</option>
              <option value="date(OLD TO NEW)">Date (OLD TO NEW)</option>
              <option value="MAX TO MIN">MAX TO MIN</option>
              <option value="MIN TO MAX">MIN TO MAX</option>
            </select>
          </div>

          {/* Records List - Scrollable and Not Sticky */}
          <div
            className="space-y-2 overflow-y-auto max-h-[500px] scrollbar-hide"
            style={{
              height: "calc(100vh - 240px)", // Adjust this to give enough space for header/footer
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {records.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
              >
                <div className="flex items-center gap-3">
                  {record.amount > 0 ? (
                    <Check className="text-green-500 h-5 w-5" />
                  ) : (
                    <X className="text-red-500 h-5 w-5" />
                  )}
                  <span>{record.title}</span>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={
                      record.amount > 0 ? "text-green-500" : "text-red-500"
                    }
                  >
                    {record.amount > 0 ? "PKR " : "-PKR "}
                    {Math.abs(record.amount) >= 1000
                      ? `${(Math.abs(record.amount) / 1000).toFixed(1)}k`
                      : Math.abs(record.amount).toLocaleString()}
                  </span>
                  <span className="text-gray-500">
                    {new Date(record.date).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <div className="space-x-2">
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => handleEdit(record.id)}
                    >
                      EDIT
                    </button>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => handleDelete(record.id)}
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
