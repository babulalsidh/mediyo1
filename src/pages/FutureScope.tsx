import React, { useState } from 'react';
import { MessageCircle, Stethoscope, Globe, Users, Calendar, Bell, CheckCircle, ArrowRight } from 'lucide-react';

const FutureScope = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNotifyMe = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate subscription
    setIsSubscribed(true);
    setEmail('');
  };

  const upcomingFeatures = [
    {
      icon: Stethoscope,
      title: 'Chat with Doctors',
      description: 'Connect directly with verified healthcare professionals for personalized consultations.',
      status: 'Coming Q2 2024',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: MessageCircle,
      title: 'Prescription Upload',
      description: 'Upload and analyze entire prescriptions for comprehensive medication reviews.',
      status: 'Coming Q3 2024',
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      icon: Globe,
      title: 'Multilingual Support',
      description: 'Support for Hindi, Tamil, Telugu, Bengali, and 10+ regional Indian languages.',
      status: 'Coming Q4 2024',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Users,
      title: 'Family Profiles',
      description: 'Manage medication safety for your entire family with individual health profiles.',
      status: 'Coming 2025',
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const roadmapItems = [
    {
      quarter: 'Q2 2024',
      features: ['Doctor Chat Integration', 'Enhanced AI Accuracy', 'Medicine Database Expansion']
    },
    {
      quarter: 'Q3 2024',
      features: ['Prescription Analysis', 'Drug Interaction Checker', 'iOS & Android Apps']
    },
    {
      quarter: 'Q4 2024',
      features: ['Multilingual Support', 'Voice Commands', 'Offline Mode']
    },
    {
      quarter: '2025',
      features: ['Family Profiles', 'Pharmacy Integration', 'Insurance Partnerships']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">The Future of Mediyo</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              We're building the most comprehensive healthcare platform in India. 
              Join us on this journey to revolutionize medication safety and accessibility.
            </p>
            <div className="flex justify-center">
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-6 py-3">
                <Calendar className="h-5 w-5" />
                <span>Coming Soon: Doctor Consultations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What's Coming Next</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Exciting new features that will transform how you interact with healthcare information
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingFeatures.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className={`p-3 rounded-lg w-fit mb-4 ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <span className="text-sm bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
                    {feature.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="flex items-center text-purple-600 font-medium">
                  <span>Learn more</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Development Roadmap</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our planned timeline for rolling out new features and improvements
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-purple-200 h-full"></div>
            
            <div className="space-y-12">
              {roadmapItems.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 relative">
                      {/* Timeline Dot */}
                      <div className={`absolute top-6 ${index % 2 === 0 ? '-right-4' : '-left-4'} w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center`}>
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.quarter}</h3>
                      <ul className="space-y-2">
                        {item.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-gray-600">
                            <CheckCircle className="h-4 w-4 text-emerald-600 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Beta Testing */}
      <section className="py-16 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Join Our Beta Testing Program</h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Be among the first to try new features and help us shape the future of Mediyo. 
              Beta testers get early access and exclusive benefits.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white bg-opacity-10 rounded-lg p-6">
                <h3 className="font-semibold mb-2">Early Access</h3>
                <p className="text-emerald-100 text-sm">Try new features before public release</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-6">
                <h3 className="font-semibold mb-2">Direct Feedback</h3>
                <p className="text-emerald-100 text-sm">Your input shapes our development</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-6">
                <h3 className="font-semibold mb-2">Exclusive Benefits</h3>
                <p className="text-emerald-100 text-sm">Special rewards and recognition</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-gray-900 font-semibold mb-4">Apply for Beta Access</h3>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
                />
                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Apply Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Notify Me Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Bell className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Get notified when new features launch and be the first to experience the future of healthcare technology.
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleNotifyMe} className="max-w-md mx-auto">
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                  >
                    Notify Me
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex items-center justify-center space-x-2 text-emerald-600">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Thank you! You'll be notified about updates.</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision for 2025</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            "To become India's most trusted healthcare companion, empowering every citizen with 
            AI-powered medical insights, connecting them with healthcare professionals, and ensuring 
            safe medication practices across all communities and languages."
          </p>
        </div>
      </section>
    </div>
  );
};

export default FutureScope;