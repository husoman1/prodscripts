import { useState, useEffect } from "react";
import Head from "next/head";
import { canUse, increaseUsage } from "@/lib/usageStore";
import { useUser } from "@/context/UserContext";
import Cookies from "js-cookie";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("tr");
  const [style, setStyle] = useState("seo");
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const isPremium = user?.user_metadata?.is_premium === true;

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
      alert("Günlük kullanım limitine ulaştınız. Premium’a geçin.");
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

    if (!isPremium) increaseUsage();
    setLoading(false);
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
            <div className="mt-6 bg-gray-50 p-4 rounded border">
              <p>{output}</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
