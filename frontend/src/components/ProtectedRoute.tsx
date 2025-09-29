import { Navigate } from "react-router";
import { useState, useEffect, type JSX } from "react";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkAuth() {
      const res = await fetch(`${import.meta.env.VITE_ADDRESS}/user/me`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setLoggedIn(data.authenticated);
    }
    checkAuth();
  }, []);

  if (loggedIn === null) return <p>Loading...</p>; // waiting for auth check
  if (!loggedIn) return <Navigate to="/user/login" replace />;

  return children;
}

export default ProtectedRoute;