// src/components/PdfExportButton.js

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function PdfExportButton() {
  const handleExport = async () => {
    const element = document.getElementById("entire-page");
    if (!element) {
      alert("Element with ID 'entire-page' not found!");
      return;
    }

    // Esperar a que la imagen del usuario cargue (GitHub avatar)
    const img = element.querySelector("img");
    if (img && !img.complete) {
      await new Promise((resolve) => {
        img.onload = resolve;
      });
    }

    // Generar canvas con html2canvas y usarCORS habilitado
    const canvas = await html2canvas(element, {
      backgroundColor: null, // respeta modo oscuro
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");

    // Ajusta el tamaño si lo necesitas
    pdf.addImage(imgData, "PNG", 0, 0, 600, 0);
    pdf.save("my-portfolio.pdf");
  };

  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
    >
      Download PDF
    </button>
  );
}
