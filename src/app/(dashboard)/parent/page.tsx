import React from "react";

const ParentsDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-green-100 to-blue-100 text-gray-800">
      {/* Header */}
      <header className="bg-green-600 text-white px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-2xl font-bold">HealthEd Kids - Parent Dashboard</h1>
        <button className="bg-white text-green-600 px-4 py-2 rounded-md font-semibold hover:bg-green-100">
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Child Overview */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">👦 Child Overview</h2>
          <p>
            Child: <span className="font-bold text-green-600">Ava Johnson</span>
          </p>
          <p>
            Age: <span className="font-bold">8 years</span>
          </p>
          <p>
            Joined: <span className="font-bold">March 2025</span>
          </p>
          <p>
            Total Points Earned:{" "}
            <span className="font-bold text-blue-600">1,240 pts</span>
          </p>
        </section>

        {/* Card 2: Current Challenges */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">🏆 Active Challenges</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>
              “Eat a Fruit Today” –{" "}
              <span className="text-green-600 font-bold">Completed ✅</span>
            </li>
            <li>
              “10-Minute Exercise” –{" "}
              <span className="text-yellow-600 font-bold">In Progress ⏳</span>
            </li>
            <li>
              “Drink 5 Glasses of Water” –{" "}
              <span className="text-gray-500 font-bold">Not Started</span>
            </li>
          </ul>
        </section>

        {/* Card 3: Recent Achievements */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">🎖️ Recent Achievements</h2>
          <ul className="space-y-2">
            <li>⭐ “Healthy Snack Hero” – earned 30 pts</li>
            <li>🏅 “Morning Routine Master” – earned 25 pts</li>
            <li>🎉 “Fitness Explorer” – earned 40 pts</li>
          </ul>
        </section>

        {/* Card 4: Weekly Progress */}
        <section className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
          <h2 className="text-lg font-semibold mb-3">📊 Weekly Progress</h2>
          <div className="grid grid-cols-7 gap-3 text-center">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
              (day, idx) => (
                <div key={idx} className="bg-green-100 rounded-lg py-4">
                  <p className="font-semibold">{day}</p>
                  <p className="text-green-700 font-bold">{3} ⭐</p>
                </div>
              )
            )}
          </div>
        </section>

        {/* Card 5: Parental Actions */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3">👨‍👩‍👧 Parent Actions</h2>
          <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 mb-2">
            Add Custom Challenge
          </button>
          <button className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 mb-2">
            Send Encouragement Message
          </button>
          <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            View Progress Reports
          </button>
        </section>

        {/* Card 6: App Usage Insights */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3">📱 App Usage Insights</h2>
          <p>
            Average Daily Playtime: <span className="font-bold">25 min</span>
          </p>
          <p>
            Most Played Game:{" "}
            <span className="font-bold">Healthy Food Match</span>
          </p>
          <p>
            Favorite Activity Type:{" "}
            <span className="font-bold">Nutrition Games</span>
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-600 py-4">
        © 2025 HealthEd Kids | Helping families grow healthy together 🌱
      </footer>
    </div>
  );
};

export default ParentsDashboard;
