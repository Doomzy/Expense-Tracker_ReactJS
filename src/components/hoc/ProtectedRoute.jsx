import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { LoadingIcon } from "../";

function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <LoadingIcon />;
  }

  if (!isSignedIn) {
    return <Navigate to="/auth" />;
  }

  return children;
}

export default ProtectedRoute;
