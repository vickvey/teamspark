import React from "react";

export default function ChildDashboard() {
  return (
    <div className="flex min-h-screen bg-linear-to-br from-green-100 to-blue-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-green-600 text-white flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
          HealthEd Kids 🌱
        </h1>
        <nav className="flex-1">
          <ul className="space-y-3">
            <li className="hover:bg-green-700 rounded-md px-4 py-2 cursor-pointer">
              🏠 Home
            </li>
            <li className="hover:bg-green-700 rounded-md px-4 py-2 cursor-pointer">
              🎮 My Games
            </li>
            <li className="hover:bg-green-700 rounded-md px-4 py-2 cursor-pointer">
              🏆 Challenges
            </li>
            <li className="hover:bg-green-700 rounded-md px-4 py-2 cursor-pointer">
              🎖️ Rewards
            </li>
            <li className="hover:bg-green-700 rounded-md px-4 py-2 cursor-pointer">
              📈 Progress
            </li>
          </ul>
        </nav>
        <button className="mt-auto bg-white text-green-700 font-semibold py-2 rounded-md hover:bg-green-100">
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-green-700">
            Welcome back, <span className="text-blue-600">Ava!</span>
          </h2>
          <p className="text-sm text-gray-500">
            🌞 Keep learning and earning points!
          </p>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Card 1: Current Challenge */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-2">
              🏆 Today&apos;s Challenge
            </h3>
            <p className="text-gray-700 mb-4">
              Eat one fruit and drink 5 glasses of water!
            </p>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
              Mark as Done ✅
            </button>
          </div>

          {/* Card 2: Rewards */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-2">🎖️ Your Rewards</h3>
            <p>
              You have{" "}
              <span className="font-bold text-green-600">120 points</span>!
            </p>
            <button className="mt-3 bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-500">
              Redeem Rewards 🎁
            </button>
          </div>

          {/* Card 3: Active Game */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-2">
              🎮 Continue Your Game
            </h3>
            <p>Healthy Food Match — Level 4</p>
            <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Play Now ▶️
            </button>
          </div>

          {/* Card 4: Progress Tracker */}
          <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
            <h3 className="text-lg font-semibold mb-3">📈 Weekly Progress</h3>
            <div className="grid grid-cols-7 gap-3 text-center">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                (day, idx) => (
                  <div key={idx} className="bg-green-100 rounded-lg py-4">
                    <p className="font-semibold">{day}</p>
                    <p className="text-green-700 font-bold">{4} ⭐</p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Card 5: Fun Tip */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-2">💡 Health Tip</h3>
            <p className="text-gray-700">
              Drinking water keeps your brain happy and helps you think better!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
