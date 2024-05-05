import './App.css';
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Teachers from './components/Teachers';
function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Sidebar/>
      <Home/>
      </BrowserRouter>
    </div>
  );
}

export default App;
