import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import Navbar from "./Navbar";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="flex flex-col w-full bg-gray-50 min-h-screen mt-[4rem]">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-yellow-400 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Contact RideShare</h1>
          <p className="text-lg">
            We're here to help! Reach out to us for any questions or feedback.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="max-w-6xl mx-auto py-12 px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <ContactCard
            icon={<Phone size={32} className="text-yellow-500" />}
            title="Call Us"
            info="+1 (555) 123-4567"
            description="Available 24/7 for urgent matters"
          />
          <ContactCard
            icon={<Mail size={32} className="text-yellow-500" />}
            title="Email Us"
            info="support@rideshare.com"
            description="Typically respond within 24 hours"
          />
          <ContactCard
            icon={<MapPin size={32} className="text-yellow-500" />}
            title="Visit Us"
            info="123 Transit Ave, Cityville"
            description="Corporate headquarters"
          />
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center">Send Us a Message</h2>
          <p className="text-center text-gray-600 mb-10">
            Fill out the form below and we'll get back to you as soon as possible
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              ></textarea>
            </div>
            
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-600 transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FAQItem 
              question="How do I become a RideShare driver?" 
              answer="Visit our Driver Portal on the website and complete the application process, which includes background checks and vehicle inspections."
            />
            <FAQItem 
              question="What payment methods do you accept?" 
              answer="We accept all major credit cards, PayPal, and mobile payment options like Apple Pay and Google Pay."
            />
            <FAQItem 
              question="How can I track my ride?" 
              answer="Once your ride is confirmed, you'll receive a link to track your driver in real-time through our app or website."
            />
            <FAQItem 
              question="What safety measures do you have in place?" 
              answer="All drivers are vetted, vehicles are inspected regularly, and we offer 24/7 emergency support during your ride."
            />
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Office Hours</h2>
          <div className="bg-yellow-50 p-8 rounded-lg max-w-md mx-auto">
            <div className="flex items-center mb-6">
              <Clock size={24} className="text-yellow-500 mr-3" />
              <div>
                <h3 className="font-bold text-lg">Customer Support</h3>
                <p className="text-gray-600">Monday - Friday: 8AM - 8PM</p>
                <p className="text-gray-600">Saturday - Sunday: 9AM - 6PM</p>
              </div>
            </div>
            <div className="flex items-center">
              <MessageSquare size={24} className="text-yellow-500 mr-3" />
              <div>
                <h3 className="font-bold text-lg">Live Chat</h3>
                <p className="text-gray-600">24/7 Availability</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-12 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Find Our Headquarters</h2>
          <div className="aspect-w-16 aspect-h-9 bg-gray-300 rounded-lg overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573291234!2d-73.9878449245376!3d40.74844097138995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1690839756708!5m2!1sen!2sus" 
              width="100%" 
              height="450" 
              style={{border:0}} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="RideShare Headquarters Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}

// Reusable Components
function ContactCard({ icon, title, info, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition h-full text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-yellow-600 font-medium mb-2">{info}</p>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 pb-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-bold text-lg">{question}</h3>
        <span className="text-yellow-500 text-2xl">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-600">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}