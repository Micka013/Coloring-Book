import { jsPDF } from "jspdf";

export async function generatePDF(
  name: string,
  theme: string,
  coverImage: string,
  pages: string[],
) {
  // A4 size is 210 x 297 mm
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Helper to add an image to the PDF
  const addImageToPdf = (imgData: string, isCover: boolean) => {
    // We want to center the image and fit it within the page, leaving some margin
    const margin = 15;
    const maxImgWidth = pageWidth - margin * 2;
    const maxImgHeight = pageHeight - margin * 2 - (isCover ? 40 : 0); // Leave space for title on cover

    // Assuming 3:4 aspect ratio from our generation
    const imgRatio = 3 / 4;

    let renderWidth = maxImgWidth;
    let renderHeight = renderWidth / imgRatio;

    if (renderHeight > maxImgHeight) {
      renderHeight = maxImgHeight;
      renderWidth = renderHeight * imgRatio;
    }

    const x = (pageWidth - renderWidth) / 2;
    const y = isCover ? margin + 30 : (pageHeight - renderHeight) / 2;

    doc.addImage(imgData, "PNG", x, y, renderWidth, renderHeight);
  };

  // 1. Cover Page
  // Add Title text at the top
  const title = `Le livre de coloriage de ${name}`;
  const subtitle = `Theme: ${theme}`;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  const titleWidth = doc.getTextWidth(title);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(16);
  const subtitleWidth = doc.getTextWidth(subtitle);

  doc.setTextColor(30, 41, 59); // slate-800
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.text(title, pageWidth / 2, 25, { align: "center" });

  doc.setTextColor(100, 116, 139); // slate-500
  doc.setFont("helvetica", "normal");
  doc.setFontSize(16);
  doc.text(subtitle, pageWidth / 2, 35, { align: "center" });

  addImageToPdf(coverImage, true);

  // 2. Coloring Pages
  for (let i = 0; i < pages.length; i++) {
    doc.addPage();
    addImageToPdf(pages[i], false);
  }

  // Download
  doc.save(`coloriage-${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}.pdf`);
}
