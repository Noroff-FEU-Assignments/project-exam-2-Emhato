import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/Api";
import Heading from "../Heading";

export default function Featured() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const url = BASE_URL + "api/accommodations"

    useEffect(function() {
        async function getData() {
            try {
                const response = await axios.get(url);
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
        <div className="container featured-container">
            {items.map((media) => {
                if(media.attributes.featured === true) {
                    return (
                        <div key={media.id} className="featured-list card">
                            <Link to={`/spesific/${media.id}`} className="featured-list__card card__card">
                                <img src={media.attributes.main_img} alt={media.attributes.name}></img>
                                <div className="featured-list__text-container card__text-container">
                                    <Heading size="3" title={media.attributes.name} />
                                    <p>{media.attributes.price}€</p>
                                </div>
                            </Link>
                        </div>
                    )
                }
            })}
        </div>
    )
}
