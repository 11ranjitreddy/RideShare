// Feature Card Component
// eslint-disable-next-line react-refresh/only-export-components
function FeatureCard({ icon, title, description }) {
    return (
      <div className="flex p-4 rounded-lg hover:bg-gray-50">
        <div className="mr-4 mt-1">
          <div className="bg-yellow-100 p-3 rounded-full">
            {icon}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    );
  }