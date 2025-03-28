export default function Premium() {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-xl shadow-xl w-96 text-center">
          <h1 className="text-2xl font-bold mb-4">ProdScript Premium</h1>
          <p className="mb-4">Sınırsız üretim, reklamsız kullanım, ekstra modlar</p>
          <a
            href="https://yourstore.lemonsqueezy.com/checkout/p/ürün-id"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-4 py-2 rounded-xl inline-block hover:bg-gray-800"
          >
            Premium’a Geç
          </a>
        </div>
      </div>
    );
  }
  
  useEffect(() => {
    refreshUser();
  }, []);
  