import { Car, MapPin, UserCheck } from "lucide-react";

export default function HowItWorks() {
  return (
    <div className="bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Car size={32} className="text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Choose Your Ride</h3>
            <p className="text-gray-600">Select from bikes, autos, or cars</p>
          </div>
          {/* Steps 2 & 3 (similar structure) */}
        </div>
      </div>
    </div>
  );
}