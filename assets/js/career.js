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

document.getElementById('displayCV').addEventListener('click', async () => {
    const ownerName = document.querySelector('meta[name="owner-name"]').content;
    try {
        const response = await fetch(`https://registry.jsonresume.org/${ownerName}`);
        if (!response.ok) throw new Error('Erreur lors du chargement du contenu');
        const htmlContent = await response.text();
        openModalWithContent(htmlContent);
    } catch (error) {
        console.error("Erreur lors du chargement du CV :", error);
    }
});

function openModalWithContent(content) {
    const iframe = document.getElementById('modal-iframe');
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(content);
    iframeDoc.close();

    document.querySelector('.modal').style.display = 'flex';
    document.querySelector('.overlay').style.display = 'flex';
}

document.querySelector('.overlay').addEventListener('click', closeModal);
document.querySelector('.close').addEventListener('click', closeModal);

function closeModal() {
    document.querySelector('.modal').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
}

document.querySelector('.download').addEventListener('click', async () => {
    const ownerName = document.querySelector('meta[name="owner-name"]').content;
    const response = await fetch(`https://registry.jsonresume.org/${ownerName}`);
    const data = await response.text();

    const iframe = document.getElementById('modal-iframe');
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.body.innerHTML = data;

    const date = new Date().toISOString().split('T')[0];
    const fileName = `${resume.basics.name.replace(/\s+/g, '-').toLowerCase()}-resume-${date}.pdf`;
    const opt = {
        margin: 0,
        filename: fileName,
        html2canvas: { scale: 1, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(iframeDoc.body).save();
});