import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Head from "next/head";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/router";

export default function AdminBlogsPage() {
  const { user } = useUser();
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.user_metadata?.is_admin !== true) {
        router.push("/"); // admin değilse anasayfaya at
      }

    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("id, title, excerpt, cover_image, is_published, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("❌ Blogları çekme hatası:", error.message);
      } else {
        setBlogs(data);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, [user]);

  const handlePublish = async (id) => {
    const { error } = await supabase
      .from("blogs")
      .update({ is_published: true })
      .eq("id", id);

    if (error) {
      alert("Yayınlama hatası: " + error.message);
    } else {
      setBlogs((prev) =>
        prev.map((b) => (b.id === id ? { ...b, is_published: true } : b))
      );
    }
  };

  return (
    <>
      <Head>
        <title>Admin Blog Paneli | ProdScript</title>
      </Head>

      <main className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">📚 Blog İçerikleri</h1>

          {loading && <p>Yükleniyor...</p>}

          {!loading && blogs.length === 0 && (
            <p className="text-center text-gray-500">Henüz blog yazısı yok.</p>
          )}

          <div className="space-y-6">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white border rounded-xl p-4 shadow"
              >
                <div className="flex gap-4 items-center">
                  {blog.cover_image && (
                    <Image
                      src={blog.cover_image}
                      alt={blog.title}
                      width={100}
                      height={100}
                      className="rounded-xl object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{blog.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {new Date(blog.created_at).toLocaleString("tr-TR")}
                    </p>
                    <p className="text-gray-700 line-clamp-3 text-sm">
                      {blog.excerpt}
                    </p>
                  </div>
                  <div className="text-right space-y-2">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full inline-block ${
                        blog.is_published
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {blog.is_published ? "Yayında" : "Taslak"}
                    </span>
                    {!blog.is_published && (
                      <button
                        onClick={() => handlePublish(blog.id)}
                        className="block text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        Yayınla
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
