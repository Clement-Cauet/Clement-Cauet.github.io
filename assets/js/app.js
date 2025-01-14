document.getElementById('downloadCV').addEventListener('click', async () => {
    try {
        const resume = await fetchResumeData('/assets/json/resume.json');
        const doc = new jsPDF();
        const data = extractResumeData(resume);

        generatePDFLayout(doc, data);
    } catch (error) {
        console.error("Erreur lors de la génération du PDF :", error);
    }
});

async function fetchResumeData(url) {
    const response = await fetch(url);
    return response.json();
}

function extractResumeData(resume) {
    return {
        name: resume.basics.name,
        label: resume.basics.label,
        image: `../${resume.basics.image}`,
        summary: resume.basics.summary,
        email: resume.basics.email,
        phone: resume.basics.phone,
        location: `${resume.basics.location.city}, ${resume.basics.location.region}`,
        profiles: resume.basics.profiles,
        education: resume.education,
        work: resume.work,
    };
}

async function generatePDFLayout(doc, data) {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const leftWidth = pageWidth / 3;
    const rightWidth = (2 * pageWidth) / 3 - 20;

    try {
        await createLeftBlock(doc, data, leftWidth, pageHeight);
        createRightBlock(doc, data, leftWidth + 10, rightWidth);

        const date = new Date().toISOString().split('T')[0];
        const fileName = `${data.name.replace(/\s+/g, '-').toLowerCase()}-resume-${date}.pdf`;
        doc.save(fileName);
    } catch (error) {
        console.error("Erreur lors de la création du PDF :", error);
    }
}

function createLeftBlock(doc, data, leftWidth, pageHeight) {
    const marginLeft = 10;
    let yPosition = 10;

    doc.setFillColor(240, 240, 240);
    doc.rect(0, 0, leftWidth, pageHeight, "F");

    const writeTextWithWrap = createTextWrapFunction(doc);

    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = data.image;

        img.onload = () => {
            const imgSize = 50;
            doc.addImage(img, "JPEG", marginLeft, yPosition, imgSize, imgSize);
            yPosition += imgSize + 10;

            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.text("Informations", marginLeft, yPosition);
            yPosition += 10;

            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            yPosition = writeTextWithWrap(`Téléphone : ${data.phone}`, marginLeft, yPosition, leftWidth - 20);
            yPosition = writeTextWithWrap(`Email : ${data.email}`, marginLeft, yPosition, leftWidth - 20);

            data.profiles.forEach(profile => {
                yPosition = writeTextWithWrap(`${profile.network}: ${profile.url}`, marginLeft, yPosition, leftWidth - 20);
            });

            resolve();
        };

        img.onerror = (error) => {
            console.error("Erreur lors du chargement de l'image :", error);
            reject(error);
        };
    });
}


function createRightBlock(doc, data, marginRight, rightWidth) {
    let yPosition = 10;

    const writeTextWithWrap = createTextWrapFunction(doc);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    yPosition = writeTextWithWrap(data.name, marginRight, yPosition, rightWidth, 12);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    yPosition = writeTextWithWrap(data.label, marginRight, yPosition, rightWidth, 10);

    doc.setFontSize(8);
    yPosition = writeTextWithWrap(data.summary, marginRight, yPosition, rightWidth);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    yPosition += 10;
    yPosition = writeTextWithWrap("Expériences professionnelles", marginRight, yPosition, rightWidth, 10);

    data.work.forEach(work => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        yPosition = writeTextWithWrap(`${new Date(work.startDate).getFullYear()} - ${new Date(work.endDate).getFullYear()} | ${work.position}`, marginRight, yPosition, rightWidth);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        yPosition = writeTextWithWrap(`${work.name}`, marginRight, yPosition, rightWidth);
        yPosition = writeTextWithWrap(`- ${work.summary}`, marginRight, yPosition, rightWidth);
    });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    yPosition += 10;
    yPosition = writeTextWithWrap("Formations", marginRight, yPosition, rightWidth, 10);

    data.education.forEach(education => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        yPosition = writeTextWithWrap(`${new Date(education.startDate).getFullYear()} - ${new Date(education.endDate).getFullYear()} | ${education.studyType}`, marginRight, yPosition, rightWidth);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        yPosition = writeTextWithWrap(`${education.institution}`, marginRight, yPosition, rightWidth);
    });
}

function createTextWrapFunction(doc) {
    return (text, x, y, maxWidth, lineHeight = 5) => {
        const lines = doc.splitTextToSize(text, maxWidth);
        lines.forEach(line => {
            doc.text(line, x, y);
            y += lineHeight;
        });
        return y;
    };
}