import { Link } from 'wouter';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    // Typing effect function
    const typeElements = document.querySelectorAll('.typing-animation');
    
    typeElements.forEach(el => {
      const text = el.textContent || '';
      el.textContent = '';
      let i = 0;
      
      const typeWriter = () => {
        if (i < text.length) {
          el.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, Math.random() * 50 + 50);
        }
      };
      
      // Start typing
      setTimeout(typeWriter, 500);
    });
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center py-16 px-4 grid-bg">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-block mb-6 relative">
            <h1 className="font-pixel text-5xl md:text-7xl text-neon-green mb-2 transform hover:scale-105 transition-transform duration-300 typing-animation">
              RETRO-FUTURISTIC
            </h1>
            <h2 className="font-pixel text-6xl md:text-8xl text-electric-blue transform hover:scale-105 transition-transform duration-300">
              PORTFOLIO
            </h2>
            <div className="absolute -inset-2 border-2 border-neon-green opacity-75 pixel-border"></div>
          </div>
          
          <p className="font-code text-md md:text-lg text-light-gray max-w-2xl mx-auto leading-relaxed">
            <span className="text-hot-pink">&gt;</span> <span className="typing-animation inline-block">Full-stack developer creating digital experiences at the intersection of past and future aesthetics.</span><span className="animate-blink">_</span>
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <Link href="/projects">
              <a className="font-retro text-xs md:text-sm bg-dark-gray border-2 border-neon-green text-neon-green px-6 py-3 hover:bg-neon-green hover:text-dark-gray transition-colors duration-300 transform hover:translate-y-1 hover:translate-x-1">
                EXPLORE PROJECTS
              </a>
            </Link>
            <Link href="/contact">
              <a className="font-retro text-xs md:text-sm bg-dark-gray border-2 border-electric-blue text-electric-blue px-6 py-3 hover:bg-electric-blue hover:text-dark-gray transition-colors duration-300 transform hover:translate-y-1 hover:translate-x-1">
                INITIATE CONTACT
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
