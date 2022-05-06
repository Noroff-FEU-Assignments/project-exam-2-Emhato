// REMEMBER TO SET THE TITLE IN THE HEADER, ALLSO FOR ALL THE OTHER PAGES!

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Heading from "./Heading";
import { BASE_URL } from "../constants/Api";


export default function Spesific() {

    const [items, setItems] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let navigate = useNavigate();

    const { id } = useParams()

    if(!id) {
        navigate("/");
    }

    const url = BASE_URL + "api/accommodations/" + id;
    
    useEffect(function() {
        async function getData() {
            try {
                const response = await axios.get(url);
                console.log(response.data.data);
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

    if(loading) return <div>Loading accommodation...</div>

    if(error) return <div>An error occured: {error}</div>



    return (
        <>
            {/* <title>{items.attributes.name}</title> */}
            <Heading size="1" title={items.attributes.name} />
            <p>{items.attributes.description}</p>
        </>
    );
}