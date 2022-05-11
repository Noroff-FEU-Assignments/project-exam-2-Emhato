import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import FormError from "./FormError";
import { BASE_URL } from "../constants/Api";

const schema = yup.object().shape({
    accommodation_name: yup.string().required(),
    first_name: yup.string().required("Please enter your first name").min(3, "Must be at least 3 characters"),
    last_name: yup.string().required("Please enter your last name").min(4, "Must be at least 4 characters"),
    email: yup.string().required("Please enter your e-mail").email("Please enter a valid e-mail address"),
    start_date: yup.date().required("Please select a start date"),
    end_date: yup.date().required("Please select a end date"),
    message: yup.string().required("Please enter your message").min(10, "Please enter your message (must be at least 10 charachers)"),
});

export default function EnquieriesForm() {
    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState(null);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    // Getting the name of the accommodation
    const [items, setItems] = useState(null);
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
    // 

    // function onSubmit(data) {
    //     console.log(data);
    // }

    async function onSubmit(data) {
        setSubmitting(true);
        setServerError(null);

        const url = BASE_URL + "api/enquiries"

        // data.status = "publish";

        const postData = { data: data }

        // console.log(data);

        try {
            const response = await axios.post(url, postData);
            console.log("response", response.data);
            // navigate("/add");
        } catch (error) {
            console.log("error", error);
            serverError(error.toString());
        } finally {
            setSubmitting(false);
        }
    }


    console.log(errors);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="container">
            {serverError && <FormError>{serverError}</FormError>}
            <fieldset disabled={submitting}>
                {errors.first_name && <span className="form-error">{errors.first_name.message}</span>}

                {/* How to fix this? */}
                <input {...register("accommodation_name")} id="accommodation_name" value={items.attributes.name}/>

                <label htmlFor="first_name">First name</label>
                <input {...register("first_name")} id="first_name" />
                
                {errors.last_name && <span className="form-error">{errors.last_name.message}</span>}
                <label htmlFor="last_name">Last name</label>
                <input {...register("last_name")} id="last_name" />
                
                {errors.email && <span className="form-error">{errors.email.message}</span>}
                <label htmlFor="email">E-mail</label>
                <input {...register("email")} id="email" />
                
                <label htmlFor="start_date">Start date</label>
                <input type="date" {...register("start_date")} id="start_date" />

                <label htmlFor="end_date">End date</label>
                <input type="date" {...register("end_date")} id="end_date" />

                {errors.message && <span className="form-error">{errors.message.message}</span>}
                <label htmlFor="message">Message</label>
                <textarea {...register("message")} id="message" />
                

                <button>{submitting ? "Sending..." : "Send"}</button>

            </fieldset>
        </form>
    )
}