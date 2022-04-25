import { BrowserRouter as Router, Route, NavLink, Routes } from "react-router-dom";
import HomePage from "../home/HomePage";
import AccommodationPage from "../accommodation/AccommodationPage";
import ContactPage from "../contact/ContactPage";
import LoginPage from "../login/LoginPage";

export default function Layout() {
  return (
    <Router>
        <header>
            <nav>
                <ul>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/accommodations">Accommodations</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                </ul>
            </nav>
        </header>
        <footer>
            <ul>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/accommodations">Accommodations</NavLink>
                <NavLink to="/contact">Contact</NavLink>
            </ul>
            <p>Admin</p>
            <NavLink to="/login">Login</NavLink>
        </footer>
        <div>
            <Routes>
                <Route path="/" exact element={<HomePage />} />
                <Route path="/accommodations" element={<AccommodationPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </div>
    </Router>
  )
}
