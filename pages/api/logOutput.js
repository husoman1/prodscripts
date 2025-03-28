import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { user_id, prompt, output } = req.body;

  if (!user_id || !prompt || !output) {
    return res.status(400).json({ error: "Eksik veri" });
  }

  const { error } = await supabase
    .from("logs")
    .insert({ user_id, prompt, output });

  if (error) {
    console.error("Log kaydetme hatası:", error.message);
    return res.status(500).json({ error: "Kayıt başarısız" });
  }

  res.status(200).json({ success: true });
}
