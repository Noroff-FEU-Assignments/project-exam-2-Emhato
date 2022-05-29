import React from 'react'
import { useState, useEffect } from "react";
// import useAxios from "../hooks/useAxios";
import useAxios from '../../hooks/UseAxios';
import moment from 'moment';

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
                return (
                    <div key={media.id}>
                        <div className="messages" key={media.id}>
                            <p>Accommodation name: {media.attributes.accommodation_name}</p>
                            <p>First name: {media.attributes.first_name}</p>
                            <p>Last name: {media.attributes.last_name}</p>
                            <p>Email: {media.attributes.email}</p>
                            <p>Checkin: {moment(media.attributes.start_date).format('Do MMMM YYYY')}</p>
                            <p>Checkout: {moment(media.attributes.end_date).format('Do MMMM YYYY')}</p>
                            <p>Message: {media.attributes.message}</p>
                            <p>Enquiery received: {moment(media.attributes.publishedAt).format('Do MMMM YYYY, h:mm')}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}