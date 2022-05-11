// import { BrowserRouter as Router, Route, NavLink, Routes } from "react-router-dom";
// New

// use context and ustate, react on same line
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import React, { useState } from "react"
// import hamburger from "./hamburger-img.png";


// 
// import HomePage from "../home/HomePage";
// import AccommodationPage from "../accommodation/AccommodationPage";
// import ContactPage from "../contact/ContactPage";
// import LoginPage from "../login/LoginPage";
// import AddPage from "../add/AddPage";

export default function Layout() {

    // New
    const [auth, setAuth] = useContext(AuthContext);

    const navigate = useNavigate();
    // navigate("/");

    function logout() {
        setAuth(null);
        navigate("/");
    }
    // hamburger source: https://ibaslogic.com/how-to-add-hamburger-menu-in-react/

    const [burgerOpen, setburgerOpen] = useState(false);

    const handleToggle = () => {
        setburgerOpen(prev => !prev)
    }

    const closeMenu = () => {
        setburgerOpen(false)
    }

  return (
    <>
        <header>
            <button onClick={handleToggle} className="hamburger"></button>
            <nav className="nav">
                <ul className={`nav__ul ${burgerOpen ? "nav__showMenu" : ""}`}>
                    <NavLink onClick={() => closeMenu()} className="nav__link" to="/">Home</NavLink>
                    <NavLink onClick={() => closeMenu()} className="nav__link" to="/accommodations">Accommodations</NavLink>
                    <NavLink onClick={() => closeMenu()} className="nav__link" to="/contact">Contact</NavLink>
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
            {/* <NavLink to="/login">Login</NavLink> */}
            {auth ? (
                <>
                    <NavLink to="/messages">Messages</NavLink>
                    <NavLink to="/enquieries">Enquieries</NavLink>
                    <NavLink to="/add">Add accommodation</NavLink>
                    <button onClick={logout}>Log out</button>
                </>
            ) : (
                <NavLink to="/login">Login</NavLink>
            )}
        </footer>
    </>  
  )
}
