import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/context/UserContext";
import Head from "next/head";

export default function HistoryPage() {
  const { user, isPremium } = useUser();
  const [logs, setLogs] = useState([]);
  const [promptCount, setPromptCount] = useState(0);
  const [savedMinutes, setSavedMinutes] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      if (!user || !isPremium) return;

      const { data, error } = await supabase
        .from("logs")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("⛔ Log çekme hatası:", error.message);
      } else {
        setLogs(data);
        setPromptCount(data.length);
        setSavedMinutes(data.length * 5); // her prompt ortalama 5dk kazandırdı
      }

      setLoading(false);
    };

    fetchLogs();
  }, [user, isPremium]);

  return (
    <>
      <Head>
        <title>Üretim Geçmişi | ProdScript</title>
        <meta name="description" content="GPT destekli AI ile saniyeler içinde profesyonel ürün açıklamaları oluştur." />
        <meta property="og:title" content="ProdScript | AI Ürün Açıklaması" />
        <meta property="og:description" content="GPT destekli AI ile saniyeler içinde profesyonel ürün açıklamaları oluştur." />
        <meta property="og:image" content="https://prodscript.com/og-cover.jpg" />
        <meta property="og:url" content="https://prodscript.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">📄 Üretim Geçmişin</h1>

          {!isPremium && (
            <p className="text-center text-red-500 font-medium">
              Bu sayfa sadece Premium kullanıcılar içindir.
            </p>
          )}

          {!loading && logs.length > 0 && (
            <div className="bg-white p-4 rounded-xl shadow mb-6 text-center">
              <p className="text-lg font-bold text-gray-800">
                🔢 Toplam {promptCount} üretim yaptın
              </p>
              <p className="text-sm text-gray-600 mt-1">
                ⏱ Yaklaşık {savedMinutes} dakika zaman kazandın 🎉
              </p>
            </div>
          )}

          {loading && <p className="text-center">Yükleniyor...</p>}

          {!loading && logs.length === 0 && (
            <p className="text-center text-gray-500">
              Henüz kayıt yok. Hadi bir açıklama üret 🎯
            </p>
          )}

          <div className="space-y-4">
            {logs.map((log) => (
              <div
                key={log.id}
                className="bg-white border rounded-xl p-4 shadow-sm"
              >
                <p className="text-sm text-gray-500 mb-2">
                  🕒 {new Date(log.created_at).toLocaleString("tr-TR")}
                </p>
                <p className="text-gray-800 font-medium mb-2">
                  <span className="text-sm text-gray-600 block">Prompt:</span>
                  {log.prompt}
                </p>
                <p className="text-gray-900 mb-2">
                  <span className="text-sm text-gray-600 block">Output:</span>
                  {log.output}
                </p>
                <div className="text-sm text-gray-500 flex gap-4 mb-2">
                  <span>🌐 Dil: {log.language?.toUpperCase()}</span>
                  <span>📝 Stil: {log.style}</span>
                </div>
                <div className="flex justify-end gap-4 mt-3">
                  <button
                    onClick={() => navigator.clipboard.writeText(log.output)}
                    className="text-sm text-blue-600 underline"
                  >
                    Kopyala
                  </button>
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="text-sm text-purple-600 underline"
                  >
                    Yeniden üret
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
