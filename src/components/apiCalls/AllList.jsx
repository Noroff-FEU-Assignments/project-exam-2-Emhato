import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { orderBy } from "lodash";
import { BASE_URL } from "../../constants/Api";
import Heading from "../Heading";


export default function AllList() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [order, setOrder] = useState("");

    // const [searchTerm, setSearchTerm] = useState('')

    const url = BASE_URL + "api/accommodations"

    useEffect(function() {
        async function getData() {
            try {
                const response = await axios.get(url);
                setItems(response.data.data);
                // console.log(response.data.data.attributes)
                // setOrder(response.data.data.attributes);
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

    // Source for lodash with nestet arry: https://stackoverflow.com/questions/36606105/lodash-orderby-on-nested-property
    // const lowToHigh = orderBy(items, item => item.attributes.price, ["asc"]);
    // const highToLow = orderBy(items, item => item.attributes.price, ["desc"]);
    // console.log(sortedByPrice);

    return (
        <div className="container">
            {/* <label htmlFor="priceFilter">Sort by:</label> */}
            {/* <select defaultValue="default" name="price" id="priceFilter" onChange={(event) => {
                const selectedOption = event.target.value;
                setOrder(selectedOption)
            }}>
                <option value="1">Sort by</option>
                <option value="2">Price(low to high)</option>
                <option value="3">Price(high to low)</option>
            </select> */}
            {items.map((media) => {
                return (
                    <div key={media.id} className="accommodation-list card">
                        <Link to={`/spesific/${media.id}`} className="accommodation-list__card card__card">
                            <img src={media.attributes.main_img} alt={media.attributes.name}></img>
                            <div className="accommodation-list__text-container card__text-container">
                                <Heading size="3" title={media.attributes.name} />
                                <p>{media.attributes.price}€</p>
                            </div>
                            <p className="accommodation-list__description">{media.attributes.short_description}</p>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}
