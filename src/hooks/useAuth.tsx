import { useEffect, useState } from "react";
import { api, setToken, getToken } from "@/api/client";

export const useAuth = () => {
  const [user, setUser] = useState<{
    id: string;
    email: string;
    fullName: string;
    roles: string[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    api.auth.me()
      .then((data) => {
        setUser({ id: data.id, email: data.email, fullName: data.fullName, roles: data.roles });
        setIsAdmin(data.roles.includes("ADMIN"));
      })
      .catch(() => {
        setToken(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const signOut = () => {
    setToken(null);
    setUser(null);
    setIsAdmin(false);
  };

  return { user, loading, isAdmin, signOut };
};
