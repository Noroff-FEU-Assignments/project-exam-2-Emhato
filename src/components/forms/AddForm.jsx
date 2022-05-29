import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "./FormError";
import useAxios from "../../hooks/UseAxios";
import FormSuccess from "./FormSuccess";

const schema = yup.object().shape({
    name: yup.string().required("Please add the name of accommodation").min(5, "Must be at least 5 characters"),
    price: yup.number().required("Please add a price (please exclude value type. Should be number only)"),
    max_number_of_guests: yup.number().required("Please add how may guests there are room for in this accommodation"),
    main_img: yup.string().required("Please add an url for the main image of the accommodation").url("Please enter a valid URL"),
    img_2: yup.string().required("Please add an url for an image").url("Please enter a valid URL"),
    img_3: yup.string().required("Please add an url for an image").url("Please enter a valid URL"),
    img_4: yup.string().required("Please add an url for an image").url("Please enter a valid URL"),
    short_description: yup.string().min(100).max(250).required("Please add a short description of the accommodation(100-250 characthers"),
    description: yup.string().min(400).max(600).required("Please add a short description of the accommodation(400-600 characthers"),
    featured: yup.boolean().default(false),
});


export default function AddForm() {
    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState(null);
    const [success, setSuccess] = useState(null)
    // Source: https://stackoverflow.com/questions/59835355/get-textarea-character-count-using-reactjs-with-help-of-usestate-hook
    const [shortCount, setShortCount] = useState(0)
    const [descriptionCount, setDescriptionCount] = useState(0)

    const http = useAxios();

    const { register, handleSubmit, formState:{errors}, } = useForm({
        resolver: yupResolver(schema),
    });

    async function onSubmit(data) {
        setSubmitting(true);
        setServerError(null);

        const postData = { data: data }

        try {
            const response = await http.post("api/accommodations/", postData);
            setSuccess("Success! You've added another accommodation to our site!");
        } catch (error) {
            console.log("error", error);
            setServerError(error.toString());
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {serverError && <FormError>{serverError}</FormError>}
            {success && <FormSuccess content="Success! You've added another accommodation to our site!"></FormSuccess>}
            <fieldset className="form" disabled={submitting}>
                <label className="form__label" htmlFor="name">Name of accommodation*</label>
                <input className="form__input" name="name" id="name" {...register('name')} />
                {errors.name && <FormError>{errors.name.message}</FormError>}

                <label className="form__label" htmlFor="price">Price per night*</label>
                <input className="form__input" name="price" id="price" {...register('price')} />
                {errors.price && <FormError>{errors.price.message}</FormError>}

                <label className="form__label" htmlFor="max_number_of_guests">Maximum number of guests*</label>
                <input className="form__input" name="max_number_of_guests" id="max_number_of_guests" {...register('max_number_of_guests')} />
                {errors.max_number_of_guests && <FormError>{errors.max_number_of_guests.message}</FormError>}

                <label className="form__label" htmlFor="main_img">Main image (url)*</label>
                <input className="form__input" name="main_img" id="main_img" {...register('main_img')} />
                {errors.main_img && <FormError>{errors.main_img.message}</FormError>}

                <label className="form__label" htmlFor="img_2">Image 2*</label>
                <input className="form__input" name="img_2" id="img_2" {...register('img_2')} />
                {errors.img_2 && <FormError>{errors.img_2.message}</FormError>}

                <label className="form__label" htmlFor="img_3">Image 3*</label>
                <input className="form__input" name="img_3" id="img_3" {...register('img_3')} />
                {errors.img_3 && <FormError>{errors.img_3.message}</FormError>}

                <label className="form__label" htmlFor="img_4">Image 4*</label>
                <input className="form__input" name="img_4" id="img_4" {...register('img_4')} />
                {errors.img_4 && <FormError>{errors.img_4.message}</FormError>}

                <label className="form__label" htmlFor="short_description">Short description (100-250 characters)*</label>
                <textarea className="form__input form__message" name="short_description" {...register('short_description')} onChange={e => setShortCount(e.target.value.length)}></textarea>
                <p className="form__count">{shortCount}/250</p>
                {errors.short_description && <FormError>{errors.short_description.message}</FormError>}

                <label className="form__label" htmlFor="description">Description (400-600 characters)*</label>
                <textarea className="form__input form__message" name="description" {...register('description')} onChange={e => setDescriptionCount(e.target.value.length)}></textarea>
                <p className="form__count">{descriptionCount}/600</p>
                {errors.description && <FormError>{errors.description.message}</FormError>}

                <div className="form__checkbox-container">
                    <label className="form__label" htmlFor="featured">Add to featured list</label>
                    <input className="form__checkbox" type="checkbox" id="featured" {...register('featured')} />                    
                </div>

                <button className="form__btn">{submitting ? "Submitting..." : "Submit"}</button>
            </fieldset>
        </form>
    )
}