import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import useRedirectIfAuthenticated from "@/hooks/useRedirectIfAuthenticated";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    useRedirectIfAuthenticated();

    if (password !== confirmPassword) {
      alert("Şifreler eşleşmiyor.");
      return;
    }

    if (password.length < 6) {
      alert("Şifre en az 6 karakter olmalı.");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Kayıt başarılı. Mailini kontrol et.");
    }
    router.push("/login");

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Kayıt Ol</h2>
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
        <input
          className="w-full border p-2 rounded mb-4"
          placeholder="Şifre (Tekrar)"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
          onClick={handleRegister}
        >
          Kayıt Ol
        </button>
      </div>
    </div>
  );
}
