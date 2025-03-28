import Link from "next/link";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";
import { useUser } from "@/context/UserContext";

export default function Landing() {
  const { user } = useUser();

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="relative overflow-hidden bg-black text-white">
      {/* BACKGROUND PARTICLE EFFECT */}
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

        {/* DYNAMIC CTA BUTTON */}
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
