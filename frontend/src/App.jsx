import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import Insight from "@/pages/Insight";
import { NavigationMenu } from './components/ui/navigation-menu';

export default function App() {
  return (
    <Router>
      <NavigationMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/insight" element={<Insight />} />
      </Routes>
    </Router>
  );
}
