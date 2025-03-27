import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/context/UserContext";

export default function ResetPassword() {
  const router = useRouter();
  const { user } = useUser();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && user) {
      router.replace("/");
    }
  }, [user]);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Lütfen e-posta girin.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    setLoading(false);

    if (error) {
      alert("Bir hata oluştu: " + error.message);
    } else {
      alert("Şifre sıfırlama e-postası gönderildi.");
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Şifre Sıfırla</h2>
        <form onSubmit={handleReset}>
          <input
            type="email"
            required
            className="w-full border p-2 rounded mb-4"
            placeholder="E-posta adresiniz"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
          >
            {loading ? "Gönderiliyor..." : "E-posta Gönder"}
          </button>
        </form>
      </div>
    </div>
  );
}
