import { Link } from 'wouter';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const lastUpdated = new Date().toISOString().split('T')[0].replace(/-/g, '.');

  return (
    <footer className="bg-terminal-dark border-t-2 border-terminal-green py-6 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/">
              <a className="font-robco text-2xl text-terminal-green mb-2">ROBCO INDUSTRIES™</a>
            </Link>
            <p className="font-terminal text-sm text-terminal-text">
              <span className="text-pip-amber">[</span> SYSTÈME EN LIGNE <span className="text-pip-amber">]</span> COPYRIGHT {currentYear}
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <a href="https://github.com" className="text-terminal-green hover:text-pip-green transition-colors" target="_blank" rel="noopener noreferrer">
                <span className="font-terminal text-base">[GITHUB]</span>
              </a>
              <a href="https://twitter.com" className="text-terminal-green hover:text-pip-green transition-colors" target="_blank" rel="noopener noreferrer">
                <span className="font-terminal text-base">[TWITTER]</span>
              </a>
              <a href="https://linkedin.com" className="text-terminal-green hover:text-pip-green transition-colors" target="_blank" rel="noopener noreferrer">
                <span className="font-terminal text-base">[LINKEDIN]</span>
              </a>
            </div>
            
            <p className="font-terminal text-xs text-terminal-text text-center md:text-right">
              <span className="text-pip-green">■</span> TERMINAL ADRIEN_TRIPON-CV-2025
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-terminal-green/30 text-center">
          <p className="font-terminal text-xs text-terminal-text">
            <span className="text-terminal-header">&gt;</span> DERNIÈRE_MISE_À_JOUR: {lastUpdated} <span className="animate-cursor-blink">▓</span>
          </p>
        </div>
      </div>
      
      {/* Terminal status bar */}
      <div className="mt-4 bg-terminal-bg border-y border-terminal-green py-1 px-4 text-xs font-terminal text-terminal-green flex justify-between">
        <span>- ROBCO INDUSTRIES (TM) TERMINVS -</span>
        <span>- CONNEXION SÉCURISÉE -</span>
      </div>
    </footer>
  );
};

export default Footer;
