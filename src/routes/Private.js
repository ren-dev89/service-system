import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";

const Private = ({ children }) => {
  const { signed } = useAuth();

  if (!signed) {
    return <Navigate to={"/"} />;
  }

  return children;
};

export default Private;
