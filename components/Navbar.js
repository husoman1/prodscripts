import { useUser } from "@/context/UserContext";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import UserPopover from "@/components/UserPopover";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // ikonlar için

export default function Navbar({ remainingUsage }) {
  const { user, isPremium } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow px-6 py-4">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-black">
          ProdScript
        </Link>

        {/* Mobil Menü Butonu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-black"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menü */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <div className="flex flex-col text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  👋 <UserPopover user={user} isPremium={isPremium} />
                  {isPremium ? (
                    <span className="ml-1 text-xs bg-yellow-400 text-black px-2 py-1 rounded">
                      Premium 👑
                    </span>
                  ) : (
                    <span className="ml-1 text-xs text-gray-500">
                      Bugün {remainingUsage} hakkın kaldı
                    </span>
                  )}
                </div>
              </div>
              <Link href="/history" className="text-sm text-blue-600 underline">
                📄 Geçmişim
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
              >
                Çıkış Yap
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm text-blue-600 underline">
                Giriş Yap
              </Link>
              <Link href="/register" className="text-sm text-blue-600 underline">
                Kayıt Ol
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobil Menü Açık Hali */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-2 border-t pt-4">
          {user ? (
            <>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                👋 <UserPopover user={user} isPremium={isPremium} />
                {isPremium ? (
                  <span className="text-xs bg-yellow-400 text-black px-2 py-1 rounded">
                    Premium 👑
                  </span>
                ) : (
                  <span className="text-xs text-gray-500">
                    Bugün {remainingUsage} hakkın kaldı
                  </span>
                )}
              </div>
              <Link href="/history" className="text-blue-600 text-sm underline">
                📄 Geçmişim
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
              >
                Çıkış Yap
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm text-blue-600 underline">
                Giriş Yap
              </Link>
              <Link href="/register" className="text-sm text-blue-600 underline">
                Kayıt Ol
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
