import { useUser } from "@/context/UserContext";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function Navbar({ remainingUsage }) {
  const { user, isPremium } = useUser();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
      <Link href="/" className="text-xl font-bold text-black">
        ProdScript
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="flex flex-col text-sm text-gray-600">
              <div className="flex items-center gap-2">
                👋 {user.email}
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

              <div className="text-center mt-1">
                {isPremium ? (
                  <span className="text-green-600 font-semibold">
                    👑 Premium Kullanıcı – Sınırsız Kullanım
                  </span>
                ) : (
                  <span className="text-gray-500">
                    🔄 Kalan Hakkın: {remainingUsage}
                  </span>
                )}
              </div>
            </div>

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
    </nav>
  );
}
