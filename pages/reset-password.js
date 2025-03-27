import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import useRedirectIfAuthenticated from "@/hooks/useRedirectIfAuthenticated";


export default function ResetPassword() {
    useRedirectIfAuthenticated();

  const [email, setEmail] = useState("");

  const handleReset = async () => {
    if (!email) {
      alert("Lütfen e-posta girin.");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      alert("Bir hata oluştu: " + error.message);
    } else {
      alert("Şifre sıfırlama e-postası gönderildi.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Şifre Sıfırla</h2>
        <input
          className="w-full border p-2 rounded mb-4"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
          onClick={handleReset}
        >
          E-posta Gönder
        </button>
      </div>
    </div>
  );
}
