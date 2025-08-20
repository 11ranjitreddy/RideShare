import {
  Clock,
  DollarSign,
  Car,
  Truck,
  Bus,
  Navigation,
  UserCheck,
  Star,
  Users,
  Building,
  MapPin,
  Zap,
  Shield,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";



export default function RideSharingWebsite() {
  const [activeTab, setActiveTab] = useState("car");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full bg-gray-50 min-h-screen mt-[4rem]">
      <Navbar />

      {/* Hero */}
      <section className="bg-yellow-400 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Move Smart with Our Website</h1>
          <p className="text-lg mb-8">
            Find your favorite local ride with us. Whether you need a ride, a
            delivery, or something else, we've got your transportation needs
            covered!
          </p>
          <button
            onClick={() => navigate("/book")}
            className="bg-black text-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-gray-800 transition">
            BOOK NOW
          </button>
        </div>
      </section>

      {/* Vehicle Selection */}
      <section className="max-w-5xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">Choose Your Ride</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {["car", "truck", "bus"].map((type) => (
            <VehicleCard
              key={type}
              type={type}
              isActive={activeTab === type}
              onClick={() => setActiveTab(type)}
            />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number={1}
              title="Choose Your Ride"
              description="Select from bikes, autos, or cars based on your needs"
              icon={<Car size={32} className="text-yellow-500" />}
            />
            <StepCard
              number={2}
              title="Enter Origin & Destination"
              description="Tell us where you are and where you want to go"
              icon={<MapPin size={32} className="text-yellow-500" />}
            />
            <StepCard
              number={3}
              title="Confirm & Enjoy"
              description="Book your ride and enjoy a comfortable journey"
              icon={<UserCheck size={32} className="text-yellow-500" />}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-yellow-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center">Customer Testimonials</h2>
          <p className="text-center text-gray-600 mb-10">
            Discover real user reviews and ratings to build trust.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <TestimonialCard
              name="Sarah Johnson"
              rating={5}
              comment="The service was outstanding! Driver arrived on time and was very professional."
            />
            <TestimonialCard
              name="Mike Thompson"
              rating={4}
              comment="Great app for daily commute. Very reliable and affordable pricing."
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Why Choose Us?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <FeatureCard
              icon={<DollarSign size={28} className="text-yellow-500" />}
              title="Affordable Pricing"
              description="Competitive rates with no hidden charges"
            />
            <FeatureCard
              icon={<Clock size={28} className="text-yellow-500" />}
              title="24/7 Availability"
              description="Get a ride whenever you need, day or night"
            />
            <FeatureCard
              icon={<Zap size={28} className="text-yellow-500" />}
              title="Fast & Reliable Rides"
              description="Quick pickups and on-time arrivals guaranteed"
            />
            <FeatureCard
              icon={<Shield size={28} className="text-yellow-500" />}
              title="Safety First"
              description="All drivers are verified and vehicles inspected"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-yellow-400 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Influence</h2>
          <div className="flex justify-around flex-wrap">
            <StatCard icon={<Users size={32} />} value="20M+" label="Users" />
            <StatCard icon={<Building size={32} />} value="100+" label="Cities" />
            <StatCard icon={<Star size={32} />} value="5" label="Star Rating" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Navigation size={20} className="mr-2" />
              RideShare
            </h3>
            <p className="text-gray-400">Your trusted partner for all transportation needs</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-yellow-400 cursor-pointer">Home</li>
              <li className="hover:text-yellow-400 cursor-pointer">Services</li>
              <li className="hover:text-yellow-400 cursor-pointer">About Us</li>
              <li className="hover:text-yellow-400 cursor-pointer">Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-yellow-400 cursor-pointer">Car Booking</li>
              <li className="hover:text-yellow-400 cursor-pointer">Truck Rentals</li>
              <li className="hover:text-yellow-400 cursor-pointer">Bus Services</li>
              <li className="hover:text-yellow-400 cursor-pointer">Corporate Travel</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Download Our App</h4>
            <div className="flex space-x-4">
              <button className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700">App Store</button>
              <button className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700">Google Play</button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} RideShare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// Reusable Components
function VehicleCard({ type, isActive, onClick }) {
  const icons = {
    car: <Car size={48}assName="text-gray-7000" />,
    truck: <Truck size={48} className="text-gray-7000" />,
    bus: <Bus size={48} className="text-gray-7000 " />,
  };
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl shadow-md hover:shadow-lg transition cursor-pointer w-64 h-64 flex flex-col justify-between ${
        isActive ? "ring-2 ring-yellow-500" : ""
      }`}
    >
      <div className="p-6 flex justify-center items-center bg-gray-100 h-2/3">
        {icons[type]}
      </div>
      <div className="p-4 bg-yellow-400 text-center font-bold text-lg capitalize">
        {type}
      </div>
    </div>
  );
}

function StepCard({ number, title, description, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition h-64 flex flex-col justify-center">
      <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <div className="bg-yellow-500 text-black w-8 h-8 rounded-full flex items-center justify-center mx-auto -mt-12 mb-4 font-bold">
        {number}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function TestimonialCard({ name, rating, comment }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-56 flex flex-col justify-between">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
          <UserCheck size={24} className="text-gray-600" />
        </div>
        <div>
          <h4 className="font-bold">{name}</h4>
          <div className="flex text-yellow-400">
            {Array(rating)
              .fill(0)
              .map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600">{comment}</p>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition h-44 flex flex-col justify-between">
      <div className="mb-2">{icon}</div>
      <h4 className="font-bold mb-1">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className="flex flex-col items-center text-white">
      <div className="mb-2">{icon}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm">{label}</div>
    </div>
  );
}
