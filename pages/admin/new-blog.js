// pages/admin/new-blog.js
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Head from "next/head";

export default function NewBlog() {
  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const generateSlug = (title) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleGenerate = async () => {
    setLoading(true);
    setSuccess(false);

    // 🔥 GPT'den içerik al
    const res = await fetch("/api/blog-gpt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        keywords: keywords.split(",").map((k) => k.trim()),
      }),
    });

    const data = await res.json();
    if (!data?.content) {
      alert("GPT içerik üretimi başarısız oldu.");
      setLoading(false);
      return;
    }

    // 📦 Supabase'e kaydet
    const { error } = await supabase.from("blogs").insert({
      title,
      slug: generateSlug(title),
      excerpt: data.excerpt,
      content: data.content,
      keywords: data.keywords,
      cover_image: data.cover_image,
    });

    if (error) {
      console.error("🚫 Supabase hata:", error.message);
    } else {
      setSuccess(true);
      setTitle("");
      setKeywords("");
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Yeni Blog Oluştur | ProdScript</title>
      </Head>
      <main className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">📝 Yeni Blog Oluştur</h1>

        <input
          type="text"
          placeholder="Başlık"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="text"
          placeholder="Anahtar Kelimeler (virgülle)"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800"
        >
          {loading ? "Üretiliyor..." : "Blog Oluştur"}
        </button>

        {success && (
          <p className="text-green-600 font-semibold mt-4">
            ✅ Blog başarıyla oluşturuldu!
          </p>
        )}
      </main>
    </>
  );
}
