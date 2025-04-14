import { useState } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { ContactFormData } from '@/lib/types';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest('POST', '/api/contact', data);
      const result = await response.json();
      return result;
    },
    onSuccess: (data) => {
      toast({
        title: "Message Sent",
        description: data.message,
        variant: "default",
      });
      setFormData({ name: '', email: '', message: '' });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <section id="contact" className="py-20 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="font-pixel text-4xl md:text-5xl text-neon-green inline-block border-b-4 border-hot-pink pb-2">
            ESTABLISH_CONNECTION
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-dark-gray p-6 border-2 border-electric-blue">
            <h3 className="font-pixel text-2xl text-electric-blue mb-4">CONTACT_INFO</h3>
            
            <ul className="space-y-4 font-code">
              <li className="flex items-center">
                <div className="w-8 h-8 bg-neon-green flex items-center justify-center mr-3">
                  <span className="text-dark-navy font-bold">@</span>
                </div>
                <a href="mailto:hello@retroportfolio.dev" className="text-light-gray hover:text-hot-pink transition-colors">hello@retroportfolio.dev</a>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 bg-neon-green flex items-center justify-center mr-3">
                  <span className="text-dark-navy font-bold">#</span>
                </div>
                <span className="text-light-gray">+1 (800) 555-1234</span>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 bg-neon-green flex items-center justify-center mr-3">
                  <span className="text-dark-navy font-bold">!</span>
                </div>
                <span className="text-light-gray">Cyberpunk City, Digital District</span>
              </li>
            </ul>
            
            <div className="mt-8">
              <h3 className="font-pixel text-2xl text-electric-blue mb-4">SOCIAL_NETWORKS</h3>
              <div className="flex space-x-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-dark-navy border-2 border-electric-blue flex items-center justify-center text-electric-blue hover:bg-electric-blue hover:text-dark-navy transition-colors">
                  <span className="font-pixel text-lg">GH</span>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-dark-navy border-2 border-electric-blue flex items-center justify-center text-electric-blue hover:bg-electric-blue hover:text-dark-navy transition-colors">
                  <span className="font-pixel text-lg">TW</span>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-dark-navy border-2 border-electric-blue flex items-center justify-center text-electric-blue hover:bg-electric-blue hover:text-dark-navy transition-colors">
                  <span className="font-pixel text-lg">LI</span>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-dark-navy border-2 border-electric-blue flex items-center justify-center text-electric-blue hover:bg-electric-blue hover:text-dark-navy transition-colors">
                  <span className="font-pixel text-lg">IG</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-dark-gray p-6 border-2 border-neon-green">
            <h3 className="font-pixel text-2xl text-neon-green mb-4">SEND_MESSAGE</h3>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block font-retro text-xs text-electric-blue mb-1">[NAME]</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-dark-navy border-2 border-electric-blue px-4 py-2 font-code text-light-gray focus:border-hot-pink focus:outline-none"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block font-retro text-xs text-electric-blue mb-1">[EMAIL]</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-dark-navy border-2 border-electric-blue px-4 py-2 font-code text-light-gray focus:border-hot-pink focus:outline-none"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block font-retro text-xs text-electric-blue mb-1">[MESSAGE]</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full bg-dark-navy border-2 border-electric-blue px-4 py-2 font-code text-light-gray focus:border-hot-pink focus:outline-none resize-none"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="font-retro text-sm bg-dark-navy border-2 border-neon-green text-neon-green px-6 py-3 hover:bg-neon-green hover:text-dark-navy transition-colors duration-300 w-full"
                disabled={contactMutation.isPending}
              >
                {contactMutation.isPending ? 'SENDING...' : 'TRANSMIT_MESSAGE'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
