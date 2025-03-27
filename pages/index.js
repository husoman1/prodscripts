import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";
import useRedirectIfAuthenticated from "@/hooks/useRedirectIfAuthenticated";
import Head from "next/head";

export default function Login() {
  const router = useRouter();
  useRedirectIfAuthenticated();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/"); // başarılıysa anasayfaya
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Giriş Yap | ProdScript</title>
      </Head>

      <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md"
        >
          <h1 className="text-2xl font-bold mb-4 text-center">Giriş Yap</h1>

          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mb-3 p-3 border rounded"
          />

          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mb-3 p-3 border rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white p-3 rounded-xl font-semibold hover:bg-gray-800"
          >
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>

          <div className="text-sm text-center mt-4">
            <a href="/reset-password" className="text-blue-600 underline">
              Şifremi unuttum
            </a>{" "}
            |{" "}
            <a href="/register" className="text-blue-600 underline">
              Kayıt Ol
            </a>
          </div>
        </form>
      </main>
    </>
  );
}
