import "@/styles/globals.css";
import { UserProvider, useUser } from "@/context/UserContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Cookies from "js-cookie"; // 👈 cookie için ekledik

const protectedRoutes = ["/app", "/premium"];

function AuthGuard({ children }) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    const isProtected = protectedRoutes.includes(router.pathname);
    const isDemoUsed = Cookies.get("prodscript_demo"); // 👈 artık cookie üzerinden kontrol
    const allowDemo = !user && !isDemoUsed;

    if (!loading && isProtected && !user && !allowDemo) {
      router.push("/login");
    }
  }, [router.pathname, user, loading]);

  if (loading) return <div className="p-4 text-center">Yükleniyor...</div>;

  return children;
}

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <AuthGuard>
        <Navbar />
        <Component {...pageProps} />
      </AuthGuard>
    </UserProvider>
  );
}
