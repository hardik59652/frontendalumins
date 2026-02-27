import React from 'react';
import { Users, Calendar, Award, BookOpen,  ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      
      {/* 1. Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-[#1e40af] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80" 
            alt="College Campus" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Once a Vishwakarmian, <br />
            <span className="text-blue-300">Always a Vishwakarmian.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Connecting 30+ years of excellence. Join the VGEC Alumni Network today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-blue-800 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition flex items-center gap-2">
              Join Network <ArrowRight size={20} />
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition">
              Explore Events
            </button>
          </div>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="py-12 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-800">25K+</div>
            <div className="text-gray-600">Global Alumni</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-800">500+</div>
            <div className="text-gray-600">Current Mentors</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-800">15+</div>
            <div className="text-gray-600">Chapters Worldwide</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-800">1994</div>
            <div className="text-gray-600">Established Year</div>
          </div>
        </div>
      </section>

      {/* 3. Key Features / Services */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-16">Why Join the Association?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureCard 
            icon={<Users className="text-blue-600" size={32} />}
            title="Professional Networking"
            desc="Connect with seniors working in top MNCs and startups globally."
          />
          <FeatureCard 
            icon={<Award className="text-blue-600" size={32} />}
            title="Career Support"
            desc="Exclusive job portal and referrals for VGEC alumni members."
          />
          <FeatureCard 
            icon={<Calendar className="text-blue-600" size={32} />}
            title="Annual Reunions"
            desc="Relive your college days at our annual flagship meetups in Ahmedabad."
          />
        </div>
      </section>

      {/* 4. Upcoming Events Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-blue-900">Upcoming Events</h2>
              <p className="text-gray-600 mt-2">Don't miss out on the next big gathering.</p>
            </div>
            <button className="text-blue-700 font-bold hover:underline">View All</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <EventCard 
              date="MAR 15"
              title="Tech Innovation Summit 2026"
              location="VGEC Auditorium, Chandkheda"
            />
            <EventCard 
              date="APR 10"
              title="Global Alumni Virtual Meet"
              location="Zoom / Online"
            />
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="py-20 text-center px-6">
        <div className="max-w-3xl mx-auto bg-[#1a1c20] text-white p-12 rounded-3xl shadow-2xl">
          <h2 className="text-3xl font-bold mb-6">Ready to give back to your Alma Mater?</h2>
          <p className="text-gray-400 mb-8">Share your journey, mentor a student, or contribute to the development fund.</p>
          <button className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition">
            Become a Life Member
          </button>
        </div>
      </section>

    </div>
  );
};

// Helper Components
const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-8 border border-gray-100 rounded-2xl hover:shadow-xl transition hover:-translate-y-2 bg-white">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </div>
);

const EventCard = ({ date, title, location }) => (
  <div className="bg-white p-6 rounded-xl flex gap-6 items-center shadow-sm">
    <div className="bg-blue-100 text-blue-800 p-4 rounded-lg text-center min-w-20">
      <span className="block text-sm font-bold">{date.split(' ')[0]}</span>
      <span className="block text-2xl font-black">{date.split(' ')[1]}</span>
    </div>
    <div>
      <h4 className="text-lg font-bold text-gray-800">{title}</h4>
      <p className="text-gray-500 flex items-center gap-1 mt-1 text-sm">
        <BookOpen size={14} /> {location}
      </p>
    </div>
  </div>
);

export default Home;