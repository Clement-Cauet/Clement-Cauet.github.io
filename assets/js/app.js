document.getElementById('viewCV').addEventListener('click', async () => {
    try {
        const response = await fetch('https://registry.jsonresume.org/Clement-Cauet');
        if (!response.ok) throw new Error('Erreur lors du chargement du contenu');
        const htmlContent = await response.text();
        openModalWithContent(htmlContent);
    } catch (error) {
        console.error("Erreur lors du chargement du CV :", error);
    }
});

function openModalWithContent(content) {
    document.querySelector('.modal').style.display = 'flex';
    document.querySelector('.overlay').style.display = 'flex';
    document.querySelector('#modal-content').innerHTML = content;
}

document.querySelector('.overlay').addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector('#modal-content').innerHTML = '';
});

document.querySelector('.close').addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector('#modal-content').innerHTML = '';
});

document.querySelector('.download').addEventListener('click', () => {
    const element = document.getElementById('modal-content');
    const date = new Date().toISOString().split('T')[0];
    const fileName = `clement-resume-${date}.pdf`;
    const opt = {
        margin: 0,
        filename: fileName,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
});