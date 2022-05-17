import React from 'react'
import { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import AuthContext from "../context/AuthContext";

export default function ContactMessages() {
    // const [submitting, setSubmitting] = useState(false);
    // const [serverError, setServerError] = useState(null);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const http = useAxios();

    // async function onSubmit(data) {
    //     setSubmitting(true);
    //     setServerError(null);

    //     // data.status = "publish";

    //     // const postData = { data: data }

    //     // console.log(data);

    //     try {
    //         const response = await http.get("api/contact/", data);
    //         console.log("response", response.data);
    //     } catch (error) {
    //         console.log("error", error);
    //         serverError(error.toString());
    //     } finally {
    //         setSubmitting(false);
    //     }
    // }

    useEffect(function() {
        async function getData() {
            try {
                const response = await http.get("api/contacts/");
                console.log("response", response.data);
                // console.log(response.data.data[0]);
                // setItems(response.data.data);
            } catch(error) {
                console.log(error);
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, []);
}
