import React from "react";

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-green-600 text-white px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-2xl font-bold">HealthEd Kids - Admin Dashboard</h1>
        <button className="bg-white text-green-600 px-4 py-2 rounded-md font-semibold hover:bg-green-100">
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: User Overview */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">👦 User Overview</h2>
          <p>
            Total Registered Kids:{" "}
            <span className="font-bold text-green-600">1,245</span>
          </p>
          <p>
            Active Today: <span className="font-bold text-green-600">312</span>
          </p>
          <p>
            Average Daily Playtime: <span className="font-bold">28 min</span>
          </p>
        </section>

        {/* Card 2: Challenge Stats */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">
            🏆 Challenge Completion
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>“Eat a Fruit Today” – 78% completed</li>
            <li>“10-Minute Exercise” – 64% completed</li>
            <li>“Brush Twice Daily” – 91% completed</li>
          </ul>
        </section>

        {/* Card 3: Engagement */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">📊 Engagement Insights</h2>
          <p>
            Most Played Game:{" "}
            <span className="font-bold">Healthy Food Match</span>
          </p>
          <p>
            Top Age Group: <span className="font-bold">7–9 years</span>
          </p>
          <p>
            Average Reward Points Earned:{" "}
            <span className="font-bold">145 pts</span>
          </p>
        </section>

        {/* Card 4: Recent Activity */}
        <section className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
          <h2 className="text-lg font-semibold mb-3">
            🕒 Recent Player Activity
          </h2>
          <table className="w-full text-left border-t border-gray-200">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2">Name</th>
                <th className="py-2">Game Played</th>
                <th className="py-2">Score</th>
                <th className="py-2">Reward</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-2">Ava Johnson</td>
                <td>Healthy Food Match</td>
                <td>940</td>
                <td>🎖️ +20 pts</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2">Liam Brown</td>
                <td>Hygiene Hero</td>
                <td>860</td>
                <td>⭐ +15 pts</td>
              </tr>
              <tr>
                <td className="py-2">Mia Patel</td>
                <td>Active Adventure</td>
                <td>720</td>
                <td>🏅 +10 pts</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Card 5: Admin Controls */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3">⚙️ Admin Controls</h2>
          <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 mb-2">
            Add New Challenge
          </button>
          <button className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 mb-2">
            Manage Rewards
          </button>
          <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600">
            Delete Inactive Accounts
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-600 py-4">
        © 2025 HealthEd Kids | Built for a healthier, happier generation 🌱
      </footer>
    </div>
  );
};

export default AdminDashboard;
