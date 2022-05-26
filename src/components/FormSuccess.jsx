import PropTypes from 'prop-types';

export default function FormSuccess({content}) {
  return <p className="success-styling">{content}</p>
}

FormSuccess.propTypes = {
  content: PropTypes.string,
};