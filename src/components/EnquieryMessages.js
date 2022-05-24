import React from 'react'
import { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import AuthContext from "../context/AuthContext";

export default function EnquieryMessages() {
    // const [submitting, setSubmitting] = useState(false);
    // const [serverError, setServerError] = useState(null);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const http = useAxios();

    useEffect(function() {
        async function getData() {
            try {
                const response = await http.get("api/enquiries");
                console.log("response", response.data.data);
                // console.log(response.data.data[0]);
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

    return (
        <div className="messages-container">
            {items.map((media) => {
                return (
                    <div key={media.id}>
                        {/* <label htmlFor="not-handled">Not handled</label>
                        <input id="not-handled" className="radio-red" type="radio" name="handling" value="not handled"></input>

                        <label htmlFor="processing">Processing</label>
                        <input id="processing" className="radio-yellow" type="radio" name="handling" value="Processing"></input>

                        <label htmlFor="handled">Handled</label>
                        <input id="handled" className="radio-green" type="radio" name="handling" value="handled"></input>     */}
                        <div className="messages" key={media.id}>
                            {/* <label htmlFor="not-handled">Not handled</label>
                            <input id="not-handled" className="radio-red" type="radio" name="handling" value="not handled"></input> */}
                            <p>Accommodation name: {media.attributes.accommodation_name}</p>
                            <p>First name: {media.attributes.first_name}</p>
                            <p>Last name: {media.attributes.last_name}</p>
                            <p>Email: {media.attributes.email}</p>
                            <p>Checkin: {media.attributes.start_date}</p>
                            <p>Checkout: {media.attributes.end_date}</p>
                            <p>Message: {media.attributes.message}</p>
                            {/* <p>Date: {media.attributes.publishedAt}</p> */}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}