import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Modal } from "../";

function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/auth" />;
  }

  return (
    <div>
      {children} <Modal />
    </div>
  );
}

export default ProtectedRoute;
