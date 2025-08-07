import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getCurrentUser()) {
      navigate("/login");
    }
  }, [navigate]);

  return children;
}
