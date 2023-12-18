import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../contexts/FakeAuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = UseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return children;
}
