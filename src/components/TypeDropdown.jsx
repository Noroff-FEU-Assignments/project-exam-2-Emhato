import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useAxios from "../hooks/useAxios";

export default function TypeDropdown({register}) {
    const [type, setType] = useState([]);

    const http = useAxios();

    useEffect(function() {
        async function getType() {
            try {
                const response = await http.get("api/accommodations");
                setType(response.data.data);
            } catch(error) {
                console.log(error);
            }
        }

        getType();
    }, []);

    return (
        <select name="accommodation_type" {...register("accommodation_type")}>
            <option value="">Select accommodation type</option>
            {type.map((media) => {
                return (
                    <option key={media.id} value={media.id}>
                        {media.attributes.accommodation_type}
                    </option>
                )
            })}
        </select>
    )
}

TypeDropdown.propTypes = {
    register: PropTypes.func,
};

TypeDropdown.defaultProps = {
    register: () => {},
};