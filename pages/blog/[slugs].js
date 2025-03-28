import { useRouter } from "next/router";
import Head from "next/head";
import { supabase } from "@/lib/supabaseClient";
import ReactMarkdown from "react-markdown";

export async function getStaticPaths() {
  const { data } = await supabase
    .from("blogs")
    .select("slug")
    .eq("is_published", true);

  const paths = (data || []).map((blog) => ({
    params: { slug: blog.slug },
  }));

  return {
    paths,
    fallback: "blocking", // yeni bloglar için beklet
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!data) {
    return { notFound: true };
  }

  return {
    props: { blog: data },
    revalidate: 60,
  };
}

export default function BlogDetail({ blog }) {
  const router = useRouter();

  if (router.isFallback) return <p>Yükleniyor...</p>;

  return (
    <>
      <Head>
        <title>{blog.title} | ProdScript Blog</title>
        <meta name="description" content={blog.excerpt} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt} />
        <meta property="og:image" content={blog.cover_image || "/favicon.png"} />
        <meta property="og:url" content={`https://prodscript.com/blogs/${blog.slug}`} />
        <meta property="og:type" content="article" />
      </Head>

      <main className="max-w-3xl mx-auto px-4 py-12">
        {blog.cover_image && (
          <img
            src={blog.cover_image}
            alt={blog.title}
            className="rounded-xl w-full mb-6 object-cover max-h-96"
          />
        )}

        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-500 mb-8">
          {new Date(blog.created_at).toLocaleDateString("tr-TR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <article className="prose prose-lg max-w-none prose-p:leading-8 prose-img:rounded-xl prose-a:text-blue-600">
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </article>
      </main>
    </>
  );
}
