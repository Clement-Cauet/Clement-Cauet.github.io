document.getElementById('downloadCV').addEventListener('click', async () => {
    try {
        const response = await fetch('/assets/json/resume.json');
        const resume = await response.json();

        const doc = new jsPDF();

        const data = {
            name: resume.basics.name,
            label: resume.basics.label,
            image: `../${resume.basics.image}`,
            summary: resume.basics.summary,
            email: resume.basics.email,
            phone: resume.basics.phone,
            location: `${resume.basics.location.city}, ${resume.basics.location.region}`,
            profiles: resume.basics.profiles,
            education: resume.education,
            work: resume.work
        };

        // Dimensions du PDF
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        // Largeur des blocs
        const leftWidth = pageWidth / 3; // 1/3 pour le bloc gauche
        const rightWidth = (2 * pageWidth) / 3 - 20; // 2/3 pour le bloc droit (ajusté avec une marge)

        // Ajouter un rectangle de fond pour le bloc gauche
        doc.setFillColor(240, 240, 240); // Gris clair
        doc.rect(0, 0, leftWidth, pageHeight, "F"); // Couvrir le bloc gauche

        // Bloc gauche : Photo + Informations
        const marginLeft = 10;
        let yPosition = 10;

        // Gestion dynamique de l'écriture avec retour à la ligne
        const writeTextWithWrap = (text, x, y, maxWidth, lineHeight = 10) => {
            const lines = doc.splitTextToSize(text, maxWidth);
            lines.forEach(line => {
                doc.text(line, x, y);
                y += lineHeight;
            });
            return y;
        };

        // Photo de profil
        const img = new Image();
        img.src = data.image; // URL de l'image
        img.onload = () => {
            doc.addImage(img, "JPEG", marginLeft, yPosition, 50, 50); // Position et taille
            yPosition += 60;

            // Informations personnelles
            doc.setFontSize(12);
            doc.text("Informations :", marginLeft, yPosition);
            yPosition += 10;

            doc.setFontSize(10);
            yPosition = writeTextWithWrap(`Téléphone : ${data.phone}`, marginLeft, yPosition, leftWidth - 20);
            yPosition = writeTextWithWrap(`Email : ${data.email}`, marginLeft, yPosition, leftWidth - 20);

            // Profils sociaux
            doc.text("Profils :", marginLeft, yPosition);
            yPosition += 10;
            data.profiles.forEach(profile => {
                yPosition = writeTextWithWrap(`- ${profile.network}: ${profile.url}`, marginLeft, yPosition, leftWidth - 20);
            });

            // Bloc droit : Présentation et contenu principal
            const marginRight = leftWidth + 10; // Décalage à droite
            let rightYPosition = 10;

            // Présentation
            doc.setFont("helvetica", "bold");
            doc.setFontSize(16);
            rightYPosition = writeTextWithWrap(data.name, marginRight, rightYPosition, rightWidth, 12);

            doc.setFont("helvetica", "normal");
            doc.setFontSize(12);
            rightYPosition = writeTextWithWrap(data.label, marginRight, rightYPosition, rightWidth, 10);

            doc.setFontSize(10);
            rightYPosition = writeTextWithWrap(data.summary, marginRight, rightYPosition, rightWidth, 5);

            // Expériences professionnelles
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            rightYPosition += 10; // Espacement
            rightYPosition = writeTextWithWrap("Expériences professionnelles :", marginRight, rightYPosition, rightWidth, 10);

            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            data.work.forEach(work => {
                rightYPosition = writeTextWithWrap(`- ${work.position} à ${work.name} (${work.startDate} - ${work.endDate})`, marginRight, rightYPosition, rightWidth, 10);
                rightYPosition = writeTextWithWrap(`  ${work.summary}`, marginRight, rightYPosition, rightWidth, 10);
            });

            // Formations
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            rightYPosition += 10; // Espacement
            rightYPosition = writeTextWithWrap("Formations :", marginRight, rightYPosition, rightWidth, 10);

            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            data.education.forEach(education => {
                rightYPosition = writeTextWithWrap(`- ${education.studyType} en ${education.area} à ${education.institution} (${education.startDate} - ${education.endDate})`, marginRight, rightYPosition, rightWidth, 10);
            });

            // Enregistrement du fichier PDF
            const date = new Date().toISOString().split('T')[0];
            const fileName = `${data.name.replace(/\s+/g, '-').toLowerCase()}-resume-${date}.pdf`;
            doc.save(fileName);
        };

    } catch (error) {
        console.error("Erreur lors de la génération du PDF :", error);
    }
});
