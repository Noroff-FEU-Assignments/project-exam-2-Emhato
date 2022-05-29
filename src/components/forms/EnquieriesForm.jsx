import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import FormError from "./FormError";
import { BASE_URL } from "../../constants/Api";
import Heading from "../Heading";
import FormSuccess from "./FormSuccess";


// Restricting the date source: https://stackoverflow.com/questions/58810127/how-do-i-validate-if-a-start-date-is-after-an-end-date-with-yup
const schema = yup.object().shape({
    accommodation_name: yup.string().required(),
    first_name: yup.string().required("Please enter your first name").min(3, "Must be at least 3 characters"),
    last_name: yup.string().required("Please enter your last name").min(2, "Must be at least 2 characters"),
    email: yup.string().required("Please enter your e-mail").email("Please enter a valid e-mail address"),
    start_date: yup.date().min(new Date(), "Cannot checkin earlier than today").default(() => new Date()).required("Please select a start date"),
    end_date: yup.date().when("start_date", (start_date, schema) => start_date && schema.min(start_date)).required("Please select a end date"),
    message: yup.string().required("Please enter your message").min(10, "Please enter your message (must be at least 10 charachers)"),
});

export default function EnquieriesForm() {
    const [formOpen, setFormOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState(null);
    const [success, setSuccess] = useState(null)

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

    async function onSubmit(data) {
        setSubmitting(true);
        setServerError(null);

        const url = BASE_URL + "api/enquiries"

        const postData = { data: data }

        try {
            const response = await axios.post(url, postData);
            setSuccess("Thank you for making an enquiery! We'll get back to you soon!");
        } catch (error) {
            console.log("error", error);
            setServerError(error.toString());
        } finally {
            setSubmitting(false);
        }
    }

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
            {success && <FormSuccess content="Thank you for making an Enquiery! We'll get back to you soon!"></FormSuccess>}
            <fieldset className="form form-modal" disabled={submitting}>
                <Heading size="2" title="Make an enqiery"/>

                <input className="hide-name" {...register("accommodation_name")} id="accommodation_name" value={items.attributes.name}/>

                <label className="form__label" htmlFor="first_name">First name*</label>
                <input className="form__input" {...register("first_name")} id="first_name" />
                {errors.first_name && <FormError>{errors.first_name.message}</FormError>}                
                
                <label className="form__label" htmlFor="last_name">Last name*</label>
                <input className="form__input" {...register("last_name")} id="last_name" />
                {errors.last_name && <FormError>{errors.last_name.message}</FormError>}
                
                <label className="form__label" htmlFor="email">E-mail*</label>
                <input className="form__input" {...register("email")} id="email" />
                {errors.email && <FormError>{errors.email.message}</FormError>}
                
                <label className="form__label" htmlFor="start_date">Checkin*</label>
                <input className="form__input" type="date" {...register("start_date")} id="start_date" />
                {errors.start_date && <FormError>{errors.start_date.message}</FormError>}
                
                <label className="form__label" htmlFor="end_date">Checkout*</label>
                <input className="form__input" type="date" {...register("end_date")} id="end_date" />
                {errors.end_date && <FormError>{errors.end_date.message}</FormError>}
                
                <label className="form__label" htmlFor="message">Message*</label>
                <textarea className="form__input form__message" {...register("message")} id="message" />
                {errors.message && <FormError>{errors.message.message}</FormError>}

                <button className="form__btn">{submitting ? "Sending..." : "Make enquiery"}</button>
            </fieldset>
        </form>
        </>
    )
}
