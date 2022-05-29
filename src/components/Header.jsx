import { NavLink } from "react-router-dom";
import React, { useState } from "react"

export default function Header() {

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
    </>  
  )
}