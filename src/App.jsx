import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar, ProtectedRoute, Footer } from "./components";
import { AuthPage, ProfilePage, HomePage, DashboardPage } from "./pages";

function App() {
  return (
    <div className=" min-h-screen flex flex-col">
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
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
