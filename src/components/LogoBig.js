import React from 'react'
import BigLogo from "../images/big-logo.png"
import { Link } from "react-router-dom";

export default function LogoBig() {
    return (
        <Link to="/">
            <img className="logo-big" src={BigLogo} alt="Logo of holidaze" />
        </Link>
        
    )
}
