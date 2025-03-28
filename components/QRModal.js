import { QRCodeCanvas } from "qrcode.react";

export default function QRModal({ value, onClose }) {
  if (!value) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full text-center">
        <h2 className="text-xl font-bold mb-4">QR ile Paylaş</h2>
        <QRCodeCanvas value={value} size={200} />
        <p className="text-gray-600 text-sm mt-4">Telefonla taratarak açıklamayı paylaş!</p>
        <button
          className="mt-6 text-sm text-blue-600 underline"
          onClick={onClose}
        >
          Kapat
        </button>
      </div>
    </div>
  );
}
