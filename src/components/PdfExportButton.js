import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useState } from "react";

export default function PdfExportButton() {
  const [saving, setSaving] = useState(false);

  const handleExport = async () => {
    setSaving(true);

    const element = document.getElementById("entire-page");
    if (!element) {
      alert("Element with ID 'entire-page' not found!");
      setSaving(false);
      return;
    }

    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    let username = "my-portfolio";

    if (token) {
      try {
        const res = await fetch("https://api.github.com/user", {
          headers: {
            Authorization: `token ${token}`,
            Accept: "application/vnd.github.v3+json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          username = data.login || username;
        } else {
          console.warn("Failed to fetch GitHub user info.");
        }
      } catch (err) {
        console.error("Error fetching GitHub user:", err);
      }
    } else {
      console.warn("GitHub token is missing.");
    }

    const qrSvgs = element.querySelectorAll("svg");
    const replacements = [];

    qrSvgs.forEach((qrSvg) => {
      const xml = new XMLSerializer().serializeToString(qrSvg);
      const svg64 = btoa(unescape(encodeURIComponent(xml)));
      const imageSrc = `data:image/svg+xml;base64,${svg64}`;

      const imgTag = document.createElement("img");
      imgTag.src = imageSrc;
      imgTag.style.width = qrSvg.getBoundingClientRect().width + "px";
      imgTag.style.height = qrSvg.getBoundingClientRect().height + "px";

      qrSvg.parentNode.replaceChild(imgTag, qrSvg);
      replacements.push({ imgTag, qrSvg });
    });

    const canvas = await html2canvas(element, {
      backgroundColor: null,
      useCORS: true,
      scale: 1.2,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let position = 0;
    let remainingHeight = imgHeight;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    remainingHeight -= pageHeight;
    position -= pageHeight;

    while (remainingHeight > 0) {
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      remainingHeight -= pageHeight;
      position -= pageHeight;
    }

    replacements.forEach(({ imgTag, qrSvg }) => {
      imgTag.parentNode.replaceChild(qrSvg, imgTag);
    });

    const fileName = `${username}-portfolio.pdf`;
    pdf.save(fileName);

    setSaving(false);
  };

  return (
    <button
      onClick={handleExport}
      disabled={saving}
      className={`px-4 py-2 ${
        saving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
      } text-white rounded shadow transition`}
    >
      {saving ? "Saving..." : "Download PDF"}
    </button>
  );
}
