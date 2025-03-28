import "@/styles/globals.css";
import { UserProvider, useUser } from "@/context/UserContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Cookies from "js-cookie";
import { getRemainingUsage } from "@/lib/usageStore";

const protectedRoutes = ["/app", "/premium"];

function AuthGuard({ children }) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    const isProtected = protectedRoutes.includes(router.pathname);
    const isDemoUsed = Cookies.get("prodscript_demo");
    const allowDemo = !user && !isDemoUsed;

    if (!loading && isProtected && !user && !allowDemo) {
      router.push("/login");
    }
  }, [router.pathname, user, loading]);

  if (loading) return <div className="p-4 text-center">Yükleniyor...</div>;

  return children;
}

export default function App({ Component, pageProps }) {
  const [remainingUsage, setRemainingUsage] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const usage = getRemainingUsage();
      setRemainingUsage(usage);
    }
  }, []);

  return (
    <UserProvider>
      <AuthGuard>
        <Navbar remainingUsage={remainingUsage} />
        <Component {...pageProps} />
      </AuthGuard>
    </UserProvider>
  );
}
