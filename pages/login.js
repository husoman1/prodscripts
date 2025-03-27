import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/lib/supabaseClient";

export default function Login() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/"); // login olduysa anasayfaya at
    }
  }, [user]);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "https://prodscripts.vercel.app", // PROD URL buraya!
      },
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Giriş Yap</h1>
        <p className="mb-6 text-gray-600">ProdScript’i kullanmak için GitHub ile giriş yap</p>
        <button
          onClick={handleLogin}
          className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800"
        >
          GitHub ile Giriş Yap
        </button>
      </div>
    </main>
  );
}
