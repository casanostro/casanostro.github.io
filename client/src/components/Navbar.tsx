import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const [glitchActive, setGlitchActive] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Trigger glitch effect when menu is toggled
    setGlitchActive(true);
    setTimeout(() => setGlitchActive(false), 1000);
  };

  // Close menu when navigating to a new route
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Parallax effect on nav when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const scrollY = window.scrollY;
        const parallaxValue = scrollY * 0.05;
        navRef.current.style.boxShadow = `0 ${5 + parallaxValue}px 20px rgba(0, 240, 255, ${0.1 + scrollY * 0.001})`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // On page load animation
  useEffect(() => {
    setGlitchActive(true);
    setTimeout(() => setGlitchActive(false), 1500);
  }, []);

  return (
    <nav 
      ref={navRef}
      className={`bg-dark-slate border-b border-neon-blue sticky top-0 z-50 ${glitchActive ? 'animate-glitch' : ''}`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center">
            <div className="font-future text-2xl md:text-3xl text-future-white relative group">
              <Link href="/">
                <a className="relative z-10 group-hover:text-neon-blue transition-colors duration-300">ADRIEN TRIPON</a>
              </Link>
              <span className={`absolute -inset-1 bg-gradient-to-r from-neon-magenta via-neon-purple to-neon-blue opacity-0 group-hover:opacity-25 duration-300 blur-xl transition-opacity`}></span>
            </div>
            <div className="ml-4 h-5 w-1 bg-neon-blue animate-pulse-slow"></div>
          </div>
          
          {/* Mobile menu button */}
          <button 
            id="menu-toggle" 
            className="lg:hidden block p-3 border border-neon-blue" 
            aria-label="Toggle menu"
            onClick={toggleMenu}
          >
            <div className="w-6 h-0.5 bg-neon-blue mb-1.5"></div>
            <div className="w-6 h-0.5 bg-neon-blue mb-1.5"></div>
            <div className="w-6 h-0.5 bg-neon-blue"></div>
          </button>
          
          {/* Nav links */}
          <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full lg:flex lg:w-auto lg:items-center mt-4 lg:mt-0`}>
            <ul className="flex flex-col lg:flex-row">
              {[
                { path: '/', label: 'ACCUEIL' },
                { path: '/projects', label: 'EXPÉRIENCE' },
                { path: '/about', label: 'COMPÉTENCES' },
                { path: '/contact', label: 'CONTACT' }
              ].map((item, index) => (
                <li key={item.path} className="mb-3 lg:mb-0 lg:ml-8">
                  <div className="relative group overflow-hidden inline-block">
                    <Link href={item.path}>
                      <a className={`font-mono text-sm ${location === item.path ? 'text-neon-blue' : 'text-future-white hover:text-neon-blue'} transition-colors duration-200`}>
                        <span className="relative z-10">{item.label}</span>
                      </a>
                    </Link>
                    <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-neon-blue transform ${location === item.path ? 'translate-x-0' : 'translate-x-[-100%]'} group-hover:translate-x-0 transition-transform duration-300 ease-out`}></span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Info line with animated gradients */}
      <div className="bg-medium-slate py-1 px-4 text-xs font-mono text-cyber-gray flex justify-between overflow-hidden relative">
        {/* Animated scan line */}
        <div className="absolute inset-0 animate-scan opacity-30 pointer-events-none"></div>
        
        <span>
          <span className="text-neon-blue">[</span> 
          PORTFOLIO_v.2.1
          <span className="text-neon-blue">]</span>
        </span>
        <span className="hidden md:inline">
          <span className="text-neon-blue">&lt;</span> 
          SUPPLY CHAIN EXPERT
          <span className="text-neon-blue">&gt;</span>
        </span>
        <span className="hidden lg:inline">
          <span className="text-neon-magenta">[</span>
          {new Date().toLocaleDateString('fr-FR')}
          <span className="text-neon-magenta">]</span>
        </span>
        <span>
          <span className="text-neon-purple">&lt;/</span>
          MODE: ONLINE
          <span className="text-neon-purple">&gt;</span>
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
