import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";
import useRedirectIfAuthenticated from "@/hooks/useRedirectIfAuthenticated";

export default function Login() {
  useRedirectIfAuthenticated();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Hatalı e-posta veya şifre.");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Giriş Yap</h2>
        <input
          className="w-full border p-2 rounded mb-2"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded mb-2"
          placeholder="Şifre"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
          onClick={handleLogin}
        >
          Giriş Yap
        </button>

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
