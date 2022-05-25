import PropTypes from "prop-types";

export default function FormError({ children }) {
    // console.log(children)
	return <div className="form-error">{children}</div>;
}

FormError.propTypes = {
	children: PropTypes.node.isRequired,
};

