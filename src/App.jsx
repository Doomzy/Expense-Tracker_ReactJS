import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar, ProtectedRoute } from "./components";
import { AuthPage } from "./pages";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          index
          element={
            <ProtectedRoute>
              <div>Home</div>
            </ProtectedRoute>
          }
        />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </div>
  );
}

export default App;
