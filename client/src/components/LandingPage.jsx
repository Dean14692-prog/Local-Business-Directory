import React from 'react';

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-b from-green-200 via-green-100 to-white min-h-screen">
      
      {/* Navbar
      <nav className="flex justify-between items-center px-8 py-4 bg-green-900 text-white">
        <div className="text-2xl font-bold">marketthink</div>
        <div className="space-x-6 text-sm">
          <a href="#" className="hover:underline">Features</a>
          <a href="#" className="hover:underline">Pricing</a>
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Contact Us</a>
          <button className="ml-4 bg-yellow-400 text-green-900 px-4 py-2 rounded-full font-semibold hover:bg-yellow-300">
            Free Trial
          </button>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-16 bg-green-900 text-white">
        <h4 className="text-md mb-2">The Best</h4>
        <h1 className="text-5xl font-bold mb-4">Digital Marketing</h1>
        <p className="max-w-xl text-lg mb-6">
        Whether you're running a shop in Nairobi, a pharmacy in Kisumu, or an online hustle, we’ll help you reach more customers and grow your brand online.
          
        </p>
        <button className="bg-yellow-400 text-green-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-300">
          Get Started
        </button>
      </section>

      {/* Partner Logos */}
      <section className="flex justify-center space-x-8 py-8 bg-white">
        {['naivas', 'viatu house', 'my dawa', 'Kilimanjaro Restaurant', 'LC waikiki'].map((partner) => (
          <span key={partner} className="text-gray-400 text-xl capitalize">{partner}</span>
        ))}
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 bg-white text-center">
        <h2 className="text-3xl font-bold mb-4">We are a Strategic Digital Marketing Agency</h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-12">
        Already have a website? We’ll help you drive traffic, attract customers, and grow your online presence through smart digital advertising.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Feature 1 */}
          <div className="flex flex-col items-center p-6 border rounded-lg hover:shadow-lg transition">
            <div className="text-4xl mb-4">🟩</div>
            <h4 className="text-xl font-semibold mb-2">Kenyan Market Insights</h4>
            <p className="text-gray-600">
            We understand the local trends, buying behavior, and what resonates with Kenyan customers — and use that to your advantage.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center p-6 border rounded-lg hover:shadow-lg transition">
            <div className="text-4xl mb-4">🔺</div>
            <h4 className="text-xl font-semibold mb-2">Website Traffic Growth</h4>
            <p className="text-gray-600">
            Our strategies help increase the number of people visiting your website — turning traffic into real customers.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center p-6 border rounded-lg hover:shadow-lg transition">
            <div className="text-4xl mb-4">🔵</div>
            <h4 className="text-xl font-semibold mb-2">Social Media Promotions</h4>
            <p className="text-gray-600">
            Get your business featured on our social pages — from Instagram stories to Facebook posts — where thousands of Kenyans discover new services.
            </p>
          </div>
        </div>

        {/* See More */}
        <div className="mt-8">
          <a href="#" className="text-green-600 font-semibold hover:underline">
            See More →
          </a>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
