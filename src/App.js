import './App.css';
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import { BrowserRouter,Route,Routes } from "react-router-dom";
function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/teachers" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
