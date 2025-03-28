import { useRouter } from "next/router";
import Head from "next/head";
import { supabase } from "@/lib/supabaseClient";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function getServerSideProps({ params }) {
  const { slug } = params;

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!data || error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      blog: data,
    },
  };
}

export default function BlogDetail({ blog }) {
  const router = useRouter();

  if (!blog) {
    return <p className="text-center mt-20">Yükleniyor...</p>;
  }

  return (
    <>
      <Head>
        <title>{blog.title} | ProdScript Blog</title>
        <meta name="description" content={blog.excerpt} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt} />
        <meta property="og:image" content={blog.cover_image} />
        <meta property="og:url" content={`https://prodscript.com/blogs/${blog.slug}`} />
        <meta property="og:type" content="article" />
      </Head>

      <main className="max-w-3xl mx-auto p-6 bg-white mt-10 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

        {blog.cover_image && (
          <img
            src={blog.cover_image}
            alt={blog.title}
            className="w-full rounded-xl mb-6"
          />
        )}

        <p className="text-gray-600 text-sm mb-4">
          Yayınlanma: {new Date(blog.created_at).toLocaleDateString("tr-TR")}
        </p>

        <div className="prose max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.content}</ReactMarkdown>
        </div>
      </main>
    </>
  );
}
