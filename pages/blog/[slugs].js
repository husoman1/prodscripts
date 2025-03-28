// pages/blogs/[slug].js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { supabase } from "@/lib/supabaseClient";

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .single();

      if (!error) setPost(data);
    };

    fetchPost();
  }, [slug]);

  if (!post) return <p className="p-6">Yükleniyor...</p>;

  return (
    <>
      <Head>
        <title>{post.title} | ProdScript Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.cover_image} />
        <meta property="og:type" content="article" />
      </Head>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <img
          src={post.cover_image}
          alt={post.title}
          className="rounded-xl w-full mb-6"
        />
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-500 italic mb-6">{post.excerpt}</p>
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </main>
    </>
  );
}
