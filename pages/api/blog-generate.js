import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Başlık gerekli." });
  }

  try {
    // 1. GPT: Excerpt üret
    const excerptResponse = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Sen çok iyi bir içerik yazarısın.",
        },
        {
          role: "user",
          content: `Lütfen '${title}' başlığı için 1 paragraflık etkileyici, SEO uyumlu blog özeti (excerpt) yaz.`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    const excerpt = excerptResponse.choices[0].message.content;

    // 2. GPT: Blog içeriği üret
    const contentResponse = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Sen çok iyi bir blog yazarı ve SEO uzmanısın. İçeriğin kolay okunur, markdown formatında ve detaylı olur.",
        },
        {
          role: "user",
          content: `Lütfen '${title}' başlığı için uzun, detaylı, markdown formatında bir blog yazısı oluştur.`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    const content = contentResponse.choices[0].message.content;

    // 3. GPT: Cover image prompt oluştur
    const imagePrompt = `realistic photo, cover image for blog titled '${title}', modern style, 4k, vibrant`;

    // 4. DALL·E ile görsel üret
    const image = await openai.images.generate({
      prompt: imagePrompt,
      n: 1,
      size: "1024x1024",
    });

    const cover_image = image.data[0].url;

    return res.status(200).json({
      excerpt,
      content,
      cover_image,
    });
  } catch (error) {
    console.error("🚨 Blog üretim hatası:", error.message);
    return res.status(500).json({ error: "İçerik üretilemedi." });
  }
}
