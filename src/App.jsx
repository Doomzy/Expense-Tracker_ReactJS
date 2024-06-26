import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route index />
      </Routes>
    </div>
  );
}

export default App;
