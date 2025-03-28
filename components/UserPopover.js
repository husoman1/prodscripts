import { useState } from "react";

export default function UserPopover({ user, isPremium }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-sm text-gray-700 font-medium hover:underline"
      >
        👤 {user.email}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded-xl shadow-xl p-4 z-50">
          <p className="text-sm text-gray-800 font-semibold mb-1">
            📧 {user.email}
          </p>
          <p className="text-sm mb-2">
            {isPremium ? (
              <span className="text-green-600">👑 Premium Kullanıcı</span>
            ) : (
              <span className="text-gray-500">🆓 Ücretsiz Kullanıcı</span>
            )}
          </p>

          {/* Gelecekte: Üretim sayısı / zaman kazanımı vs */}
          <div className="text-xs text-gray-500 border-t pt-2">
            Yakında: ⏳ Kaç prompt ürettin, ne kadar zaman kazandın, en çok hangi tarz?
          </div>
        </div>
      )}
    </div>
  );
}
