import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import FormError from "./FormError";
import { BASE_URL } from "../constants/Api";
// import Spesific from "./Spesific";
import Heading from "./Heading";


const schema = yup.object().shape({
    accommodation_name: yup.string().required(),
    first_name: yup.string().required("Please enter your first name").min(3, "Must be at least 3 characters"),
    last_name: yup.string().required("Please enter your last name").min(2, "Must be at least 4 characters"),
    email: yup.string().required("Please enter your e-mail").email("Please enter a valid e-mail address"),
    start_date: yup.date().required("Please select a start date"),
    end_date: yup.date().required("Please select a end date"),
    message: yup.string().required("Please enter your message").min(10, "Please enter your message (must be at least 10 charachers)"),
});

export default function EnquieriesForm() {
    const [formOpen, setFormOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState(null);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    // Getting the name of the accommodation
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams()

    const urlApi = BASE_URL + "api/accommodations/" + id;
    
    useEffect(function() {
        async function getData() {
            try {
                const response = await axios.get(urlApi);
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

    async function onSubmit(data) {
        setSubmitting(true);
        setServerError(null);

        const url = BASE_URL + "api/enquiries"

        const postData = { data: data }

        try {
            const response = await axios.post(url, postData);
            // console.log("response", response.data);
            // navigate("/add");
        } catch (error) {
            console.log("error", error);
            serverError(error.toString());
        } finally {
            setSubmitting(false);
        }
    }

    // console.log(errors);

    // Modal display/ display none

    const handleToggle = () => {
        setFormOpen(prev => !prev)
    }

    const closeModal = () => {
        setFormOpen(false)
    }

    return (
        <>
        <div className="cta-container">
            <button className="enquiery-cta" onClick={handleToggle}>Make an enquiery</button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={`container modal-hide ${formOpen ? "form-modal-container" : ""}`}>
            <button onClick={() => closeModal()} className={`close-hide ${formOpen ? "close-modal" : ""}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="23.335" height="23.335" viewBox="0 0 23.335 23.335">
                    <g id="close" transform="translate(1.061 1.061)">
                        <line id="Line_20" data-name="Line 20" x2="30" transform="rotate(45)" fill="none" stroke="#bf452a" strokeWidth="3"/>
                        <line id="Line_21" data-name="Line 21" x2="30" transform="translate(21.213) rotate(135)" fill="none" stroke="#bf452a" strokeWidth="3"/>
                    </g>
                </svg>
            </button>
            {serverError && <FormError>{serverError}</FormError>}
            <fieldset className="form form-modal" disabled={submitting}>
                <Heading size="2" title="Make an enqiery"/>
                {errors.first_name && <span className="form-error">{errors.first_name.message}</span>}

                {/* How to fix this? */}
                <input className="hide-name" {...register("accommodation_name")} id="accommodation_name" value={items.attributes.name}/>

                {errors.last_name && <span className="form__error">{errors.last_name.message}</span>}
                <label className="form__label" htmlFor="first_name">First name</label>
                <input className="form__input" {...register("first_name")} id="first_name" />
                
                {errors.last_name && <span className="form__error">{errors.last_name.message}</span>}
                <label className="form__label" htmlFor="last_name">Last name</label>
                <input className="form__input" {...register("last_name")} id="last_name" />
                
                {errors.email && <span className="form__error">{errors.email.message}</span>}
                <label className="form__label" htmlFor="email">E-mail</label>
                <input className="form__input" {...register("email")} id="email" />
                
                {errors.start_date && <span className="form__error">{errors.start_date.message}</span>}
                <label className="form__label" htmlFor="start_date">Start date</label>
                <input className="form__input" type="date" {...register("start_date")} id="start_date" />

                {errors.end_date && <span className="form__error">{errors.end_date.message}</span>}
                <label className="form__label" htmlFor="end_date">End date</label>
                <input className="form__input" type="date" {...register("end_date")} id="end_date" />

                {errors.message && <span className="form__error">{errors.message.message}</span>}
                <label className="form__label" htmlFor="message">Message</label>
                <textarea className="form__input form__message" {...register("message")} id="message" />
                

                <button className="form__btn">{submitting ? "Sending..." : "Make enquiery"}</button>

            </fieldset>
        </form>
        </>
    )
}
