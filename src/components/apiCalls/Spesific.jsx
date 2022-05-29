import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Heading from "../Heading";
import { BASE_URL } from "../../constants/Api";

export default function Spesific() {

    const [carouselModalOpen, setCarouselModalOpen] = useState(false);
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

    const handleToggle = () => {
        setCarouselModalOpen(prev => !prev)
    }

    const closeModal = () => {
        setCarouselModalOpen(true)
    }

    document.title = items.attributes.name

    return (
        <>
            <div onClick={handleToggle} className={`carousel ${carouselModalOpen ? "carousel-open" : ""}`}>
                <button onClick={() => closeModal()} className={`close-hide ${carouselModalOpen ? "close-modal" : ""}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="23.335" height="23.335" viewBox="0 0 23.335 23.335">
                        <g id="close" transform="translate(1.061 1.061)">
                            <line id="Line_20" data-name="Line 20" x2="30" transform="rotate(45)" fill="none" stroke="#bf452a" strokeWidth="3"/>
                            <line id="Line_21" data-name="Line 21" x2="30" transform="translate(21.213) rotate(135)" fill="none" stroke="#bf452a" strokeWidth="3"/>
                        </g>
                    </svg>
                </button>
                <div className="carousel__element carousel-open__element">
                    <img src={items.attributes.main_img} alt={items.attributes.name}></img>
                </div>
                <div className="carousel__element carousel-open__element">
                    <img src={items.attributes.img_2} alt={items.attributes.name}></img>
                </div>
                <div className="carousel__element carousel-open__element">
                    <img src={items.attributes.img_3} alt={items.attributes.name}></img>
                </div>
                <div className="carousel__element carousel-open__element">
                    <img src={items.attributes.img_4} alt={items.attributes.name}></img>
                </div>
            </div>
            <Heading size="1" title={items.attributes.name} />
            <p className="description">{items.attributes.description}</p>
        </>
    );
}

