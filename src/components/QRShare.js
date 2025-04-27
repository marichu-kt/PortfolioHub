// src/components/QRShare.js

import QRCode from "react-qr-code";

export default function QRShare() {
  const url = "https://your-portfolio-domain.com/username";

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-2">Share this portfolio!</h2>
      <div className="inline-block bg-white dark:bg-gray-800 p-4 rounded-md">
        <QRCode value={url} />
      </div>
    </div>
  );
}
