import React from 'react';
import { Video, Users, Shield, Calendar, ArrowRight, Globe2, Zap, MessageSquare } from 'lucide-react';

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Video className="text-blue-600" size={32} />
              <span className="text-xl font-bold text-gray-900">MeetPro</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium">
                Log in
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Connect and Collaborate
              <span className="text-blue-600"> Seamlessly</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Experience crystal-clear video meetings, real-time collaboration, and secure communication all in one powerful platform.
            </p>
            <div className="flex gap-4">
              <a href="https://samplestumeet.netlify.app/lobby.html" target='_blank'>
                <button className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2">
                  Get Started Instant Meeting <ArrowRight size={20} />
                </button>
              </a>
              <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition">
                View Demo
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?auto=format&fit=crop&q=80&w=1740"
              alt="Team meeting"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why Choose Our Platform?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Video className="text-blue-600" size={32} />}
              title="HD Video Calls"
              description="Crystal clear video and audio quality for seamless communication"
            />
            <FeatureCard
              icon={<Users className="text-blue-600" size={32} />}
              title="Team Collaboration"
              description="Built-in tools for effective team collaboration and productivity"
            />
            <FeatureCard
              icon={<Shield className="text-blue-600" size={32} />}
              title="Enterprise Security"
              description="End-to-end encryption and advanced security features"
            />
            <FeatureCard
              icon={<Calendar className="text-blue-600" size={32} />}
              title="Smart Scheduling"
              description="Intelligent calendar integration and meeting management"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <StatCard number="10M+" label="Active Users" />
            <StatCard number="150+" label="Countries" />
            <StatCard number="99.9%" label="Uptime" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureGridItem
              icon={<Globe2 className="text-blue-600" size={24} />}
              title="Global Reach"
              description="Connect with team members and clients worldwide with low-latency infrastructure."
            />
            <FeatureGridItem
              icon={<Zap className="text-blue-600" size={24} />}
              title="Instant Meetings"
              description="Start or join meetings with just one click. No downloads required."
            />
            <FeatureGridItem
              icon={<MessageSquare className="text-blue-600" size={24} />}
              title="Chat & Notes"
              description="Built-in chat and note-taking features for enhanced collaboration."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Meetings?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of teams who have already elevated their collaboration.</p>
          <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition">
            Start Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p>&copy; 2024 Meeting Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StatCard({ number, label }) {
  return (
    <div className="p-8">
      <div className="text-4xl font-bold text-blue-600 mb-2">{number}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}

function FeatureGridItem({ icon, title, description }) {
  return (
    <div className="p-6">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default Landing;