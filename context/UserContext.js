import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (data?.user) {
      setUser(data.user);
      setIsPremium(data.user.user_metadata?.is_premium === true);
      setIsAdmin(data.user.user_metadata?.is_admin === true);
    } else {
      setUser(null);
      setIsPremium(false);
      setIsAdmin(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        setIsPremium(session.user.user_metadata?.is_premium === true);
        setIsAdmin(session.user.user_metadata?.is_admin === true);
      } else {
        setUser(null);
        setIsPremium(false);
        setIsAdmin(false);
      }
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, isPremium, isAdmin, loading, refreshUser: fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
export default UserContext;
