'use client'

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { SiLinkedin } from 'react-icons/si';
import { FaGithub } from "react-icons/fa";
import DarkModeToggle from './DarkModeToggle'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [scrolled, setScrolled] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        const sections = document.querySelectorAll('section[id]');
        
        if (window.scrollY > 50) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
        
        let current = '';
        
        sections.forEach((section) => {
          const sectionTop = (section as HTMLElement).offsetTop - 100;
          const sectionId = section.getAttribute('id') || '';
          
          if (window.scrollY >= sectionTop) {
            current = sectionId;
          }
        });
        
        setActiveSection(current || 'hero');
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const handleLinkClick = (sectionId: string) => {
      setIsMenuOpen(false);
      setActiveSection(sectionId);
      
      const element = document.getElementById(sectionId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    };
    
    const navLinks = [
      { id: 'projects', label: 'Projetos' },
      { id: 'technologies', label: 'Tecnologias' },
      { id: 'about', label: 'Sobre mim' },
    ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background border-b border-gray-800 py-3' : 'bg-transparent py-5'
      }`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-primary font-bold text-lg mr-8">Portfolio</div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex justify-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-foreground hover:text-primary transition-colors ${activeSection === link.id ? 'font-medium' : ''}`}
              >
                {link.label}
              </button>
            ))}
          </nav>
          
          {/* Theme and Social Icons */}
          <div className="hidden md:flex space-x-4">
            <DarkModeToggle/>
            <a 
              href="https://www.linkedin.com/in/joaovitorsiqueira1/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary"
            >
              <SiLinkedin size={24} />
            </a>
            <a 
              href="https://github.com/jvsiqueira1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary"
            >
              <FaGithub size={24} />
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-foreground hover:text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-card shadow-md">
            <nav className="container mx-auto py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-foreground hover:text-primary transition-colors ${activeSection === link.id ? 'font-medium' : ''} px-4`}
                >
                  {link.label}
                </button>
              ))}
              <div className="flex items-center space-x-4 px-4 pt-4 border-t border-gray-800">
                <DarkModeToggle/>
                <a 
                  href="https://www.linkedin.com/in/joaovitorsiqueira1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary"
                >
                  <SiLinkedin size={20} />
                </a>
                <a 
              href="https://github.com/jvsiqueira1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary"
                >
                <FaGithub size={24} />
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
  )
}
