import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeContextProvider } from "./context/ThemeContext";
import { Home } from "./pages/Home/Home";
import { Clients } from "./pages/Clients/Clients";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <ThemeContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/client/:clientParam" element={<Clients />} />
          </Routes>
        </ThemeContextProvider>
      </Router>
    </div>
  );
}

export default App;
