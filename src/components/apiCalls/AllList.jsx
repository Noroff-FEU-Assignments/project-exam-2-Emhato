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

    // Source for lodash with nestet arry: https://stackoverflow.com/questions/36606105/lodash-orderby-on-nested-property
    const lowToHigh = orderBy(items, item => item.attributes.price, ["asc"]);
    const highToLow = orderBy(items, item => item.attributes.price, ["desc"]);

    const sortLowToHigh = () => {
        setItems(lowToHigh)
    }

    const sortHighToLow = () => {
        setItems(highToLow)
    }

    return (
        <div className="container">
            <div className="sorting">
                <p className="sorting__text">Sort by price:</p>
                <div className="sorting__buttons">
                    <button onClick={sortLowToHigh}>Low to high</button>
                    <button onClick={sortHighToLow}>High to low</button>
                </div>
            </div>
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
