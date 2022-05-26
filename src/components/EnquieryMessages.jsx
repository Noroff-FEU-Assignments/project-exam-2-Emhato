import React from 'react'
import { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";

export default function EnquieryMessages() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const http = useAxios();

    useEffect(function() {
        async function getData() {
            try {
                const response = await http.get("api/enquiries");
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
                // Formatting dates
                function dateFormat(value, local = "en-GB") {
                    return new Date(value).toLocaleDateString(local);
                }

                const timestamp = media.attributes.publishedAt;
                const checkin = media.attributes.start_date;
                const checkout = media.attributes.end_date;

                const formattedDate = dateFormat(timestamp);
                const formattedCheckin = dateFormat(checkin);
                const formattedCheckout = dateFormat(checkout)

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
                            <p>Checkin: {formattedCheckin}</p>
                            <p>Checkout: {formattedCheckout}</p>
                            <p>Message: {media.attributes.message}</p>
                            <p>Enquiery received: {formattedDate}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}