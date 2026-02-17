import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/create";
import Navbar from "./pages/Navbar";
import Rejected from "./pages/Rejected";


function App() {
  return (
    <BrowserRouter>
      <Navbar />


      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/rejected" element={<Rejected />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;