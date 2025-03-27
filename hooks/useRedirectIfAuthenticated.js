import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/context/UserContext";

export default function useRedirectIfAuthenticated() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (typeof window !== "undefined" && user) {
      router.replace("/");
    }
  }, [user, router]);
}
