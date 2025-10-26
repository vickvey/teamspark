const WeeklyProgressCard: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
    <h3 className="text-lg font-semibold mb-3">📈 Weekly Progress</h3>
    <div className="grid grid-cols-7 gap-3 text-center">
      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, idx) => (
        <div key={idx} className="bg-green-100 rounded-lg py-4">
          <p className="font-semibold">{day}</p>
          <p className="text-green-700 font-bold">{4} ⭐</p>
        </div>
      ))}
    </div>
  </div>
);

export default WeeklyProgressCard;
