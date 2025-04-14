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
    }, 1000);
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <nav className="bg-terminal-dark border-b-2 border-terminal-green sticky top-0 z-50 terminal-flicker">
      <div className="robco-header">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center">
              <Link href="/">
                <a className="font-robco text-3xl md:text-4xl text-terminal-header mr-2">ROBCO INDUSTRIES (TM)</a>
              </Link>
              <div className="h-4 w-4 bg-terminal-green animate-cursor-blink"></div>
            </div>
            
            <button 
              id="menu-toggle" 
              className="lg:hidden block px-3 py-2 border-2 border-terminal-green text-terminal-green" 
              aria-label="Toggle menu"
              onClick={toggleMenu}
            >
              <div className="w-5 h-0.5 bg-terminal-green mb-1"></div>
              <div className="w-5 h-0.5 bg-terminal-green mb-1"></div>
              <div className="w-5 h-0.5 bg-terminal-green"></div>
            </button>
            
            <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full lg:flex lg:w-auto lg:items-center mt-2 lg:mt-0`}>
              <ul className="flex flex-col lg:flex-row">
                <li className="mb-2 lg:mb-0 lg:mr-6">
                  <Link href="/">
                    <a className={`font-terminal text-sm ${location === '/' ? 'text-pip-green' : 'text-terminal-green hover:text-pip-green'} transition-colors duration-200`}>
                      [ACCUEIL]
                    </a>
                  </Link>
                </li>
                <li className="mb-2 lg:mb-0 lg:mr-6">
                  <Link href="/projects">
                    <a className={`font-terminal text-sm ${location === '/projects' ? 'text-pip-green' : 'text-terminal-green hover:text-pip-green'} transition-colors duration-200`}>
                      [EXPÉRIENCE]
                    </a>
                  </Link>
                </li>
                <li className="mb-2 lg:mb-0 lg:mr-6">
                  <Link href="/about">
                    <a className={`font-terminal text-sm ${location === '/about' ? 'text-pip-green' : 'text-terminal-green hover:text-pip-green'} transition-colors duration-200`}>
                      [COMPÉTENCES]
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <a className={`font-terminal text-sm ${location === '/contact' ? 'text-pip-green' : 'text-terminal-green hover:text-pip-green'} transition-colors duration-200`}>
                      [CONTACT]
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Terminal info line */}
      <div className="bg-terminal-bg border-y border-terminal-green py-1 px-4 text-xs font-terminal text-terminal-green flex justify-between">
        <span>TERMINAL_V1.0</span>
        <span>ADRIEN_TRIPON</span>
        <span>MÉMOIRE: 64K</span>
        <span className="hidden md:inline">SYSTÈME OPÉRATIONNEL</span>
      </div>
    </nav>
  );
};

export default Navbar;
