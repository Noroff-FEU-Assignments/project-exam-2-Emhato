// Probably don't need to import React...Try remove
import React, { useState } from "react";
import useLocalStorage from "../hooks/UseLocalStorage";

const AuthContext = React.createContext([null, () => {}]);

export const AuthProvider = (props) => {
    const [auth, setAuth] = useLocalStorage("auth",null);
    return <AuthContext.Provider value={[auth, setAuth]}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;