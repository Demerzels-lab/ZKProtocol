import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/Button';

export const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/technology', label: 'Technology' },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl border-b border-cyber-blue-100" 
         style={{ 
           background: 'rgba(250, 250, 250, 0.95)',
         }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-1.5 rounded-lg bg-gradient-cyber-primary shadow-cyber-md group-hover:shadow-glow-primary transition-all duration-normal">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold font-heading text-neutral-800">ZKProtocol</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-base font-medium transition-all duration-normal relative ${
                  isActive(link.path)
                    ? 'text-cyber-blue-600'
                    : 'text-neutral-600 hover:text-cyber-blue-600'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-cyber-primary rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button onClick={() => window.location.href = '/dashboard'}>
              Connect Wallet
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-600 hover:text-cyber-blue-600 transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-cyber-blue-100 backdrop-blur-xl" 
               style={{ background: 'rgba(250, 250, 250, 0.98)' }}>
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium py-2 transition-colors ${
                    isActive(link.path)
                      ? 'text-cyber-blue-600'
                      : 'text-neutral-600 hover:text-cyber-blue-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Button onClick={() => {
                setMobileMenuOpen(false);
                window.location.href = '/dashboard';
              }}>
                Connect Wallet
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
