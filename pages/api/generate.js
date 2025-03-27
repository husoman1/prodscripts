export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }
  
    const { input, language, style } = req.body;
  
    const promptMap = {
      seo: {
        tr: `Aşağıdaki ürün bilgisine göre SEO uyumlu ve etkileyici bir ürün açıklaması yaz:\n\nÜrün: ${input}`,
        en: `Write an SEO-optimized and engaging product description for the following product:\n\nProduct: ${input}`,
      },
      simple: {
        tr: `Aşağıdaki ürünü basit ve sade bir dille açıkla:\n\nÜrün: ${input}`,
        en: `Describe the following product in a simple and clear way:\n\nProduct: ${input}`,
      },
      fun: {
        tr: `Aşağıdaki ürün için eğlenceli ve yaratıcı bir açıklama yaz:\n\nÜrün: ${input}`,
        en: `Write a fun and creative product description for the following product:\n\nProduct: ${input}`,
      },
    };
  
    const prompt = promptMap[style]?.[language] || promptMap.seo.tr;
  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      });
  
      const data = await response.json();
      const output = data.choices?.[0]?.message?.content || "Açıklama üretilemedi.";
  
      res.status(200).json({ output });
    } catch (err) {
      console.error("API ERROR:", err);
      res.status(500).json({ message: "Bir hata oluştu." });
    }
  }
  