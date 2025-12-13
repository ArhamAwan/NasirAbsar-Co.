import React, { useEffect } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { useNavigate } from "react-router-dom";

interface AuthGateProps {
  children: React.ReactNode;
}

const AuthGate: React.FC<AuthGateProps> = ({ children }) => {
  const { isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGate;

