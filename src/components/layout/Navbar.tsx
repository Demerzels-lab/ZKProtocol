import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, Wallet } from 'lucide-react';
import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Button } from '../ui/Button';

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Wallet Hook
  const { publicKey, connected, disconnect } = useWallet();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/technology', label: 'Technology' },
  ];

  // Helper to shorten the unique ID (Public Key)
  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    // "Pixel Glass" Container
    <nav className="sticky top-0 z-50 w-full border-b-4 border-brand-dark bg-white/80 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 border-2 border-brand-dark overflow-hidden shadow-sm group-hover:shadow-DEFAULT transition-all">
              <img 
                src="/logo.jpeg" 
                alt="ZKProtocol Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xl font-bold font-display text-brand-dark tracking-tight mt-1">
              ZKProtocol
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xl font-bold font-sans uppercase tracking-widest transition-all relative ${
                  isActive(link.path)
                    ? 'text-primary-600'
                    : 'text-brand-dark/70 hover:text-brand-dark'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-brand-dark"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Wallet Action */}
          <div className="hidden md:block">
            {connected && publicKey ? (
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  onClick={disconnect}
                  className="bg-white hover:bg-red-50 hover:border-red-500 group transition-all"
                >
                  <div className="flex items-center gap-3">
                    {/* Live Indicator */}
                    <div className="w-3 h-3 bg-success-500 border border-brand-dark animate-pulse" />
                    
                    {/* Unique ID */}
                    <span className="font-mono text-lg text-brand-dark group-hover:text-red-500">
                      {truncateAddress(publicKey.toBase58())}
                    </span>
                    
                    <LogOut className="w-4 h-4 text-brand-dark/50 group-hover:text-red-500 ml-1" />
                  </div>
                </Button>
              </div>
            ) : (
              <div className="pixel-btn bg-primary-500 text-white">
                <WalletMultiButton style={{ background: 'transparent', height: 'auto', padding: '12px 24px', fontFamily: 'inherit', fontSize: '16px', fontWeight: 'bold' }}>
                  Connect Wallet
                </WalletMultiButton>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 border-2 border-transparent hover:border-brand-dark hover:bg-primary-50 text-brand-dark transition-all"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t-4 border-brand-dark bg-white/95 backdrop-blur-xl absolute left-0 right-0 shadow-xl">
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl font-bold font-sans uppercase tracking-widest py-2 border-b-2 border-transparent hover:border-brand-dark/20 ${
                    isActive(link.path)
                      ? 'text-primary-600'
                      : 'text-brand-dark'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="pt-4 border-t-2 border-brand-dark/10">
                {connected && publicKey ? (
                  <Button 
                    variant="outline" 
                    className="w-full justify-between group hover:border-red-500 hover:text-red-500"
                    onClick={() => {
                      disconnect();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <span className="font-mono text-xl">{truncateAddress(publicKey.toBase58())}</span>
                    <LogOut className="w-5 h-5" />
                  </Button>
                ) : (
                  <div className="pixel-btn bg-primary-500 text-white w-full">
                    <WalletMultiButton 
                      style={{ 
                        background: 'transparent', 
                        height: 'auto', 
                        padding: '12px 24px', 
                        fontFamily: 'inherit', 
                        fontSize: '16px', 
                        fontWeight: 'bold',
                        width: '100%'
                      }}
                    >
                      Connect Wallet
                    </WalletMultiButton>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};