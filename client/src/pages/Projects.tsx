import { useQuery } from '@tanstack/react-query';
import ProjectCard from '@/components/ProjectCard';
import { Project } from '@shared/schema';
import { Link } from 'wouter';

const Projects = () => {
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  return (
    <section id="projects" className="py-20 px-4 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="font-pixel text-4xl md:text-5xl text-neon-green inline-block border-b-4 border-hot-pink pb-2">
            &lt;PROJECTS/&gt;
          </h2>
        </div>
        
        {isLoading ? (
          <div className="text-center">
            <div className="font-code text-electric-blue">
              LOADING_PROJECTS<span className="animate-blink">_</span>
            </div>
          </div>
        ) : error ? (
          <div className="text-center">
            <div className="font-code text-hot-pink">
              ERROR_LOADING_PROJECTS: {(error as Error).message}
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects?.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link href="/contact">
                <a className="inline-block font-retro text-sm bg-dark-gray border-2 border-hot-pink text-hot-pink px-6 py-3 hover:bg-hot-pink hover:text-dark-gray transition-colors duration-300">
                  MORE PROJECTS
                </a>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
