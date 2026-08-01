import skillsData from './skills-data.js';
import projectsData from './projects-data.js';

document.addEventListener('DOMContentLoaded', () => {
    const skillsSection = document.getElementById('skills');
    const projectsSection = document.getElementById('projects');

    // Render skills cards
    skillsData.forEach(skill => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${skill.category}</h3>
            <p>${skill.technologies.map(tech => `<span class="tag">${tech}</span>`).join(' ')}</p>
            ${skill.description ? `<div class="code">${skill.description}</div>` : ''}
        `;
        skillsSection.appendChild(card);
    });

    // Render projects cards
    projectsData.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <p>${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join(' ')}</p>
            ${project.link ? `<a href="${project.link}" target="_blank" class="btn mt-4">Ver Proyecto</a>` : ''}
        `;
        projectsSection.appendChild(card);
    });
});
