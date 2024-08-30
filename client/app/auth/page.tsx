"use client";
import AuthModal from "@/components/auth-modal";
import { useEffect, useState } from "react";

const AuthPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <AuthModal />
    </div>
  );
};

export default AuthPage;
