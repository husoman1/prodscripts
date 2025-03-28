// pages/api/blog-gpt.js
import { OpenAIStream } from "@/lib/OpenAIStream";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { title, keywords = [] } = req.body;

  if (!title) return res.status(400).json({ error: "Başlık gerekli." });

  const keywordStr = keywords.join(", ");
  const prompt = `
Sen profesyonel bir içerik editörüsün. Aşağıdaki başlığa ve anahtar kelimelere göre SEO uyumlu, giriş-gelişme-sonuç yapısına sahip, %100 özgün bir blog yazısı üret:

Başlık: ${title}
Anahtar Kelimeler: ${keywordStr}

🔁 Dönüş formatı:
- excerpt: 2 cümlelik etkileyici özet
- content: HTML etiketli 1000+ kelimelik blog içeriği
- keywords: virgüllü anahtar kelime listesi
- cover_image: (görsel URL'si dummy olabilir)
`;

  // OpenAI'den veriyi al
  const response = await OpenAIStream([
    {
      role: "user",
      content: prompt,
    },
  ]);

  try {
    const raw = await response.text();
    const parsed = JSON.parse(raw);
    return res.status(200).json(parsed);
  } catch (e) {
    console.error("❌ GPT yanıt parse edilemedi:", e.message);
    return res.status(500).json({ error: "GPT yanıtı geçersiz." });
  }
}
