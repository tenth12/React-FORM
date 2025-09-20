import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GradeTracker from "./components/GradeTracker";
import ParliamentForm from "./components/form";
import './home.css';

function App() {
  return (
    <Router>
      <div>
        {/* Navbar */}
        <nav className="navbar">
          <Link to="/gpa">GPA Tracker</Link>
          <Link to="/members">สมาชิกสภาฯ</Link>
        </nav>

        {/* Route Content */}
        <div className="content">
          <Routes>
            <Route path="/gpa" element={<GradeTracker />} />
            <Route path="/members" element={<ParliamentForm />} />
            <Route path="*" element={<p>เลือกเมนูด้านบน</p>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
