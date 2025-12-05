
export default function StatsCard({ icon, label, value, trend }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{icon}</div>
        {trend && (
          <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
            ↑ {trend}
          </span>
        )}
      </div>
      <p className="text-gray-600 text-sm mb-2">{label}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

