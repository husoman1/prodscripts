import Link from "next/link";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";
import { useUser } from "@/context/UserContext";
import { motion } from "framer-motion";

const mockPosts = [
  {
    id: 1,
    title: "SEO Uyumlu Ürün Açıklamaları Nasıl Yazılır?",
    description: "GPT destekli metinlerle mağazanızı nasıl öne çıkarırsınız?",
  },
  {
    id: 2,
    title: "AI ile Satışları %40 Artırmanın Yolu",
    description: "Yapay zekayı e-ticaret süreçlerinize entegre etmenin 3 yolu.",
  },
  {
    id: 3,
    title: "E-Ticaret için En İyi Prompt Örnekleri",
    description: "AI'dan maksimum verim alabileceğiniz örnek prompt’lar.",
  },
];

export default function Landing() {
  const { user } = useUser();

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="relative overflow-hidden bg-black text-white">
      {/* PARTICLES BACKGROUND */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          particles: {
            number: { value: 60 },
            color: { value: "#9f7aea" },
            shape: { type: "circle" },
            opacity: { value: 0.3 },
            size: { value: 3 },
            move: { enable: true, speed: 1 },
          },
        }}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
          Ürün Açıklaması mı? AI halleder.
        </h1>
        <p className="mt-6 text-xl max-w-2xl text-gray-300">
          GPT destekli açıklama üretici ile mağazana saniyeler içinde profesyonel metinler oluştur.
        </p>

        {/* CTA BUTTONS */}
        <div className="mt-8 flex gap-4">
          {user ? (
            <Link
              href="/app"
              className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg hover:scale-105 transition"
            >
              🚀 Uygulamaya Git
            </Link>
          ) : (
            <>
              <Link
                href="/register"
                className="bg-white text-black px-6 py-3 rounded-full text-lg font-bold shadow hover:bg-gray-200"
              >
                Kayıt Ol
              </Link>
              <Link
                href="/app"
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg hover:scale-105 transition"
              >
                🔥 Try Once for Free
              </Link>
            </>
          )}
        </div>
      </section>

      {/* BLOG SLIDER */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <h2 className="text-3xl font-bold text-center mb-10">🧠 Son Yazılar</h2>
        <div className="overflow-x-auto flex gap-6 px-2">
          {mockPosts.map((post) => (
            <motion.div
              key={post.id}
              className="min-w-[300px] bg-gray-800 rounded-xl p-6 shadow hover:scale-105 transition"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <p className="text-gray-400 text-sm">{post.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ProdScript • AI Destekli Ürün Açıklamaları
      </footer>
    </div>
  );
}
