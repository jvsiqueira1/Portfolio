import { FaGithub } from 'react-icons/fa';
import { SiLinkedin } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="py-10 border-t border-gray-800 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex space-x-4">
            <a
              href="https://github.com/jvsiqueira1" 
              target="_blank"  
              className="text-foreground hover:text-primary transition-colors" aria-label="Github">
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/joaovitorsiqueira1/" 
              target="_blank" 
              className="text-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
              <SiLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
