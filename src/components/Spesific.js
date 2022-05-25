// REMEMBER TO SET THE TITLE IN THE HEADER, ALLSO FOR ALL THE OTHER PAGES!

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Heading from "./Heading";
import { BASE_URL } from "../constants/Api";
// import EnquieriesForm from "./EnquieriesForm";


export default function Spesific() {

    const [carouselModalOpen, setCarouselModalOpen] = useState(false);
    const [items, setItems] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let navigate = useNavigate();

    const { id } = useParams()

    if(!id) {
        navigate("/");
    }

    const url = BASE_URL + "api/accommodations/" + id;
    
    useEffect(function() {
        async function getData() {
            try {
                const response = await axios.get(url);
                console.log(response.data.data);
                setItems(response.data.data);
            } catch(error) {
                console.log(error);
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        }
        getData();

    }, []);

    if(loading) return <div>Loading accommodation...</div>

    if(error) return <div>An error occured: {error}</div>

    const handleToggle = () => {
        setCarouselModalOpen(prev => !prev)
    }

    const closeModal = () => {
        setCarouselModalOpen(true)
    }

    return (
        <>
            <div onClick={handleToggle} className={`carousel ${carouselModalOpen ? "carousel-open" : ""}`}>
                {/* <button onClick={handleToggle} className={`${carouselModalOpen ? "carousel-open close-modal" : "close-hide"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="23.335" height="23.335" viewBox="0 0 23.335 23.335">
                        <g id="close" transform="translate(1.061 1.061)">
                            <line id="Line_20" data-name="Line 20" x2="30" transform="rotate(45)" fill="none" stroke="#bf452a" strokeWidth="3"/>
                            <line id="Line_21" data-name="Line 21" x2="30" transform="translate(21.213) rotate(135)" fill="none" stroke="#bf452a" strokeWidth="3"/>
                        </g>
                    </svg>
                </button> */}
                <button onClick={() => closeModal()} className={`close-hide ${carouselModalOpen ? "close-modal" : ""}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="23.335" height="23.335" viewBox="0 0 23.335 23.335">
                        <g id="close" transform="translate(1.061 1.061)">
                            <line id="Line_20" data-name="Line 20" x2="30" transform="rotate(45)" fill="none" stroke="#bf452a" strokeWidth="3"/>
                            <line id="Line_21" data-name="Line 21" x2="30" transform="translate(21.213) rotate(135)" fill="none" stroke="#bf452a" strokeWidth="3"/>
                        </g>
                    </svg>
                </button>
                <div className="carousel__element carousel-open__element">
                    <img src={items.attributes.main_img} alt={items.attributes.name}></img>
                </div>
                <div className="carousel__element carousel-open__element">
                    <img src={items.attributes.img_2} alt={items.attributes.name}></img>
                </div>
                <div className="carousel__element carousel-open__element">
                    <img src={items.attributes.img_3} alt={items.attributes.name}></img>
                </div>
                <div className="carousel__element carousel-open__element">
                    <img src={items.attributes.img_4} alt={items.attributes.name}></img>
                </div>
            </div>
            <Heading size="1" title={items.attributes.name} />
            <p className="description">{items.attributes.description}</p>
        </>
    );
}

{/* <button onClick={() => closeModal()} className={`close-hide ${carouselModalOpen ? "close-modal" : ""}`}> */}






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

