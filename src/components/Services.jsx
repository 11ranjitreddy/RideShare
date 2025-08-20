import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Bike, Car, Truck, Bus, Package } from "lucide-react";

export default function Services() {
  const [activeTab, setActiveTab] = useState("car");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full bg-gray-50 min-h-screen mt-[4rem]">
      <Navbar />

      {/* Services Header */}
      <section className="bg-yellow-400 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-lg mb-8">
            Choose from our wide range of transportation services to suit your needs.
          </p>
        </div>
      </section>

      {/* All Vehicle Options */}
      <section className="max-w-5xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">Available Services</h2>
        <div className="flex flex-wrap justify-center gap-10">
          {[
            { type: "bike", icon: <Bike size={48} className="text-gray-7000" /> },
            { type: "car", icon: <Car size={48} className="text-gray-7000" /> },
            { type: "truck", icon: <Truck size={48} className="text-gray-7000" /> },
            { type: "auto", icon: <Bus size={48} className="text-gray-7000" /> }, // Using Bus icon for auto
            { type: "parcel", icon: <Package size={48} className="text-gray-7000" /> },
          ].map((vehicle) => (
            <ServiceCard
              key={vehicle.type}
              type={vehicle.type}
              icon={vehicle.icon}
              isActive={activeTab === vehicle.type}
              onClick={() => setActiveTab(vehicle.type)}
            />
          ))}
        </div>
      </section>

      {/* Service Details Section */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Service Details
          </h2>
          <div className="bg-gray-100 p-6 rounded-lg">
            {getServiceDetails(activeTab)}
            <button
              onClick={() => navigate("/book")}
              className="mt-4 bg-yellow-500 text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-600 transition"
            >
              Book {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ type, icon, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl shadow-md hover:shadow-lg transition cursor-pointer w-64 h-64 flex flex-col justify-between ${
        isActive ? "ring-2 ring-yellow-500" : ""
      }`}
    >
      <div className="p-6 flex justify-center items-center bg-gray-100 h-2/3">
        {icon}
      </div>
      <div className="p-4 bg-yellow-400 text-center font-bold text-lg capitalize">
        {type}
      </div>
    </div>
  );
}

function getServiceDetails(type) {
  const details = {
    bike: (
      <>
        <p className="mb-4">Our bike service is perfect for quick, short-distance trips around the city.</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Fastest option for city commuting</li>
          <li>Affordable pricing</li>
          <li>Ideal for 1 passenger</li>
          <li>Eco-friendly transportation</li>
        </ul>
      </>
    ),
    car: (
      <>
        <p className="mb-4">Comfortable car rides for individuals or small groups.</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Air-conditioned vehicles</li>
          <li>Up to 4 passengers</li>
          <li>Professional drivers</li>
          <li>Available 24/7</li>
        </ul>
      </>
    ),
    truck: (
      <>
        <p className="mb-4">Heavy-duty transportation for your large items and shipments.</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Various sizes available</li>
          <li>Moving and logistics support</li>
          <li>Secure cargo handling</li>
          <li>Experienced drivers</li>
        </ul>
      </>
    ),
    auto: (
      <>
        <p className="mb-4">Traditional auto-rickshaws for short trips with local flavor.</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Most economical option</li>
          <li>Great for short distances</li>
          <li>Up to 3 passengers</li>
          <li>Open-air experience</li>
        </ul>
      </>
    ),
    parcel: (
      <>
        <p className="mb-4">Fast and reliable delivery service for your packages.</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Same-day delivery available</li>
          <li>Real-time tracking</li>
          <li>Various size options</li>
          <li>Secure handling</li>
        </ul>
      </>
    ),
  };

  return details[type] || <p>Select a service to view details</p>;
}