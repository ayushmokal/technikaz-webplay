import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail(""); // Clear input after submission
  };

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Newsletter */}
          <div className="space-y-4">
            <Link to="/" className="block">
              <img 
                src="https://i.ibb.co/BCHWQmq/Black-bg-2-1-e1722342966946-300x55.png" 
                alt="Technikaz" 
                className="h-12 w-auto hover:opacity-80 transition-opacity" // Increased from h-8 to h-12
              />
            </Link>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Sign-Up For Newsletters"
                className="bg-white/10 border-white/20"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" variant="secondary">GO</Button>
            </form>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-blue-400 font-medium mb-4">Links</h3>
              <ul className="space-y-2">
                <li><Link to="/games" className="hover:text-primary">Games</Link></li>
                <li><Link to="/tech" className="hover:text-primary">Tech</Link></li>
                <li><Link to="/entertainment" className="hover:text-primary">Entertainment</Link></li>
                <li><Link to="/mobiles" className="hover:text-primary">Mobile</Link></li>
                <li><Link to="/stocks" className="hover:text-primary">Stocks</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-blue-400 font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-primary">Contact Us</Link></li>
                <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-primary">Terms & Conditions</Link></li>
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-start">
            <div className="flex gap-2 mb-4">
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-4 text-center text-sm text-gray-400">
          © 2024 - JS Technikaz All Rights Reserved
        </div>
      </div>
    </footer>
  );
}