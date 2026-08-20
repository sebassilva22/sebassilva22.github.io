/* main.js - Dynamic rendering of skills and projects */

// Import data
import { skillsData } from './skills-data.js';
import { projectsData } from './projects-data.js';

// Render skills section
function renderSkills() {
  const skillsContainer = document.getElementById('skills');
  
  skillsData.forEach(skill => {
    const card = document.createElement('div');
    card.className = 'skill-card animate-on-scroll';
    
    card.innerHTML = `
      <h3>${skill.name}</h3>
      <p>${skill.description}</p>
      <a href="${skill.exampleLink}">View Example</a>
    `;
    
    skillsContainer.appendChild(card);
  });
}

// Render projects section
function renderProjects() {
  const projectsContainer = document.getElementById('projects');
  
  projectsData.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card animate-on-scroll';
    
    card.innerHTML = `
      <h3>${project.title}</h3>
      <p>Tech: ${project.tech.join(', ')}</p>
      <a href="${project.link}">View Project</a>
    `;
    
    projectsContainer.appendChild(card);
  });
}

// Add animations on scroll
function initAnimations() {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  renderSkills();
  renderProjects();
  initAnimations();
});
