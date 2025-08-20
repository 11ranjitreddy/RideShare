  // Stat Card Component
  // eslint-disable-next-line react-refresh/only-export-components
  function StatCard({ icon, value, label }) {
    return (
      <div className="text-center mb-6">
        <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-2 shadow-lg">
          <div className="text-center">
            {icon}
            <h3 className="font-bold text-2xl">{value}</h3>
          </div>
        </div>
        <p className="font-medium text-lg">{label}</p>
      </div>
    );
  }