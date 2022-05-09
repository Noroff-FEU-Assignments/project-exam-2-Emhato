import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    firstName: yup.string().required("Please enter your first name").min(3, "Must be at least 3 characters"),
    lastName: yup.string().required("Please enter your last name").min(4, "Must be at least 4 characters"),
    email: yup.string().required("Please enter your e-mail").email("Please enter a valid e-mail address"),
    startDate: yup.date().required("Please select a start date"),
    endDate: yup.date().required("Please select a end date"),
    message: yup.string().required("Please enter your message").min(10, "Please enter your message (must be at least 10 charachers)"),
});

export default function EnquieriesForm() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    function onSubmit(data) {
        console.log(data);
    }

    console.log(errors);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="container">
            {errors.firstName && <span className="form-error">{errors.firstName.message}</span>}
            <label htmlFor="firstName">First name</label>
            <input {...register("firstName")} id="firstName" />
            
            {errors.lastName && <span className="form-error">{errors.lastName.message}</span>}
            <label htmlFor="lastName">Last name</label>
            <input {...register("lastName")} id="lastName" />
            
            {errors.email && <span className="form-error">{errors.email.message}</span>}
            <label htmlFor="email">E-mail</label>
            <input {...register("email")} id="email" />
            
            <label htmlFor="startDate">Start date</label>
            <input type="date" {...register("startDate")} id="startDate" />

            <label htmlFor="endDate">End date</label>
            <input type="date" {...register("endDate")} id="endDate" />

            {errors.message && <span className="form-error">{errors.message.message}</span>}
            <label htmlFor="message">Message</label>
            <textarea {...register("message")} id="message" />
            

            <button>Send</button>
        </form>
    )
}