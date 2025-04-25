import { Users, MapPin, Clock, Shield, Star } from "lucide-react";
import Navbar from "./Navbar";

export default function About() {
  return (
    <div className="flex flex-col w-full bg-gray-50 min-h-screen mt-[4rem]">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-yellow-400 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">About RideShare</h1>
          <p className="text-lg">
            Revolutionizing transportation with reliable, affordable, and safe rides across the city.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-5xl mx-auto py-12 px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2020, RideShare began with a simple mission: to make urban transportation more accessible and convenient. What started as a small team of passionate individuals has now grown into the city's most trusted ride-sharing platform.
            </p>
            <p className="text-gray-600">
              We've successfully completed over 2 million rides, connecting thousands of passengers with reliable drivers every day. Our commitment to quality service and customer satisfaction sets us apart in the industry.
            </p>
          </div>
          <div className="bg-gray-200 h-64 rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
              alt="RideShare team" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Mission & Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-yellow-600">Mission</h3>
              <p className="text-gray-700">
                To provide seamless, affordable, and eco-friendly transportation solutions that connect people and communities while reducing urban congestion.
              </p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-yellow-600">Vision</h3>
              <p className="text-gray-700">
                To become the most trusted mobility platform in the region, setting new standards for safety, reliability, and customer experience in urban transportation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Why Choose RideShare?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Shield size={28} className="text-yellow-500" />} 
              title="Safety First" 
              description="All drivers are thoroughly vetted with background checks"
            />
            <FeatureCard 
              icon={<Clock size={28} className="text-yellow-500" />} 
              title="24/7 Availability" 
              description="Get a ride whenever you need, day or night"
            />
            <FeatureCard 
              icon={<Star size={28} className="text-yellow-500" />} 
              title="Rated 4.9/5" 
              description="By thousands of satisfied customers"
            />
            <FeatureCard 
              icon={<MapPin size={28} className="text-yellow-500" />} 
              title="Citywide Coverage" 
              description="Available in all major neighborhoods"
            />
            <FeatureCard 
              icon={<Users size={28} className="text-yellow-500" />} 
              title="Community Focus" 
              description="Supporting local drivers and businesses"
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Meet Our Leadership</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TeamMember 
              name="Alex Johnson" 
              role="CEO & Founder" 
              imgSrc="https://randomuser.me/api/portraits/men/32.jpg"
            />
            <TeamMember 
              name="Sarah Williams" 
              role="COO" 
              imgSrc="https://randomuser.me/api/portraits/women/44.jpg"
            />
            <TeamMember 
              name="Michael Chen" 
              role="CTO" 
              imgSrc="https://randomuser.me/api/portraits/men/22.jpg"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-yellow-400 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Ride With Us?</h2>
          <p className="text-lg mb-8">
            Download our app today and experience the future of urban transportation.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition">
              Download App
            </button>
            <button className="bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// Reusable Components
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition h-full">
      <div className="mb-4">{icon}</div>
      <h4 className="font-bold mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function TeamMember({ name, role, imgSrc }) {
  return (
    <div className="text-center">
      <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-yellow-400">
        <img 
          src={imgSrc} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      <h4 className="text-xl font-bold">{name}</h4>
      <p className="text-yellow-600">{role}</p>
    </div>
  );
}