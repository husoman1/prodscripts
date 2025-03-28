// pages/blogs/index.js
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Head from "next/head";
import Link from "next/link";

export default function BlogListPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) setBlogs(data);
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <Head>
        <title>Blog | ProdScript</title>
        <meta name="description" content="AI destekli e-ticaret bloglarıyla satışlarını artır." />
        <meta property="og:title" content="ProdScript Blog" />
        <meta property="og:description" content="Yapay zeka ile satış artıran e-ticaret blogları." />
        <meta property="og:image" content="https://prodscript.com/og-cover.png" />
      </Head>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">🧠 AI Bloglar</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((post) => (
            <Link
              key={post.id}
              href={`/blogs/${post.slug}`}
              className="block bg-white rounded-xl shadow hover:scale-105 transition p-4 border"
            >
              <img
                src={post.cover_image}
                alt={post.title}
                className="rounded-md w-full h-48 object-cover mb-4"
              />
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 text-sm">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
