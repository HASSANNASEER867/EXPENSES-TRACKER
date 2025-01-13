import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Plus } from 'lucide-react';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, title: 'New machine', amount: -1400, date: '28 Dec 2024', type: 'expense' },
    { id: 2, title: 'Hi', amount: 1, date: '10 Jan 2023', type: 'income' },
    { id: 3, title: 'Wow', amount: 45000, date: '9 Jan 2023', type: 'income' },
    { id: 4, title: 'Booking', amount: -4000, date: '08 Jan 2023', type: 'expense' },
    { id: 5, title: 'Mobile', amount: -100000, date: '02 Nov 2022', type: 'expense' },
    { id: 6, title: 'Chair purchased', amount: -4000, date: '01 Jun 2021', type: 'expense' },
    { id: 7, title: 'Book purchasedd', amount: -2000, date: '17 May 2021', type: 'expense' },
    { id: 8, title: 'Lcd purchased', amount: -40000, date: '26 Mar 2021', type: 'expense' },
    { id: 9, title: 'Hehehe', amount: 10000, date: '06 Jan 2021', type: 'income' },
    { id: 10, title: 'Bike', amount: -1500, date: '17 Oct 2020', type: 'expense' },
    { id: 11, title: 'Bike sold', amount: 30000, date: '16 May 2020', type: 'income' },
    { id: 12, title: 'Bond open', amount: 100000, date: '16 Jan 2019', type: 'income' }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    date: '',
    type: 'expense',
    editingId: null, // Track the transaction being edited
  });

  const [sortOption, setSortOption] = useState('new-to-old');
  const [userName, setUserName] = useState('John Doe'); // Sample username
  const [bgImageUrl, setBgImageUrl] = useState('https://media.istockphoto.com/id/1165109078/photo/farlacombe-farm-midnight-july-2019.webp?a=1&b=1&s=612x612&w=0&k=20&c=E3h2oz2dB6Xv1h--BZ4puGx4Xqavhwn6yrKcv5XLuQs='); // Background image URL

  const totalBalance = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount || !formData.date) {
      alert('Please fill in all fields');
      return;
    }

    const newTransaction = {
      id: formData.editingId || transactions.length + 1,
      title: formData.title,
      amount: formData.type === 'expense' ? -Number(formData.amount) : Number(formData.amount),
      date: new Date(formData.date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      type: formData.type
    };

    if (formData.editingId) {
      // Editing an existing transaction
      setTransactions(prev => prev.map(t => t.id === formData.editingId ? newTransaction : t));
    } else {
      // Adding a new transaction
      setTransactions(prev => [newTransaction, ...prev]);
    }

    setFormData({
      title: '',
      amount: '',
      date: '',
      type: 'expense',
      editingId: null, // Reset after submit
    });
  };

  const handleEdit = (id) => {
    const transactionToEdit = transactions.find(t => t.id === id);
    setFormData({
      title: transactionToEdit.title,
      amount: Math.abs(transactionToEdit.amount),
      date: new Date(transactionToEdit.date).toISOString().split('T')[0],
      type: transactionToEdit.amount < 0 ? 'expense' : 'income',
      editingId: id,
    });
  };

  const handleDelete = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const handleSignOut = () => {
    // Handle sign-out logic here
    setUserName('');
    alert('Signed out successfully');
  };

  const sortedTransactions = transactions.slice().sort((a, b) => {
    if (sortOption === 'min-to-max') {
      return a.amount - b.amount;
    } else if (sortOption === 'max-to-min') {
      return b.amount - a.amount;
    } else if (sortOption === 'old-to-new') {
      return new Date(a.date) - new Date(b.date);
    } else if (sortOption === 'new-to-old') {
      return new Date(b.date) - new Date(a.date);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar with User Login */}
      <nav className="flex items-center justify-between bg-gray-100 px-6 py-4 shadow-md">
        {/* Left Section: Logo */}
        <div className="flex items-center">
          <div className="p-2 bg-blue-500 rounded-full">
            {/* Placeholder for logo icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5V19.5M19.5 12H4.5"
              />
            </svg>
          </div>
        </div>

        {/* Middle Section: Balance */}
        <div className="text-center flex-1">
          <h2 className="text-xl font-semibold">Total Balance</h2>
          <h3 className="text-lg text-gray-600">{totalBalance < 0 ? '- PKR ' : 'PKR '} {Math.abs(totalBalance).toLocaleString()}</h3>
        </div>

        {/* Right Section: User Info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A11.96 11.96 0 0112 15c2.672 0 5.119.872 7.121 2.305M12 15V9m0-6C6.477 3 2 7.477 2 13c0 2.637 1.056 5.026 2.757 6.757A11.944 11.944 0 0112 21a11.944 11.944 0 017.243-1.243C20.944 18.026 22 15.637 22 13c0-5.523-4.477-10-10-10z"
              />
            </svg>
            <span className="text-gray-700">{userName}</span>
          </div>
          <button 
            onClick={handleSignOut} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Sign Out
          </button>
        </div>
      </nav>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar - Add Record Form */}
        <div className="lg:w-96 w-full bg-cover bg-center" style={{
          backgroundImage: `url(${bgImageUrl})`,
          backgroundSize: 'cover'
        }}>
          <div className="h-full w-full bg-black bg-opacity-50 p-8">
            <h2 className="text-white text-xl font-semibold mb-6">{formData.editingId ? 'Edit Record' : 'Add a Record'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Transaction Title"
                className="w-full p-3 bg-white rounded-lg"
              />
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Amount"
                className="w-full p-3 bg-white rounded-lg"
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full p-3 bg-white rounded-lg"
              />
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full p-3 bg-white rounded-lg"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
              <button 
                type="submit" 
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {formData.editingId ? 'Update Transaction' : 'Add Transaction'}
              </button>
            </form>
          </div>
        </div>

        {/* Transaction List */}
        <div className="lg:flex-1 w-full bg-gray-100 p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">Transaction List</h2>
            <div className="flex items-center space-x-2">
              <label>Sort by:</label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="p-2 border rounded-lg"
              >
                <option value="new-to-old">New to Old</option>
                <option value="old-to-new">Old to New</option>
                <option value="max-to-min">Max to Min</option>
                <option value="min-to-max">Min to Max</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {sortedTransactions.map((transaction) => (
              <div key={transaction.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
                <div>
                  <h3 className="font-semibold">{transaction.title}</h3>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                    {transaction.type === 'income' ? <ArrowUpRight /> : <ArrowDownRight />}
                    {transaction.type === 'income' ? `+${transaction.amount}` : transaction.amount}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(transaction.id)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(transaction.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
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

export default TransactionList;
