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

document.addEventListener('DOMContentLoaded', function () {
    let sidebarHeight = document.querySelector('.sidebar').offsetHeight;

    function updateHeights() {
        sidebarHeight = document.querySelector('.sidebar').offsetHeight;

        if (window.location.hash) {
            scrollToElement(window.location.hash);
        }
    }

    function scrollToElement(hash) {
        const decodedHash = decodeURIComponent(hash);
        const targetElement = document.querySelector(decodedHash);
        if (targetElement) {
            let offset = targetElement.offsetTop;
            if (window.innerWidth < 769) {
                offset -= sidebarHeight;
            }
            window.scrollTo({
                top: offset
            });
        }
    }

    if (window.location.hash) {
        scrollToElement(window.location.hash);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            scrollToElement(this.getAttribute('href'));
        });
    });

    window.addEventListener('resize', updateHeights);
});