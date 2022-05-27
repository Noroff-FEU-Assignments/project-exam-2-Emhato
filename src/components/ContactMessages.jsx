import React from 'react'
import { useState, useEffect } from "react";
// import useAxios from "../hooks/useAxios";
import useAxios from '../hooks/UseAxios';

export default function ContactMessages() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const http = useAxios();

    useEffect(function() {
        async function getData() {
            try {
                const response = await http.get("api/contacts/");
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

    if(loading) return <div className="loading"></div>

    if(error) return <div>An error occured: {error}</div>

    return (
        <div className="messages-container">
            {items.map((media) => {
                // Formatting date
                // Source: https://stackoverflow.com/questions/69977223/strapi-date-format-using-javascript
                function dateFormat(value, local = "en-GB") {
                    return new Date(value).toLocaleDateString(local);
                }

                const timestamp = media.attributes.publishedAt;

                const formattedDate = dateFormat(timestamp)
                return (
                    <div key={media.id}>
                        {/* <label className="handle-lable" htmlFor="not-handled">Not handled</label>
                        <input id="not-handled" className="radio-red" type="radio" name="handeling" value="not handled"></input>

                        <label className="handle-lable" htmlFor="processing">Processing</label>
                        <input id="processing" className="radio-yellow" type="radio" name="handeling" value="Processing"></input>

                        <label className="handle-lable" htmlFor="handled">Handled</label>
                        <input id="handled" className="radio-green" type="radio" name="handeling" value="handled"></input>     */}
                        <div className="messages" key={media.id}>
                            {/* <label htmlFor="not-handled">Not handled</label>
                            <input id="not-handled" className="radio-red" type="radio" name="handling" value="not handled"></input> */}
                            <p>First name: {media.attributes.first_name}</p>
                            <p>Last name: {media.attributes.last_name}</p>
                            <p>Email: {media.attributes.email}</p>
                            <p>Message: {media.attributes.message}</p>
                            <p>Message received: {formattedDate}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
