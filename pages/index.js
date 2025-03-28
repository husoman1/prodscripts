// pages/index.js
import Link from "next/link";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";
import { useUser } from "@/context/UserContext";
import { motion } from "framer-motion";
import Lottie from "@/components/LottieOnlyClient";
import aiAnimation from "../src/animations/ai.json";

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
      {/* PARTICLES */}
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
        className="absolute top-0 left-0 w-full h-full z-[-1] pointer-events-none"

      />

      {/* HERO */}
      <section className="min-h-screen flex flex-col md:flex-row justify-center items-center text-center px-6 relative z-10 gap-12">
        <div className="md:w-1/2">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Ürün Açıklaması mı? <br /> AI halleder.
          </h1>
          <p className="mt-6 text-xl max-w-xl mx-auto text-gray-300">
            GPT destekli açıklama üretici ile mağazana saniyeler içinde profesyonel metinler oluştur.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            {user ? (
              <Link href="/app" className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg hover:scale-105 transition">
                🚀 Uygulamaya Git
              </Link>
            ) : (
              <>
                <Link href="/register" className="bg-white text-black px-6 py-3 rounded-full text-lg font-bold shadow hover:bg-gray-200">
                  Kayıt Ol
                </Link>
                <Link href="/app" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg hover:scale-105 transition">
                  🔥 Try Once for Free
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="md:w-1/2">
          <Lottie animationData={aiAnimation} loop className="w-full max-w-md mx-auto" />
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6 text-white bg-gradient-to-b from-black to-gray-900">
        <h2 className="text-3xl font-bold text-center mb-12">✨ Özellikler</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "⚡ Anında Üretim",
              desc: "GPT destekli altyapı sayesinde açıklamanız 10 saniyede hazır.",
            },
            {
              title: "🎯 Tarz Seçimi",
              desc: "SEO, sade, eğlenceli gibi farklı metin tarzları oluşturun.",
            },
            {
              title: "🌍 Çok Dilli Destek",
              desc: "Türkçe ve İngilizce açıklama üretin, global pazarlara ulaşın.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 rounded-xl p-6 shadow hover:scale-105 transition"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BLOGS */}
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

      {/* TESTIMONIALS */}
      <section className="py-20 px-6 bg-black text-white">
        <h2 className="text-3xl font-bold text-center mb-12">⭐ Kullanıcı Yorumları</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              name: "Ahmet Yılmaz",
              title: "Shopify Satıcısı",
              comment: "ProdScript sayesinde açıklama yazmaya saatler harcamıyorum. Satışlarım %30 arttı.",
              country: "🇹🇷",
            },
            {
              name: "Elena Rossi",
              title: "Etsy Dükkan Sahibi",
              comment: "AI açıklamaları hem SEO uyumlu hem de yaratıcı. Bayıldım!",
              country: "🇮🇹",
            },
            {
              name: "Mark Johnson",
              title: "Amazon Private Label",
              comment: "Her ürünüm için açıklamaları otomatik alıyorum. Premium kesinlikle değer.",
              country: "🇺🇸",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow hover:scale-105 transition"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-2xl mb-2">{item.country}</div>
              <p className="text-gray-300 italic mb-4">“{item.comment}”</p>
              <p className="font-bold">{item.name}</p>
              <p className="text-sm text-gray-500">{item.title}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 px-6 bg-gray-950 text-white text-center">
        <h2 className="text-3xl font-bold mb-12">💸 Paket Karşılaştırması</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold mb-4">🚀 Ücretsiz</h3>
            <ul className="text-left text-sm space-y-2">
              <li>✅ Günde 3 hak</li>
              <li>✅ Türkçe & İngilizce</li>
              <li>✅ SEO + Basit + Eğlenceli stil</li>
              <li>❌ Geçmiş kayıt</li>
              <li>❌ QR ile paylaşım</li>
            </ul>
            <p className="text-2xl font-bold my-6">0₺</p>
            <Link href="/register" className="bg-white text-black py-2 px-6 rounded-full font-semibold hover:bg-gray-200">
              Kayıt Ol
            </Link>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-b from-purple-800 to-indigo-900 p-8 rounded-xl border border-purple-500 shadow-lg">
            <h3 className="text-xl font-bold mb-4">💎 Premium</h3>
            <ul className="text-left text-sm space-y-2">
              <li>✅ Sınırsız kullanım</li>
              <li>✅ Tüm stiller</li>
              <li>✅ Geçmişi gör</li>
              <li>✅ QR ile açıklama paylaş</li>
              <li>✅ Blog & SEO asistanı</li>
            </ul>
            <p className="text-2xl font-bold my-6">49₺ / ay</p>
            <Link href="/premium" className="bg-white text-black py-2 px-6 rounded-full font-semibold hover:bg-gray-200">
              Premium’a Geç
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 text-center bg-gradient-to-r from-purple-800 via-fuchsia-900 to-indigo-900 text-white">
        <h2 className="text-3xl font-bold mb-4">🚀 Hazırsan Başlayalım</h2>
        <p className="mb-8 text-lg text-gray-300">Ücretsiz demo hakkını kullan veya direkt uygulamaya geç.</p>
        <Link href="/app" className="inline-block bg-white text-black px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:animate-pulse transition">
          Şimdi Dene
        </Link>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-black py-20 px-6 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">📬 Bültenimize Katıl</h2>
        <p className="text-gray-400 mb-6 max-w-xl mx-auto">
          AI e-ticaret dünyasındaki gelişmeleri ve özel ipuçlarını kaçırma. Mail listemize katıl, GPT’yi senin için çalıştıralım!
        </p>
        <form
          action="https://YOUR-CONVERTKIT-URL" // TODO: BURAYA kendi ConvertKit URL'ini koy!
          method="POST"
          target="_blank"
          className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-xl mx-auto"
        >
          <input
            type="email"
            name="email_address"
            required
            placeholder="E-posta adresin"
            className="w-full md:w-auto flex-1 px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-2 rounded font-bold hover:scale-105 transition"
          >
            Katıl
          </button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ProdScript • AI Destekli Ürün Açıklamaları
      </footer>
    </div>
  );
}
