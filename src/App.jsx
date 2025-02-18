import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar, ProtectedRoute } from "./components";
import {
  AuthPage,
  ProfilePage,
  HomePage,
  DashboardPage,
  ReportsPage,
} from "./pages";

function App() {
  return (
    <div className=" min-h-screen flex flex-col mb-10">
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
          path="/home"
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
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <ReportsPage />
            </ProtectedRoute>
          }
        />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </div>
  );
}

export default App;
