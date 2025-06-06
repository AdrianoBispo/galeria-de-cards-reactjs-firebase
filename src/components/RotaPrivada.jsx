import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { Spinner } from "@material-tailwind/react";

export function RotaPrivada({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Limpa o listener quando o componente desmonta
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner className="h-16 w-16 text-gray-900/50" />
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
}
