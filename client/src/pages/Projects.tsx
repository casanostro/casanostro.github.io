import { useQuery } from '@tanstack/react-query';
import ProjectCard from '@/components/ProjectCard';
import { Project } from '@shared/schema';
import { Link } from 'wouter';
import { useEffect, useState } from 'react';

const Projects = () => {
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });
  
  const [bootupComplete, setBootupComplete] = useState(false);

  // RobCo terminal bootup animation
  useEffect(() => {
    const timeout = setTimeout(() => {
      setBootupComplete(true);
    }, 800);
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="projects" className="py-10 px-4 relative overflow-hidden bg-terminal-bg min-h-screen">
      <div className="container mx-auto animate-terminal-boot">
        <div className="robco-header mb-8">
          <h2 className="font-robco text-3xl md:text-4xl text-terminal-header pb-2 uppercase">
            EXPÉRIENCE PROFESSIONNELLE
          </h2>
          <div className="w-full border-b border-terminal-green mt-2"></div>
        </div>

        <div className="font-terminal text-terminal-green mb-6 terminal-prompt">
          Affichage des entrées d'expérience professionnelle. {projects?.length || 0} résultats trouvés.
        </div>
        
        {isLoading ? (
          <div className="text-center p-10 border border-terminal-green bg-terminal-dark">
            <div className="font-terminal text-terminal-green animate-terminal-flicker">
              CHARGEMENT DES DONNÉES<span className="animate-cursor-blink">▓</span>
            </div>
          </div>
        ) : error ? (
          <div className="text-center p-10 border border-terminal-green bg-terminal-dark">
            <div className="font-terminal text-pip-amber uppercase">
              ERREUR DE CHARGEMENT: {(error as Error).message}
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects?.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <div className="inline-block font-terminal text-sm bg-terminal-dark border border-terminal-green text-terminal-green px-6 py-2 hover:border-pip-green hover:text-pip-green transition-colors duration-300">
                <span className="mr-2">■</span> ENTRÉES ARCHIVÉES: 4
              </div>
            </div>
          </>
        )}
        
        <div className="terminal-section mt-8 pt-4">
          <div className="font-terminal text-xs text-terminal-green opacity-80">
            <div className="flex justify-between mb-2">
              <span>* Pour plus d'informations, consultez la section [COMPÉTENCES]</span>
              <span className="animate-cursor-blink">▓</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
