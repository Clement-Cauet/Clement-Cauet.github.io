async function fetchTopics(owner, repo) {
    const url = `https://api.github.com/repos/${owner}/${repo}/topics`;
    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/vnd.github.mercy-preview+json'
            }
        });
        if (!response.ok) throw new Error('Erreur lors du chargement des topics');
        const topicsData = await response.json();
        return topicsData.names;
    } catch (error) {
        console.error("Erreur lors du chargement des topics :", error);
    }
}

document.addEventListener('DOMContentLoaded', async() => {
    const response = await fetch('/assets/json/project.json');
    const projects = await response.json();

    projects.forEach(async project => {
        const topics = await fetchTopics(project.owner, project.repo);
        const topicsContainer = document.getElementById(`topics-${project.owner}-${project.repo.replace('/', '-')}`);
        if (topicsContainer) {
            topicsContainer.innerHTML = topics.map(topic => `<span class="tag">${topic}</span>`).join('');
        }
    });
});