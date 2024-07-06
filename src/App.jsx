import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar, ProtectedRoute } from "./components";
import { AuthPage, ProfilePage, HomePage } from "./pages";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          index
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </div>
  );
}

export default App;
