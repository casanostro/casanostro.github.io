import { Link } from 'wouter';
import { useEffect, useState } from 'react';

const Home = () => {
  const [bootupState, setBootupState] = useState('initializing');
  const [bootMessages, setBootMessages] = useState<string[]>([]);
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    // Simulation d'un boot RobCo Terminal
    const bootSequence = [
      "ROBCO INDUSTRIES (TM) TERMINVS",
      "Copyright 2025 ROBCO",
      "Chargement de l'OS...",
      "Initialisation du système...",
      "Test de mémoire réussi: 64K OK",
      "Initialisation de l'interface...",
      "Chargement des données utilisateur...",
      "AUTHENTIFICATION RÉUSSIE",
      "Bienvenue, ADRIEN TRIPON"
    ];

    let messageIndex = 0;
    const bootInterval = setInterval(() => {
      if (messageIndex < bootSequence.length) {
        setBootMessages(prev => [...prev, bootSequence[messageIndex]]);
        messageIndex++;

        if (messageIndex === 3) {
          setBootupState('loading');
        } else if (messageIndex === 7) {
          setBootupState('authenticating');
        } else if (messageIndex === bootSequence.length) {
          setBootupState('complete');
          clearInterval(bootInterval);
          setTimeout(() => {
            setBootComplete(true);
          }, 1000);
        }
      }
    }, 600);

    return () => clearInterval(bootInterval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center py-12 px-4 bg-terminal-bg scanlines">
      <div className="container mx-auto">
        {!bootComplete ? (
          // Boot sequence screen
          <div className="max-w-2xl mx-auto font-terminal text-terminal-green">
            <div className="text-center mb-8">
              <div className="text-2xl mb-2 text-terminal-header">
                INITIALISATION DU SYSTÈME
              </div>
              <div className="w-full h-1 bg-terminal-dark">
                <div
                  className="h-full bg-terminal-green transition-all duration-500"
                  style={{
                    width:
                      bootupState === 'initializing'
                        ? '25%'
                        : bootupState === 'loading'
                        ? '50%'
                        : bootupState === 'authenticating'
                        ? '75%'
                        : '100%'
                  }}
                ></div>
              </div>
            </div>

            <div className="bg-terminal-dark p-4 border border-terminal-green h-80 overflow-y-auto terminal-flicker">
              {bootMessages.map((message, index) => (
                <div key={index} className="mb-2">
                  <span className="text-pip-amber">{'>'}</span> {message}
                </div>
              ))}
              {bootupState !== 'complete' && (
                <div className="animate-cursor-blink inline-block">▓</div>
              )}
            </div>
          </div>
        ) : (
          // Main content after boot
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-terminal-boot">
            <div className="terminal-border p-4 mb-6 relative">
              <h1 className="font-robco text-4xl md:text-6xl text-terminal-header mb-2 uppercase animate-typing">
                ADRIEN TRIPON
              </h1>
              <h2 className="font-terminal text-xl md:text-2xl text-terminal-green">
                Supply Chain & Operations Project Manager
              </h2>
              <div className="mt-4 text-sm font-terminal text-terminal-green opacity-80">
                <span className="text-pip-amber">STATUS:</span> ACTIF
                <span className="mx-4">|</span>
                <span className="text-pip-amber">DISPONIBILITÉ:</span> AVRIL 2025
              </div>
            </div>
            
            <p className="font-terminal text-md md:text-lg text-terminal-text max-w-2xl mx-auto leading-relaxed terminal-prompt">
              Professionnel de la Supply Chain avec expertise en optimisation des processus logistiques, automatisation et gestion de projet<span className="animate-cursor-blink">▓</span>
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <Link href="/projects">
                <a className="font-terminal text-xs md:text-sm bg-terminal-dark border border-terminal-green text-terminal-green px-6 py-3 hover:border-pip-green hover:text-pip-green transition-colors duration-300">
                  [ EXPÉRIENCE PROFESSIONNELLE ]
                </a>
              </Link>
              <Link href="/about">
                <a className="font-terminal text-xs md:text-sm bg-terminal-dark border border-terminal-green text-terminal-green px-6 py-3 hover:border-pip-green hover:text-pip-green transition-colors duration-300">
                  [ COMPÉTENCES ]
                </a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
