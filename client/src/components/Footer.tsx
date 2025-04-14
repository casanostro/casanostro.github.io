import { Link } from 'wouter';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const lastUpdated = new Date().toISOString().split('T')[0].replace(/-/g, '.');

  return (
    <footer className="bg-dark-gray border-t-4 border-neon-green py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/">
              <a className="font-pixel text-2xl text-neon-green mb-2">RETRO_PORTFOLIO</a>
            </Link>
            <p className="font-code text-sm text-light-gray">
              <span className="text-hot-pink">&copy;</span> {currentYear} All systems operational
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <a href="https://github.com" className="text-electric-blue hover:text-neon-green transition-colors" target="_blank" rel="noopener noreferrer">
                <span className="font-pixel text-base">[Github]</span>
              </a>
              <a href="https://twitter.com" className="text-electric-blue hover:text-neon-green transition-colors" target="_blank" rel="noopener noreferrer">
                <span className="font-pixel text-base">[Twitter]</span>
              </a>
              <a href="https://linkedin.com" className="text-electric-blue hover:text-neon-green transition-colors" target="_blank" rel="noopener noreferrer">
                <span className="font-pixel text-base">[LinkedIn]</span>
              </a>
            </div>
            
            <p className="font-code text-xs text-light-gray text-center md:text-right">
              <span className="text-hot-pink">$</span> Designed & built with retro futurism
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700 text-center">
          <p className="font-code text-xs text-light-gray">
            <span className="text-electric-blue">&gt;</span> crafted with HTML, CSS, and JavaScript // last updated: {lastUpdated}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
