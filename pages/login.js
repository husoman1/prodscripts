import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (!error) setSent(true);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-xl w-96">
        <h1 className="text-2xl font-bold mb-4">Giriş Yap</h1>
        {sent ? (
          <p>Giriş bağlantısı e-posta adresine gönderildi.</p>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              className="w-full p-3 border rounded"
              type="email"
              placeholder="E-posta adresin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              className="w-full bg-black text-white p-3 rounded-xl font-semibold hover:bg-gray-800"
              type="submit"
            >
              Giriş Bağlantısı Gönder
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
