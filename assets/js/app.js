fetchResume();

async function fetchResume() {
    try {
        const response = await fetch('https://gist.githubusercontent.com/Clement-Cauet/f842b0450dec8ce789854e5279b401dd/raw');
        if (!response.ok) throw new Error('Erreur lors du chargement du contenu');
        resume = await response.json();
    } catch (error) {
        console.error("Erreur lors du chargement du CV :", error);
    }
}

document.addEventListener('DOMContentLoaded', async() => {
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
});