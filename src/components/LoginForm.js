// New
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// 
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import FormError from "./FormError";
import { TOKEN_PATH } from "../constants/Api";
// New
import AuthContext from "../context/AuthContext";
// 

const url = TOKEN_PATH;

const schema = yup.object().shape({
    identifier: yup.string().required("Please enter your username"),
    password: yup.string().required("Please enter your password"),
});

export default function LoginForm() {
	const [submitting, setSubmitting] = useState(false);
	const [loginError, setLoginError] = useState(null);

    const navigate = useNavigate();

	const { register, handleSubmit, formState: { errors }, } = useForm({
		resolver: yupResolver(schema),
	});

    // DO I NEED THIS?
    const [auth, setAuth] = useContext(AuthContext);

	async function onSubmit(data) {
		setSubmitting(true);
		setLoginError(null);

		console.log(data);

		try {
			const response = await axios.post(url, data);
			console.log("response", response.data);
            setAuth(response.data);
            navigate("/")

            // location.href = "/"
            
		} catch (error) {
			console.log("error", error);
			setLoginError(error.toString());
		} finally {
			setSubmitting(false);
		}
	}

	return (
        // Fjern <></>!!!?
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
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
			</form>
		</>
	);
}