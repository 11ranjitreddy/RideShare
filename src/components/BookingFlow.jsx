// src/components/BookingFlow.jsx
import { useState } from "react";
import { Car, Truck, Bus } from "lucide-react";

export default function BookingFlow() {
  const [activeTab, setActiveTab] = useState("car");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [bookingStatus, setBookingStatus] = useState(null);

  // Vehicle data (prices, icons)
  const vehicles = {
    car: { icon: <Car size={48} />, price: 15 },
    truck: { icon: <Truck size={48} />, price: 40 },
    bus: { icon: <Bus size={48} />, price: 25 },
  };

  // Handle booking submission
  const handleBookRide = () => {
    if (!pickup || !dropoff) {
      alert("Please enter locations!");
      return;
    }
    setBookingStatus("searching");
    setTimeout(() => {
      setBookingStatus("confirmed");
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      {/* Location Inputs */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Pickup location"
          className="px-4 py-2 rounded-lg flex-grow"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
        />
        <input
          type="text"
          placeholder="Dropoff location"
          className="px-4 py-2 rounded-lg flex-grow"
          value={dropoff}
          onChange={(e) => setDropoff(e.target.value)}
        />
      </div>

      {/* Vehicle Selection */}
      <h2 className="text-2xl font-bold mb-8 text-center">Choose Your Ride</h2>
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {Object.entries(vehicles).map(([type, data]) => (
          <div
            key={type}
            onClick={() => setActiveTab(type)}
            className={`bg-white rounded-xl p-6 text-center cursor-pointer ${
              activeTab === type ? "ring-2 ring-yellow-500" : ""
            }`}
          >
            <div className="flex justify-center mb-4">{data.icon}</div>
            <p className="font-bold text-lg capitalize">{type}</p>
            <p className="text-sm">${data.price}/mile</p>
          </div>
        ))}
      </div>

      {/* Book Button */}
      <button
        onClick={handleBookRide}
        disabled={bookingStatus === "searching"}
        className="bg-black text-white px-6 py-3 rounded-lg text-lg font-bold block mx-auto hover:bg-gray-800 transition"
      >
        {bookingStatus === "searching" ? "Searching..." : "BOOK NOW"}
      </button>

      {/* Confirmation Message */}
      {bookingStatus === "confirmed" && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg text-center">
          Ride confirmed! Your {activeTab} will arrive shortly.
        </div>
      )}
    </div>
  );
}