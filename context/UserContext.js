import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    // Oturum kontrolü
    supabase.auth.getSession().then(({ data }) => {
      const currentUser = data.session?.user || null;
      setUser(currentUser);
      setIsPremium(currentUser?.user_metadata?.is_premium === true);
    });

    // Auth değişiklik dinleyici
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user || null;
        setUser(currentUser);
        setIsPremium(currentUser?.user_metadata?.is_premium === true);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Refresh fonksiyonu (kullanabileceğin)
  const refreshUser = async () => {
    const { data } = await supabase.auth.getUser();
    if (data?.user) {
      console.error("🚫 user:", user);
      setUser(data.user);
      setIsPremium(data.user.user_metadata?.is_premium === true);
    }
  };

  return (
    <UserContext.Provider value={{ user, isPremium, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
export default UserContext;
