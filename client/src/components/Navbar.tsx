import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const [bootupComplete, setBootupComplete] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when navigating to a new route
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // RobCo terminal bootup animation
  useEffect(() => {
    const timeout = setTimeout(() => {
      setBootupComplete(true);
    }, 800);
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <nav className="bg-terminal-dark border-b border-terminal-green sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <div className="font-robco text-2xl md:text-3xl text-terminal-header hover:text-pip-green transition-colors duration-200">
                TERMINAL RobCo
              </div>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            id="menu-toggle" 
            className="lg:hidden block p-2 border border-terminal-green" 
            aria-label="Toggle menu"
            onClick={toggleMenu}
          >
            <div className="w-6 h-0.5 bg-terminal-green mb-1.5"></div>
            <div className="w-6 h-0.5 bg-terminal-green mb-1.5"></div>
            <div className="w-6 h-0.5 bg-terminal-green"></div>
          </button>
          
          {/* Nav links */}
          <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full lg:flex lg:w-auto lg:items-center mt-4 lg:mt-0`}>
            <ul className="flex flex-col lg:flex-row">
              {[
                { path: '/', label: 'ACCUEIL' },
                { path: '/projects', label: 'EXPÉRIENCE' },
                { path: '/about', label: 'COMPÉTENCES' },
                { path: '/contact', label: 'CONTACT' }
              ].map((item) => (
                <li key={item.path} className="mb-3 lg:mb-0 lg:ml-8">
                  <Link href={item.path}>
                    <div className={`font-terminal text-sm cursor-pointer
                      ${location === item.path 
                        ? 'text-pip-green' 
                        : 'text-terminal-green hover:text-pip-green'} 
                      transition-colors duration-200`}
                    >
                      [&#8226; {item.label} ]
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Terminal info line */}
      <div className="bg-terminal-bg py-1 px-4 text-xs font-terminal text-terminal-green flex justify-between border-t border-terminal-green/30">
        <span>
          <span className="text-pip-green">&gt;</span> 
          ADRIEN_TRIPON-CV-2025
        </span>
        <span className="hidden md:inline">
          SUPPLY CHAIN EXPERT
        </span>
        <span className="hidden lg:inline">
          <span className="text-pip-amber">DERNIÈRE_MAJ:</span> {new Date().toLocaleDateString('fr-FR')}
        </span>
        <span>
          STATUS: <span className="text-pip-green animate-terminal-flicker">ONLINE</span>
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
