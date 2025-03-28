import { useEffect } from "react";

export default function MailListForm() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://f.convertkit.com/ckjs/ck.5.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section className="py-20 px-6 text-white bg-black text-center">
      <h2 className="text-3xl font-bold mb-6">📬 Bültenimize Katıl</h2>
      <p className="text-gray-400 mb-8 max-w-xl mx-auto">
        AI e-ticaret tüyoları, yeni özellikler ve gizli kampanyalar ilk senin mailinde olsun.
      </p>

      {/* Embed form */}
      <form
        action="https://app.kit.com/forms/7851233/subscriptions"
        className="seva-form formkit-form"
        method="post"
        data-sv-form="7851233"
        data-uid="f56ffbbc1a"
        data-format="inline"
        data-version="5"
        min-width="400 500 600 700 800"
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        <input
          type="email"
          name="email_address"
          placeholder="Email adresin"
          required
          className="text-black p-3 rounded w-full mb-4"
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded"
        >
          Abone Ol
        </button>
      </form>
    </section>
  );
}
