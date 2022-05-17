import { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
// import UseAxios from "../hooks/UseAxios";
import { BASE_URL } from "../constants/Api";
import Heading from "./Heading";
// import AccommodationItem from "./AccommodationItem";

export default function Featured() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const url = BASE_URL + "api/accommodations"
    // const http = UseAxios();

    useEffect(function() {
        async function getData() {
            try {
                const response = await axios.get(url);
                // console.log(response.data.data);
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



    // console.log(items.attributes.accommodation_type)

    // console.log({items})

    // console.log(items.attributes.main_img)

    return (
        <ul className="card-container">
            {items.map((media) => {
                if(media.attributes.featured === true) {
                    return (
                        <div className="content-container" key={media.id}>
                            <li>
                                <Link className="card" to={`/spesific/${media.id}`}>
                                    <div className="card__img" style={{backgroundImage: `url(${media.attributes.main_img})`}}></div>
                                    <Heading className="card__name" size="2" title={media.attributes.name} />
                                </Link>
                            </li>
                        </div>
                    )
                }
            })}

        </ul>
    )

    // console.log(items)

    // return (
    //     <div className="accommodations">
    //         {items.map(function(media) {
    //             console.log(media)
    //             // const { id, name, short_description, price, description, featured } = media.attributes;
    //             return <AccommodationItem key={media.id} id={media.id} name={media.attributes.name} short_description={media.attributes.short_description} price={media.attributes.price} description={media.attributes.description} featured={media.attributes.featured} />
    //         })}
    //     </div>
    // )
}
