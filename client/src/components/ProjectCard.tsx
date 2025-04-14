import { useState } from 'react';
import { Project } from '@shared/schema';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const badgeColorClass = 
    project.badgeColor === 'neon-green' ? 'bg-neon-green' : 
    project.badgeColor === 'electric-blue' ? 'bg-electric-blue' : 
    project.badgeColor === 'hot-pink' ? 'bg-hot-pink' : 'bg-neon-green';

  return (
    <div 
      className={`bg-dark-gray p-4 border-2 border-electric-blue hover:border-neon-green transition-all duration-300 transform hover:-translate-y-2 ${isHovered ? 'animate-glitch' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-hidden mb-4">
        <div className="aspect-w-16 aspect-h-9 bg-black">
          <img 
            src={project.image}
            alt={`${project.title} project`}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/70 to-transparent"></div>
        </div>
        <div className={`absolute top-2 left-2 ${badgeColorClass} text-dark-navy px-2 py-1 font-retro text-xs`}>
          {project.badge}
        </div>
      </div>
      
      <h3 className="font-pixel text-2xl text-electric-blue mb-2">{project.title}</h3>
      
      <p className="font-code text-sm text-light-gray mb-4">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag, index) => (
          <span key={index} className="inline-block bg-dark-navy text-hot-pink text-xs font-code px-2 py-1 border border-hot-pink">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex justify-between pt-3 border-t border-gray-700">
        <a 
          href={project.projectUrl} 
          className="font-retro text-xs text-neon-green hover:underline"
          target="_blank" 
          rel="noopener noreferrer"
        >
          [VIEW PROJECT]
        </a>
        <a 
          href={project.sourceUrl} 
          className="font-retro text-xs text-electric-blue hover:underline"
          target="_blank" 
          rel="noopener noreferrer"
        >
          [SOURCE CODE]
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
