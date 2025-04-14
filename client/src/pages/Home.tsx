import { Link } from 'wouter';
import { useEffect, useState, useRef } from 'react';

// SVG Composant pour l'animation de particules
const ParticleGrid = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0 opacity-50">
      <svg
        className="absolute top-0 left-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <radialGradient id="grid-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="rgba(0, 240, 255, 0.3)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
          </radialGradient>
        </defs>
        
        {/* Grille animée */}
        <rect width="100%" height="100%" fill="none" />
        
        {/* Points lumineux animés */}
        {Array.from({ length: 20 }).map((_, i) => (
          <circle
            key={i}
            cx={10 + (i % 5) * 20}
            cy={10 + Math.floor(i / 5) * 20}
            r="0.5"
            fill="var(--neon-blue)"
            className="animate-pulse-slow"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
        
        {/* Lignes de grille qui pulsent */}
        <g className="animate-pulse-slow">
          {Array.from({ length: 6 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 20}
              x2="100"
              y2={i * 20}
              stroke="var(--grid-line)"
              strokeWidth="0.2"
            />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 20}
              y1="0"
              x2={i * 20}
              y2="100"
              stroke="var(--grid-line)"
              strokeWidth="0.2"
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

// Composant abstrait en arrière-plan qui bouge lentement
const AbstractBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden opacity-30 pointer-events-none z-0">
      <div className="absolute -bottom-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-tr from-neon-purple/20 to-transparent blur-3xl animate-float"></div>
      <div className="absolute -top-[30%] -right-[10%] w-[80%] h-[80%] rounded-full bg-gradient-to-bl from-neon-blue/10 to-transparent blur-3xl animate-float" style={{ animationDelay: '-3s' }}></div>
      <div className="absolute top-[40%] left-[60%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-neon-magenta/15 to-transparent blur-3xl animate-float" style={{ animationDelay: '-1.5s' }}></div>
    </div>
  );
};

const FloatingStats = () => {
  return (
    <div className="absolute right-8 top-1/3 hidden xl:flex flex-col gap-6 z-10 pointer-events-none">
      {[
        { label: 'Optimisation', value: 92, color: 'neon-blue' },
        { label: 'Innovation', value: 86, color: 'neon-magenta' },
        { label: 'Coordination', value: 94, color: 'neon-purple' }
      ].map((stat, i) => (
        <div 
          key={i} 
          className="tech-card w-44 py-3 animate-float digital-noise"
          style={{ animationDelay: `${i * 0.5}s` }}
        >
          <div className="text-center">
            <div className={stat.color === 'neon-blue' ? 'text-neon-blue font-future text-xl mb-1' : 
                       stat.color === 'neon-magenta' ? 'text-neon-magenta font-future text-xl mb-1' :
                       'text-neon-purple font-future text-xl mb-1'}>
              {stat.value}%
            </div>
            <div className="text-cyber-gray text-xs font-mono">{stat.label}</div>
          </div>
          <div className="mt-2 w-full bg-dark-slate h-1">
            <div 
              className={stat.color === 'neon-blue' ? 'h-full bg-neon-blue' : 
                         stat.color === 'neon-magenta' ? 'h-full bg-neon-magenta' :
                         'h-full bg-neon-purple'} 
              style={{ width: `${stat.value}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [textReveal, setTextReveal] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Animation de chargement
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 100) {
        progress = 100;
        clearInterval(interval);
        
        // Finir le chargement après un petit délai
        setTimeout(() => {
          setIsLoading(false);
          
          // Animer l'apparition du texte
          setTimeout(() => {
            setTextReveal(true);
          }, 500);
        }, 500);
      }
      setLoadingProgress(progress);
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // Parallax effet
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const offset = window.scrollY;
        heroRef.current.style.transform = `translateY(${offset * 0.3}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-12 px-4 bg-digital-black overflow-hidden grid-bg">
      <ParticleGrid />
      <AbstractBackground />
      
      {isLoading ? (
        <div className="relative z-10 w-full max-w-md mx-auto">
          <div className="mb-6 text-center">
            <h2 className="font-future text-future-white text-xl mb-2">INITIALISATION DU SYSTÈME</h2>
            <div className="tech-glow font-mono text-neon-blue text-sm">Chargement des données...</div>
          </div>
          
          <div className="relative h-1 w-full bg-dark-slate overflow-hidden neon-border">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-neon-blue to-neon-magenta transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          
          <div className="mt-4 font-mono text-xs text-cyber-gray flex justify-between">
            <span>STATUT: <span className="text-neon-blue">INITIALISATION</span></span>
            <span>{Math.round(loadingProgress)}%</span>
          </div>
        </div>
      ) : (
        <div ref={heroRef} className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Section principale */}
            <div className={`transition-all duration-1000 ease-out transform ${textReveal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} brutalist-container digital-noise`}>
              <h1 className="font-future text-5xl md:text-7xl text-future-white mb-3 tracking-tight">
                <span data-text="ADRIEN TRIPON" className="relative inline-block">
                  <span className="relative z-10">ADRIEN TRIPON</span>
                  <span className="absolute top-0 left-0 -z-10 text-neon-magenta opacity-50 blur-sm animate-pulse-slow">ADRIEN TRIPON</span>
                </span>
              </h1>
              
              <div className="tech-divider my-5"></div>
              
              <h2 className="font-mono text-xl md:text-2xl text-neon-blue">
                Supply Chain <span className="text-future-white">&</span> <span className="text-neon-magenta">Operations Project Manager</span>
              </h2>
              
              <p className="mt-6 text-cyber-gray leading-relaxed max-w-3xl font-sans">
                Professionnel de la Supply Chain avec expertise en optimisation des processus 
                logistiques, automatisation et gestion de projet. 
                <span className="text-neon-blue"> Diplômé d'un Master en Supply Chain Management</span>, 
                je combine des compétences analytiques poussées avec une vision stratégique 
                pour améliorer la performance opérationnelle.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <span className="inline-block">
                  <Link href="/projects">
                    <a className="neon-button">
                      EXPÉRIENCE
                    </a>
                  </Link>
                </span>
                <span className="inline-block">
                  <Link href="/about">
                    <a className="magenta-button">
                      COMPÉTENCES
                    </a>
                  </Link>
                </span>
              </div>
            </div>
            
            {/* Badges de compétences clés animées */}
            <div className={`mt-16 transition-all duration-1000 delay-300 ease-out transform ${textReveal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                {[
                  { name: 'S&OP', type: 'tech-tag' },
                  { name: 'Gestion des stocks', type: 'tag-magenta' }, 
                  { name: 'SAP', type: 'tech-tag' },
                  { name: 'Lean Six Sigma', type: 'tag-purple' },
                  { name: 'Power BI', type: 'tag-magenta' },
                  { name: 'Amélioration continue', type: 'tech-tag' },
                  { name: 'Data Analysis', type: 'tag-purple' },
                  { name: 'Project Management', type: 'tag-magenta' }
                ].map((skill, i) => (
                  <div 
                    key={i} 
                    className={`${skill.type} justify-center animate-float`}
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <FloatingStats />
      
      {/* Section du bas avec des statistiques */}
      <div className={`absolute bottom-0 left-0 right-0 bg-medium-slate bg-opacity-80 backdrop-blur-sm border-t border-neon-blue transition-all duration-1000 delay-500 ease-out transform ${textReveal ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto py-3 px-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="text-xs font-mono">
              <span className="text-cyber-gray">DISPONIBILITÉ: </span>
              <span className="text-neon-magenta">AVRIL 2025</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <div className="text-xs font-mono text-cyber-gray">
                <span className="text-neon-blue">5+</span> ANS D'EXPÉRIENCE
              </div>
              <div className="text-xs font-mono text-cyber-gray">
                <span className="text-neon-blue">10+</span> PROJETS RÉALISÉS
              </div>
              <div className="text-xs font-mono text-cyber-gray">
                <span className="text-neon-blue">3</span> INDUSTRIES DIFFÉRENTES
              </div>
            </div>
            
            <div className="text-xs font-mono">
              <span className="text-cyber-gray">STATUT: </span>
              <span className="text-neon-blue animate-pulse-slow">ACTIF</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
