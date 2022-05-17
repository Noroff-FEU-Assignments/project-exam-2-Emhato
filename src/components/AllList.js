import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
// import UseAxios from "../hooks/UseAxios";
import { BASE_URL } from "../constants/Api";
import Heading from "./Heading";
// import AccommodationItem from "./AccommodationItem";

export default function AllList() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState('')

    const url = BASE_URL + "api/accommodations"
    // const http = UseAxios();

    useEffect(function() {
        async function getData() {
            try {
                const response = await axios.get(url);
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

    if(loading) return <div>Loading accommodation...</div>

    if(error) return <div>An error occured: {error}</div>



    // console.log(items.attributes.accommodation_type)

    // console.log({items})

    // Filter source: https://www.youtube.com/watch?v=mZvKPtH9Fzo

    return (
        
        <div className="container">
            <input type="text" placeholder="Search..." onChange={event => {setSearchTerm(event.target.value)}} />
            {items.filter((value) => {
                if (searchTerm ==="") {
                    return value
                } else if (value.attributes.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return value
                }
            }).map((media) => {
                return (
                    <div key={media.id}>
                        <NavLink to={`/spesific/${media.id}`}>
                            <img src={media.attributes.main_img} alt={media.attributes.name}></img>
                            <Heading size="3" title={media.attributes.name} />
                            <p>{media.attributes.short_description}</p>
                            <p>{media.attributes.price}</p>
                            {/* <p>{media.attributes.featured}</p> */}
                        </NavLink>
                    </div>
                )
            })}

        </div>
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


// return (
        
//     <div className="card">
//         {items.map((media) => {
//             return (
//                 <div key={media.id}>
//                     <NavLink to={`/spesific/${media.id}`}>
//                         <Heading size="3" title={media.attributes.name} />
//                         <p>{media.attributes.short_description}</p>
//                         <p>{media.attributes.price}</p>
//                         {/* <p>{media.attributes.featured}</p> */}
//                     </NavLink>
//                 </div>
//             )
//         })}

//     </div>
// )