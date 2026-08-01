import skillsData from './skills-data.js';
import projectsData from './projects-data.js';

function loadSkills() {
    const skillsContainer = document.getElementById('skills');
    skillsData.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'card';
        skillCard.innerHTML = `
            <h3>${skill.category}</h3>
            <p>${skill.technologies.join(', ')}</p>
            <p>${skill.description}</p>
        `;
        skillsContainer.appendChild(skillCard);
    });
}

function loadProjects() {
    const projectsContainer = document.getElementById('projects');
    projectsData.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <span class="tag">${project.technologies.join(', ')}</span>
        `;
        projectsContainer.appendChild(projectCard);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadSkills();
    loadProjects();
});
