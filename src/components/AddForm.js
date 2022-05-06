import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "./FormError";
import UseAxios from "../hooks/UseAxios";

const schema = yup.object().shape({
    name: yup.string().required("Please add the name of accommodation"),
    price: yup.number().required("Please add a price"),
    max_number_of_guests: yup.number().required("Please add how may guests there are room for in this accommodation"),
    // accommodation_type: yup.string().required("Please select accommodation type"),
    main_img: yup.string().required("Please add an url for the main image of the accommodation"),
    img_2: yup.string().required("Please add an url for an image"),
    img_3: yup.string().required("Please add an url for an image"),
    img_4: yup.string().required("Please add an url for an image"),
    short_description: yup.string().min(50).max(100).required("Please add a short description of the accommodation(50-100 characthers"),
    description: yup.string().min(100).max(300).required("Please add a short description of the accommodation(50-100 characthers"),
});

export default function AddForm() {
    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState(null);

    const navigate = useNavigate();
    const http = UseAxios();

    const { register, handleSubmit, formState:{errors}, } = useForm({
        resolver: yupResolver(schema),
    });

    async function onSubmit(data) {
        setSubmitting(true);
        setServerError(null);

        // data.status = "publish";

        console.log(data);

        try {
            const response = await http.post("api/accommodations", data);
            console.log("response", response.data);
            navigate("/add");
        } catch (error) {
            console.log("error", error);
            serverError(error.toString());
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {serverError && <FormError>{serverError}</FormError>}
            <fieldset disabled={submitting}>
                <div>
                    <label htmlFor="name">Name of accommodation</label>
                    <input name="name" id="name" {...register('name')} />
                    {errors.name && <FormError>{errors.name.message}</FormError>}
                </div>

                <div>
                    <label htmlFor="price">Price per night</label>
                    <input name="price" id="price" {...register('price')} />
                    {errors.price && <FormError>{errors.price.message}</FormError>}
                </div>

                <div>
                    <label htmlFor="max_number_of_guests">Maximum number of guests</label>
                    <input name="max_number_of_guests" id="max_number_of_guests" {...register('max_number_of_guests')} />
                    {errors.max_number_of_guests && <FormError>{errors.max_number_of_guests.message}</FormError>}
                </div>

                {/* <div>
                    <label htmlFor="accommodation_type">Accommodation type</label>
                    <select {...register('accommodation_type')} id="accommodation_type">
                        <option value="hotel">Hotel</option>
                        <option value="cabin">Cabin</option>
                        <option value="apartment">Apartment</option>
                        <option value="hostel">Hostel</option>
                    </select>
                </div> */}

                <div>
                    <label htmlFor="main_img">Main image (url)</label>
                    <input name="main_img" id="main_img" {...register('main_img')} />
                    {errors.main_img && <FormError>{errors.main_img.message}</FormError>}
                </div>

                <div>
                    <label htmlFor="img_2">Image 2</label>
                    <input name="img_2" id="img_2" {...register('img_2')} />
                    {errors.img_2 && <FormError>{errors.img_2.message}</FormError>}
                </div>

                <div>
                    <label htmlFor="img_3">Image 3</label>
                    <input name="img_3" id="img_3" {...register('img_3')} />
                    {errors.img_3 && <FormError>{errors.img_3.message}</FormError>}
                </div>

                <div>
                    <label htmlFor="img_4">Image 4</label>
                    <input name="img_4" id="img_4" {...register('img_4')} />
                    {errors.img_4 && <FormError>{errors.img_4.message}</FormError>}
                </div>

                <div>
                    <label htmlFor="short_description">Short description (50-100 characthers)</label>
                    <textarea name="short_description" {...register('short_description')}></textarea>
                    {errors.short_description && <FormError>{errors.short_description}</FormError>}
                </div>

                <div>
                    <label htmlFor="description">Description (100-300 characthers)</label>
                    <textarea name="description" {...register('description')}></textarea>
                    {errors.description && <FormError>{errors.description}</FormError>}
                </div>

                <div>
                    <label htmlFor="featured">Add to featured list</label>
                    <input type="checkbox" id="featured" />
                </div>

                <button>{submitting ? "Submitting..." : "Submit"}</button>
            </fieldset>
        </form>
    )
}

{/* <form onSubmit={handleSubmit(onSubmit)}>
{loginError && <FormError>{loginError}. Something went wrong. Please make sure you have the correct username and password.</FormError>}
<fieldset disabled={submitting}>
    <div>
        <input name="identifier" placeholder="Username" {...register('identifier')} />
        {errors.identifier && <FormError>{errors.identifier.message}</FormError>}
    </div>

    <div>
        <input name="password" placeholder="Password" {...register('password')} type="password" />
        {errors.password && <FormError>{errors.password.message}</FormError>}
    </div>
    <button>{submitting ? "Loggin in..." : "Login"}</button>
</fieldset>
</form> */}