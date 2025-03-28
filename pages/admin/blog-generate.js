import { useState, useEffect } from "react";
import Head from "next/head";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/router";

export default function BlogGeneratePage() {
  const { user, isAdmin, loading } = useUser();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [generated, setGenerated] = useState(false);

 
  useEffect(() => {
    console.error("🚫 user:", user);
    if (!loading && (!user || !isAdmin)) {
        router.push("/"); // Admin değilse gönder
      }
  }, [user,isAdmin,loading]);

  const handleGenerate = async () => {
    setLoading(true);

    const res = await fetch("/api/blog-generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    const data = await res.json();
    setExcerpt(data.excerpt);
    setContent(data.content);
    setGenerated(true);
    setLoading(false);
  };

  const handlePublish = async () => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9ğüşıöç\s-]/gi, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    const { error } = await supabase.from("blogs").insert({
      title,
      slug,
      excerpt,
      content,
      is_published: true,
    });

    if (error) {
      alert("Hata oluştu: " + error.message);
    } else {
      alert("Blog başarıyla yayınlandı!");
      setTitle("");
      setExcerpt("");
      setContent("");
      setGenerated(false);
    }
  };

  return (
    <>
      <Head>
        <title>Blog Oluştur | Admin</title>
      </Head>

      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">✍️ Blog Oluştur (Admin)</h1>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Başlık gir"
          className="w-full p-3 border rounded mb-4"
        />

        <button
          onClick={handleGenerate}
          disabled={loading || !title}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          {loading ? "Üretiliyor..." : "GPT ile Oluştur"}
        </button>

        {generated && (
          <div className="mt-6 space-y-4">
            <div className="bg-gray-100 p-4 rounded">
              <p className="text-sm text-gray-500">Özet:</p>
              <p>{excerpt}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <p className="text-sm text-gray-500">İçerik:</p>
              <p>{content}</p>
            </div>

            <button
              onClick={handlePublish}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              ✅ Yayınla
            </button>
          </div>
        )}
      </main>
    </>
  );
}
