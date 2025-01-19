import { ArrowRight, Zap, Shield, Smartphone } from "lucide-react";
import Navbar from "../components/Navbar";
import FeatureCard from "../components/FeatureCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block animate-fade-up px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Welcome to Technikaz
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            The Future of Technology
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Experience innovation at its finest. Discover how our solutions can transform your digital journey.
          </p>
          <div className="flex items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <button className="px-8 py-3 bg-primary text-white rounded-full hover:opacity-90 transition-opacity flex items-center gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-8 py-3 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Features
            </span>
            <h2 className="text-4xl font-bold mt-4 mb-6">
              Everything you need
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the tools and features that make our platform unique
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="w-6 h-6 text-primary" />}
              title="Lightning Fast"
              description="Experience blazing fast performance with our optimized platform"
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6 text-primary" />}
              title="Secure by Design"
              description="Your data is protected with enterprise-grade security"
            />
            <FeatureCard
              icon={<Smartphone className="w-6 h-6 text-primary" />}
              title="Mobile Ready"
              description="Access your work from any device, anywhere, anytime"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;