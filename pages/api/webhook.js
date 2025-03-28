import { supabaseAdmin } from "@/lib/supabaseAdmin";
import crypto from "crypto";

export const config = {
  api: {
    bodyParser: false, // Ham body'yi yakalayabilmek için
  },
};

// Raw body'yi almak için helper
const buffer = async (readable) => {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const rawBody = await buffer(req);
  const signature = req.headers["x-signature"];
  const secret = process.env.LEMON_WEBHOOK_SECRET;

  // 🔐 Signature doğrulama
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  if (signature !== expectedSignature) {
    return res.status(401).json({ error: "Geçersiz imza" });
  }

  const event = JSON.parse(rawBody.toString());
  const eventName = event?.meta?.event_name;
  const email = event?.data?.customer_email;

  if (!email || !eventName) return res.status(400).json({ error: "Eksik veri" });

  const validEvents = ["subscription_created", "subscription_updated", "subscription_renewed"];
  if (!validEvents.includes(eventName)) return res.status(200).json({ message: "Olay geçerli değil" });

  const { data: user, error } = await supabaseAdmin
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

  if (!user || error) {
    console.error("Kullanıcı bulunamadı", email, error?.message);
    return res.status(404).json({ error: "Kullanıcı bulunamadı" });
  }

  const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
    user_metadata: { is_premium: true },
  });

  if (updateError) {
    console.error("Güncelleme hatası:", updateError.message);
    return res.status(500).json({ error: "Güncelleme başarısız" });
  }

  return res.status(200).json({ success: true });
}
