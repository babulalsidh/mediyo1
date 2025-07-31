import React from 'react';
import { Heart, Shield, Users, Target, Award, Zap } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms analyze medicine composition and safety profiles instantly.'
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Comprehensive safety assessments including age group recommendations and interaction warnings.'
    },
    {
      icon: Users,
      title: 'Personalized Insights',
      description: 'Tailored recommendations based on individual health profiles and medical conditions.'
    },
    {
      icon: Award,
      title: 'Certified Sources',
      description: 'Information verified against trusted medical databases and regulatory guidelines.'
    }
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Medical Officer',
      description: 'Leading physician with 15+ years in pharmaceutical safety research.'
    },
    {
      name: 'Raj Patel',
      role: 'AI Research Lead',
      description: 'Machine learning expert specializing in healthcare applications.'
    },
    {
      name: 'Priya Sharma',
      role: 'Product Manager',
      description: 'Healthcare technology specialist focused on user-centered design.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white bg-opacity-20 rounded-full">
                <Heart className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Mediyo</h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Empowering individuals across India to make informed medication decisions through 
              cutting-edge AI technology and comprehensive safety analysis.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Target className="h-8 w-8 text-emerald-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                At Mediyo, we're committed to helping all of India avoid wrong medicines and use the right dose at the right time. 
                Our AI-powered platform provides instant, accurate analysis of medications to ensure safety and efficacy.
              </p>
              <p className="text-gray-600">
                We believe that everyone deserves access to reliable medication information. Through advanced technology 
                and user-friendly design, we're making healthcare safer and more accessible for millions.
              </p>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Mediyo?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="p-1 bg-emerald-100 rounded-full mt-1">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Instant medicine analysis using advanced AI</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-1 bg-emerald-100 rounded-full mt-1">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Comprehensive safety reports for all age groups</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-1 bg-emerald-100 rounded-full mt-1">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Personalized recommendations based on health profile</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-1 bg-emerald-100 rounded-full mt-1">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">24/7 AI assistant for medication queries</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Mediyo Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform combines advanced AI technology with medical expertise to provide accurate, 
              reliable medication analysis and safety information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="p-3 bg-emerald-100 rounded-lg w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Healthcare professionals and technology experts working together to revolutionize medication safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-emerald-600">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-emerald-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Transparency Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Transparency & Sources</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our AI models are trained on verified medical databases and continuously updated with the latest 
              pharmaceutical research to ensure accuracy and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Medical Databases</h3>
              <p className="text-gray-600 text-sm">
                FDA Orange Book, WHO Essential Medicines List, and Indian Pharmacopoeia
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Research Sources</h3>
              <p className="text-gray-600 text-sm">
                PubMed, Cochrane Library, and peer-reviewed pharmaceutical journals
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Regulatory Guidelines</h3>
              <p className="text-gray-600 text-sm">
                CDSCO, FDA, EMA, and WHO safety guidelines and recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Privacy & Data Security</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Your Data is Protected</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• End-to-end encryption for all data transmission</li>
                  <li>• No sharing of personal health information</li>
                  <li>• Secure cloud storage with HIPAA compliance</li>
                  <li>• User-controlled data retention policies</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Transparent Practices</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Clear privacy policy with no hidden clauses</li>
                  <li>• User consent for all data processing</li>
                  <li>• Regular security audits and updates</li>
                  <li>• Right to data deletion and portability</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;