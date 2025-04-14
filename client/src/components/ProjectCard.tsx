import { useState, useRef, useEffect } from 'react';
import { Project } from '@shared/schema';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Animation d'entrée en hover
  const handleMouseEnter = () => {
    setIsHovered(true);
    // Activer l'effet de glitch aléatoirement
    if (Math.random() > 0.5) {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 1000);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Effet parallax sur l'image
  useEffect(() => {
    if (!cardRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered || !cardRef.current) return;
      
      const card = cardRef.current;
      const cardRect = card.getBoundingClientRect();
      
      // Position relative de la souris dans la carte (de -1 à 1)
      const xPos = (e.clientX - cardRect.left) / cardRect.width - 0.5;
      const yPos = (e.clientY - cardRect.top) / cardRect.height - 0.5;
      
      // Appliquer un léger effet parallax
      const imageEl = card.querySelector('.card-image') as HTMLElement;
      if (imageEl) {
        imageEl.style.transform = `scale(1.05) translate(${xPos * -10}px, ${yPos * -10}px)`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered]);

  // Déterminer les couleurs en fonction du secteur (badge)
  const getBadgeColors = () => {
    // Convertir les anciennes couleurs au nouveau thème
    switch(project.badgeColor) {
      case 'pip-green':
        return {
          bg: 'bg-neon-blue',
          text: 'text-neon-blue',
          border: 'border-neon-blue'
        };
      case 'pip-amber':
        return {
          bg: 'bg-neon-magenta',
          text: 'text-neon-magenta',
          border: 'border-neon-magenta'
        };
      default:
        return {
          bg: 'bg-neon-purple',
          text: 'text-neon-purple',
          border: 'border-neon-purple'
        };
    }
  };

  const colors = getBadgeColors();

  return (
    <div 
      ref={cardRef}
      className={`tech-card relative p-0 overflow-hidden digital-noise ${isGlitching ? 'animate-glitch' : ''} transition-all duration-300`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* En-tête avec titre et badge */}
      <div className="flex items-center justify-between p-4 border-b border-neon-blue/30">
        <h3 className="font-future text-xl text-future-white uppercase">{project.title}</h3>
        <div className={`${colors.bg} text-digital-black px-2 py-1 font-mono text-xs uppercase`}>
          {project.badge}
        </div>
      </div>
      
      {/* Image du projet avec overlay */}
      <div className="relative overflow-hidden aspect-video">
        <div className="absolute inset-0 bg-gradient-to-t from-digital-black to-transparent opacity-70 z-10"></div>
        <img 
          src={project.image}
          alt={project.title}
          className="card-image object-cover w-full h-full transition-transform duration-500 ease-out"
        />
        
        {/* Overlay d'interaction */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-neon-magenta/20 z-5 animate-pulse-slow"></div>
        )}
        
        {/* Effet de scan */}
        <div className="absolute inset-0 animate-scan pointer-events-none z-20 opacity-30"></div>
      </div>
      
      {/* Corps de la carte */}
      <div className="p-4">
        <p className="font-sans text-sm text-cyber-gray mb-4">
          {project.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span 
              key={index} 
              className={`tech-tag ${index % 2 === 0 ? '' : 'tag-magenta'}`}
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Actions */}
        <div className="flex justify-between pt-3 border-t border-medium-slate/50">
          <a 
            href={project.projectUrl} 
            className="neon-button py-1 px-3 text-xs"
            target="_blank" 
            rel="noopener noreferrer"
          >
            DÉTAILS
          </a>
          <a 
            href={project.sourceUrl} 
            className="magenta-button py-1 px-3 text-xs"
            target="_blank" 
            rel="noopener noreferrer"
          >
            FICHIERS
          </a>
        </div>
      </div>
      
      {/* Barre d'accentation de côté */}
      <div className={`absolute top-0 bottom-0 left-0 w-1 ${colors.bg} opacity-80`}></div>
      
      {/* Indicateur de sélection dans le coin */}
      {isHovered && (
        <div className="absolute right-0 top-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-neon-magenta border-r-transparent"></div>
      )}
    </div>
  );
};

export default ProjectCard;
