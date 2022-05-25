import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { BASE_URL } from "../constants/Api";
import FormError from "./FormError";

const schema = yup.object().shape({
    first_name: yup.string().required("Please enter your first name").min(3, "Must be at least 3 characters"),
    last_name: yup.string().required("Please enter your last name").min(2, "Must be at least 2 characters"),
    email: yup.string().required("Please enter your e-mail").email("Please enter a valid e-mail address"),
    message: yup.string().required("Please enter your message").min(10, "Please enter your message (must be at least 10 charachers)"),
});

export default function ContactForm() {
    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState(null);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });


    async function onSubmit(data) {
        setSubmitting(true);
        setServerError(null);

        const url = BASE_URL + "api/contacts"

        // data.status = "publish";

        const postData = { data: data }

        // console.log(data);

        try {
            const response = await axios.post(url, postData);
            console.log("response", response.data);
            // navigate("/add");
        } catch (error) {
            console.log("error", error);
            setServerError(error.toString());
        } finally {
            setSubmitting(false);
        }
    }

    console.log(errors);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {serverError && <FormError>{serverError}</FormError>}
            <fieldset className="form" disabled={submitting}>
                
                <label className="form__label" htmlFor="first_name">First name</label>
                <input className="form__input" {...register("first_name")} id="first_ame" />
                {errors.first_name && <FormError>{errors.first_name.message}</FormError>}
                {/* {errors.name && <FormError>{errors.name.message}</FormError>} */}
                
                <label className="form__label" htmlFor="last_name">Last name</label>
                <input className="form__input" {...register("last_name")} id="last_name" />
                {errors.last_name && <FormError>{errors.last_name.message}</FormError>}
                
                
                <label className="form__label" htmlFor="email">E-mail</label>
                <input className="form__input" {...register("email")} id="email" />
                {errors.email && <FormError>{errors.email.message}</FormError>}

                
                <label className="form__label" htmlFor="message">Message</label>
                <textarea className="form__input form__message" {...register("message")} id="message" />
                {errors.message && <FormError>{errors.message.message}</FormError>}
                
                <button className="form__btn">{submitting ? "Sending..." : "Send"}</button>
            </fieldset>
        </form>
    )
}