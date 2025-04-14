import { useState } from 'react';
import { Project } from '@shared/schema';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleMouseEnter = () => {
    setIsSelected(true);
  };

  const handleMouseLeave = () => {
    setIsSelected(false);
  };

  const badgeColorClass = 
    project.badgeColor === 'pip-green' ? 'bg-pip-green' : 
    project.badgeColor === 'pip-amber' ? 'bg-pip-amber' : 
    'bg-terminal-green';

  const textColorClass = 
    project.badgeColor === 'pip-green' ? 'text-pip-green' : 
    project.badgeColor === 'pip-amber' ? 'text-pip-amber' : 
    'text-terminal-green';

  return (
    <div 
      className={`bg-terminal-dark p-4 border border-terminal-green ${isSelected ? 'terminal-border' : ''} transition-all duration-300`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-start mb-2">
        <div className={`${textColorClass} font-terminal text-lg mr-2`}>●</div>
        <h3 className="font-robco text-2xl text-terminal-header uppercase">{project.title}</h3>
      </div>
      
      <div className="relative overflow-hidden mb-4 border border-terminal-green/50">
        <div className="aspect-w-16 aspect-h-9 bg-terminal-bg relative">
          <div className="absolute inset-0 bg-gradient-to-t from-terminal-bg/50 to-transparent z-10"></div>
          <img 
            src={project.image}
            alt={`${project.title}`}
            className="object-cover w-full h-full opacity-70 group-hover:scale-105 transition-transform duration-500"
          />
          <div className={`absolute top-0 left-0 ${badgeColorClass} text-terminal-bg px-2 py-1 font-terminal text-xs z-20`}>
            {project.badge}
          </div>
          {isSelected && (
            <div className="absolute inset-0 bg-terminal-green/5 animate-terminal-flicker z-5"></div>
          )}
        </div>
      </div>
      
      <div className="font-terminal text-sm text-terminal-text mb-4 terminal-prompt">
        {project.description}
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag, index) => (
          <span key={index} className="inline-block bg-terminal-bg text-terminal-green text-xs font-terminal px-2 py-1 border border-terminal-green/70">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex justify-between pt-3 border-t border-terminal-green/30">
        <a 
          href={project.projectUrl} 
          className="font-terminal text-xs text-pip-green hover:underline"
          target="_blank" 
          rel="noopener noreferrer"
        >
          [DÉTAILS]
        </a>
        <a 
          href={project.sourceUrl} 
          className="font-terminal text-xs text-terminal-green hover:text-pip-green transition-colors"
          target="_blank" 
          rel="noopener noreferrer"
        >
          [FICHIERS]
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
