import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/context/UserContext";

export default function Login() {
  const router = useRouter();
  const { user } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && user) {
      router.replace("/");
    }
  }, [user]);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Hatalı e-posta veya şifre.");
    } else {
      router.push("/");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Giriş Yap</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            required
            className="w-full border p-2 rounded mb-2"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            className="w-full border p-2 rounded mb-2"
            placeholder="Şifre (min. 6 karakter)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
          >
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        <div className="text-sm text-center mt-4">
          <a href="/reset-password" className="text-blue-500 underline">
            Şifremi unuttum
          </a>{" "}
          |{" "}
          <a href="/register" className="text-blue-500 underline">
            Kayıt Ol
          </a>
        </div>
      </div>
    </div>
  );
}
