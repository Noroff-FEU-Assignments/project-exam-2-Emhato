import React, { useContext } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthContext';

export default function Footer() {
    const [auth, setAuth] = useContext(AuthContext);

    const navigate = useNavigate();

    function logout() {
        setAuth(null);
        navigate("/");
    }

    return (
        <footer>
            <ul>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/accommodations">Accommodations</NavLink>
                <NavLink to="/contact">Contact</NavLink>
            </ul>
            <p>Admin</p>
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
    )
}
