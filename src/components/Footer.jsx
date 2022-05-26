import React, { useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthContext';
import LogoBig from './LogoBig';

export default function Footer() {
    const [auth, setAuth] = useContext(AuthContext);

    const navigate = useNavigate();

    function logout() {
        setAuth(null);
        navigate("/");
    }

    return (
        <footer className="footer">
            <ul className="footer__ul">
                <Link to="/">Home</Link>
                <Link to="/accommodations">Accommodations</Link>
                <Link to="/contact">Contact</Link>
            </ul>
            <LogoBig />
            <div className="footer__admin-container">
                <p>Admin</p>
                {auth ? (
                    <>
                        <Link to="/messages">Messages</Link>
                        <Link to="/enquieries">Enquieries</Link>
                        <Link to="/add">Add accommodation</Link>
                        <button onClick={logout}>Log out</button>
                    </>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </footer>
    )
}
