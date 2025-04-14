import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when navigating to a new route
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav className="bg-dark-gray border-b-4 border-neon-green sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <a className="font-pixel text-3xl md:text-4xl text-neon-green mr-4">CYBR_PRT</a>
            </Link>
            <div className="h-4 w-4 bg-neon-green animate-blink"></div>
          </div>
          
          <button 
            id="menu-toggle" 
            className="lg:hidden block px-3 py-2 border-2 border-neon-green text-neon-green" 
            aria-label="Toggle menu"
            onClick={toggleMenu}
          >
            <div className="w-5 h-0.5 bg-neon-green mb-1"></div>
            <div className="w-5 h-0.5 bg-neon-green mb-1"></div>
            <div className="w-5 h-0.5 bg-neon-green"></div>
          </button>
          
          <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full lg:flex lg:w-auto lg:items-center mt-2 lg:mt-0`}>
            <ul className="flex flex-col lg:flex-row">
              <li className="mb-2 lg:mb-0 lg:mr-6">
                <Link href="/">
                  <a className={`font-retro text-sm ${location === '/' ? 'text-neon-green' : 'text-electric-blue hover:text-neon-green'} transition-colors duration-200`}>
                    [HOME]
                  </a>
                </Link>
              </li>
              <li className="mb-2 lg:mb-0 lg:mr-6">
                <Link href="/projects">
                  <a className={`font-retro text-sm ${location === '/projects' ? 'text-neon-green' : 'text-electric-blue hover:text-neon-green'} transition-colors duration-200`}>
                    [PROJECTS]
                  </a>
                </Link>
              </li>
              <li className="mb-2 lg:mb-0 lg:mr-6">
                <Link href="/about">
                  <a className={`font-retro text-sm ${location === '/about' ? 'text-neon-green' : 'text-electric-blue hover:text-neon-green'} transition-colors duration-200`}>
                    [ABOUT]
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className={`font-retro text-sm ${location === '/contact' ? 'text-neon-green' : 'text-electric-blue hover:text-neon-green'} transition-colors duration-200`}>
                    [CONTACT]
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
