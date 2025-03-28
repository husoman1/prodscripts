import Head from "next/head";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export async function getStaticProps() {
  const { data, error } = await supabase
    .from("blogs")
    .select("title, slug, excerpt, cover_image, created_at")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("🔥 Blog getirme hatası:", error.message);
  }

  console.log("📄 getStaticProps → blog slug'ları:");
  (data || []).forEach((blog) =>
    console.log(`👉 ${blog.title} → ${blog.slug}`)
  );

  return {
    props: {
      blogs: data || [],
    },
    revalidate: 60,
  };
}

export default function BlogListPage({ blogs }) {
  console.log("🧠 Render edilen blog sayısı:", blogs.length);

  return (
    <>
      <Head>
        <title>Bloglar | ProdScript</title>
        <meta
          name="description"
          content="E-ticaret, ürün açıklamaları ve yapay zeka hakkında en güncel yazılar. ProdScript Blog!"
        />
        <meta property="og:title" content="ProdScript Blog" />
        <meta property="og:description" content="AI destekli e-ticaret içerikleri, SEO tüyoları ve daha fazlası." />
        <meta property="og:image" content="/favicon.png" />
        <meta property="og:url" content="https://prodscript.com/blogs" />
        <meta property="og:type" content="website" />
      </Head>

      <main className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-10">🧠 Blog Yazıları</h1>

        {blogs.length === 0 && (
          <p className="text-center text-gray-500">Henüz içerik yok</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map((blog) => {
            const encodedSlug = encodeURIComponent(blog.slug);
            console.log(`🔗 Link oluşturuluyor: /blogs/${encodedSlug}`);

            return (
              <div
                key={blog.slug}
                className="bg-white shadow rounded-xl p-4 border hover:shadow-lg transition"
              >
                {blog.cover_image && (
                  <img
                    src={blog.cover_image}
                    alt={blog.title}
                    className="rounded-xl h-48 object-cover w-full mb-4"
                  />
                )}
                <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                <p className="text-gray-600 text-sm mb-4">{blog.excerpt}</p>
                <Link
                  href={`/blogs/${encodedSlug}`}
                  className="text-sm text-purple-600 underline font-semibold"
                >
                  Devamını Oku →
                </Link>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
