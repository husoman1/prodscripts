import "@/styles/globals.css";
import { UserProvider, useUser } from "@/context/UserContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

function AuthGuard({ children }) {
  const router = useRouter();
  const { user, loading } = useUser();

  // Giriş gerektiren sayfalar
  const protectedRoutes = ["/", "/premium"];

  useEffect(() => {
    const isProtected = protectedRoutes.includes(router.pathname);

    if (!loading && isProtected && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) return <div className="p-4 text-center">Yükleniyor...</div>;

  return children;
}

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <AuthGuard>
        <Component {...pageProps} />
      </AuthGuard>
    </UserProvider>
  );
}
