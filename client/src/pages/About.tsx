import { useEffect } from 'react';

const About = () => {
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
      
      // Start typing when element is in viewport
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(typeWriter, 500);
            observer.unobserve(entry.target);
          }
        });
      });
      
      observer.observe(el);
    });
  }, []);

  return (
    <section id="about" className="py-20 px-4 relative overflow-hidden grid-bg">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-dark-gray p-6 border-2 border-neon-green relative screen-glow">
              <h2 className="font-pixel text-4xl text-electric-blue mb-6">
                <span className="text-hot-pink">&gt;</span> SYS_INFO
              </h2>
              
              <div className="space-y-4 font-code text-light-gray">
                <p className="typing-animation">
                  <span className="text-neon-green">$</span> Full-stack developer with 5+ years experience specializing in creating interactive web applications with distinctive visual aesthetics.
                </p>
                
                <p>
                  <span className="text-neon-green">$</span> Tech stack includes HTML5, CSS3, JavaScript (ES6+), Node.js, Express, MongoDB, and various frontend frameworks.
                </p>
                
                <p>
                  <span className="text-neon-green">$</span> Passionate about the intersection of retro computing aesthetics and modern web technologies. 
                </p>
                
                <p>
                  <span className="text-neon-green">$</span> Background in digital art and computer science provides unique perspective on UX/UI design.
                </p>
              </div>
              
              <div className="mt-8 pt-4 border-t border-gray-700">
                <h3 className="font-pixel text-2xl text-electric-blue mb-4">TECH_SKILLS</h3>
                <div className="flex flex-wrap gap-3">
                  <div className="bg-dark-navy px-3 py-1 text-neon-green border border-neon-green text-sm font-code">JavaScript</div>
                  <div className="bg-dark-navy px-3 py-1 text-neon-green border border-neon-green text-sm font-code">React.js</div>
                  <div className="bg-dark-navy px-3 py-1 text-neon-green border border-neon-green text-sm font-code">Node.js</div>
                  <div className="bg-dark-navy px-3 py-1 text-neon-green border border-neon-green text-sm font-code">Express.js</div>
                  <div className="bg-dark-navy px-3 py-1 text-neon-green border border-neon-green text-sm font-code">MongoDB</div>
                  <div className="bg-dark-navy px-3 py-1 text-neon-green border border-neon-green text-sm font-code">CSS/SCSS</div>
                  <div className="bg-dark-navy px-3 py-1 text-neon-green border border-neon-green text-sm font-code">WebGL</div>
                  <div className="bg-dark-navy px-3 py-1 text-neon-green border border-neon-green text-sm font-code">Three.js</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 text-center lg:text-right">
            <div className="relative inline-block">
              <div className="border-8 border-neon-green inline-block relative screen-glow">
                <div className="aspect-w-4 aspect-h-5 w-60 md:w-80 mx-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&h=500&fit=crop" 
                    alt="Developer Portrait" 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-electric-blue/10"></div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-dark-gray px-3 py-1 border-2 border-hot-pink">
                <span className="font-pixel text-hot-pink text-xl">DEV_PROFILE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
