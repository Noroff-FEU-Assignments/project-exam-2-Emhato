import React from 'react'
import logo from "../images/favicon.png"
import { Link } from "react-router-dom";

export default function Logo() {
    return (
        <Link to="/">
            <img className="logo" src={logo} alt="logo of Holidaze" />
        </Link>
        
    )
}
