async function fetchResume() {
    const gistUrl = document.querySelector('meta[name="gist-url"]').content;
    try {
        const response = await fetch(gistUrl);
        if (!response.ok) throw new Error('Erreur lors du chargement du contenu');
        resume = await response.json();
    } catch (error) {
        console.error("Erreur lors du chargement du CV :", error);
    }
}

async function loadMenuProjects() {
    try {
        const response = await fetch('/assets/json/project.json');
        const projects = await response.json();

        const dropdownMenu = document.querySelector('.navbar-dropdown');
        let dropdownContent = '';
        projects.forEach(project => {
            dropdownContent += `
                <a href="/projects/project?owner=${project.owner}&repo=${project.repo}" class="navbar-item">
                    ${project.repo}
                </a>
            `;
        });
        dropdownMenu.innerHTML = dropdownContent;
    } catch (error) {
        console.error("Erreur lors du chargement des projets :", error);
    }
}

document.addEventListener('DOMContentLoaded', async() => {
    fetchResume();
    loadMenuProjects();
});