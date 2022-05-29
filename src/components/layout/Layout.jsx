// import { NavLink } from "react-router-dom";
// import React, { useState } from "react"

// export default function Layout() {

//     // hamburger source: https://ibaslogic.com/how-to-add-hamburger-menu-in-react/

//     const [burgerOpen, setburgerOpen] = useState(false);

//     const handleToggle = () => {
//         setburgerOpen(prev => !prev)
//     }

//     const closeMenu = () => {
//         setburgerOpen(false)
//     }

//   return (
//     <>
//         <header>
//             <button onClick={handleToggle} className="hamburger"></button>
//             <nav className="nav">
//                 <ul className={`nav__ul ${burgerOpen ? "nav__showMenu" : ""}`}>
//                     <NavLink onClick={() => closeMenu()} className="nav__link" to="/">Home</NavLink>
//                     <NavLink onClick={() => closeMenu()} className="nav__link" to="/accommodations">Accommodations</NavLink>
//                     <NavLink onClick={() => closeMenu()} className="nav__link" to="/contact">Contact</NavLink>
//                 </ul>
//             </nav>
//         </header>
//     </>  
//   )
// }

import React from 'react'
import Header from "../Header";
import Footer from '../Footer';

export default function Layout({children}) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    )
}

