import { useState } from "react";
import Head from "next/head";
import { canUse, increaseUsage } from "@/lib/usageStore";
import { useUser } from "@/context/UserContext";
import Cookies from "js-cookie";
import QRModal from "@/components/QRModal";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("tr");
  const [style, setStyle] = useState("seo");
  const [loading, setLoading] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const { user, isPremium } = useUser();

  const handleGenerate = async () => {
    const isDemoUsed = Cookies.get("prodscript_demo");

    if (!user && isDemoUsed) {
      alert("Demo hakkını zaten kullandın. Giriş yap veya kayıt ol.");
      return;
    }

    if (!user && !isDemoUsed) {
      Cookies.set("prodscript_demo", "used", { expires: 7 });
    }

    if (!user && !canUse()) {
      alert("Giriş yapmadan günlük kullanım limitine ulaştın.");
      return;
    }

    if (user && !isPremium && !canUse()) {
      setShowAdModal(true);
      return;
    }

    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input, language, style }),
    });

    const data = await res.json();
    setOutput(data.output);
    setLoading(false);

    // ✅ DETAYLI LOG KAYDI
    if (user) {
      console.log("📦 LOG DATA:", {
        user_id: user.id,
        user_email: user.email,
        prompt: input,
        output: data.output,
        style,
        language,
      });

      const { error } = await supabase.from("logs").insert({
        user_id: user.id,
        prompt: input,
        output: data.output,
        style,
        language,
        created_at: new Date().toISOString(), // ekstra güvenlik
      });

      if (error) {
        console.error("🧨 Log kaydedilemedi:", error.message);
      } else {
        console.log("✅ Log başarıyla kaydedildi.");
      }
    }

    if (!isPremium) increaseUsage();
  };

  return (
    <>
      <Head>
        <title>ProdScript | AI Ürün Açıklaması Yazıcı</title>
      </Head>

      <main className="min-h-screen bg-gray-100 p-4">
        <a
          href="/premium"
          className="block text-right text-blue-600 text-sm underline mb-2"
        >
          Premium’a Geç
        </a>

        <div className="max-w-xl mx-auto bg-white shadow-xl p-6 rounded-2xl">
          <h1 className="text-2xl font-bold mb-4 text-center">ProdScript</h1>

          <textarea
            className="w-full p-3 border rounded mb-4"
            rows={4}
            placeholder="Ürünü kısaca tanıt (örnek: El yapımı sabun, lavanta kokulu, vegan)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <div className="flex justify-between gap-4 mb-4">
            <select
              className="w-1/2 p-2 border rounded"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="tr">Türkçe</option>
              <option value="en">English</option>
            </select>

            <select
              className="w-1/2 p-2 border rounded"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            >
              <option value="seo">SEO Uyumlu</option>
              <option value="simple">Basit</option>
              <option value="fun">Eğlenceli</option>
            </select>
          </div>

          <button
            className="w-full bg-black text-white p-3 rounded-xl font-semibold hover:bg-gray-800"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Üretiliyor..." : "Açıklama Üret"}
          </button>

          {output && (
            <div className="mt-6 bg-gray-50 p-4 rounded border relative">
              <p>{output}</p>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(output);
                    alert("Açıklama kopyalandı!");
                  }}
                  className="text-sm text-blue-600 underline"
                >
                  Kopyala
                </button>

                <button
                  onClick={() => setShowQR(true)}
                  className="text-sm text-purple-600 underline"
                >
                  QR ile Paylaş
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 🧲 Reklam Modalı */}
      {showAdModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-2">Üretim hakkın tükendi!</h2>
            <p className="mb-4">
              Premium’a geçerek sınırsız kullanımın keyfini çıkarabilir veya aşağıdaki fırsata göz atabilirsin:
            </p>
            <iframe
              src="https://your-affiliate-link.com"
              className="w-full h-40 mb-4 border rounded"
            ></iframe>
            <a
              href="/premium"
              className="inline-block bg-black text-white px-4 py-2 rounded-xl font-semibold hover:bg-gray-800"
            >
              Premium’a Geç
            </a>
            <button
              className="block text-sm text-gray-500 mt-4 underline mx-auto"
              onClick={() => setShowAdModal(false)}
            >
              Kapat
            </button>
          </div>
        </div>
      )}

      {/* 🔳 QR Modal */}
      {showQR && <QRModal value={output} onClose={() => setShowQR(false)} />}
    </>
  );
}
