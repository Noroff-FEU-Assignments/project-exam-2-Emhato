import PropTypes from 'prop-types';

export default function Heading({size = "1", title}) {
  const HeadingSize = `h${size}`

  return <HeadingSize>{title}</HeadingSize>

}

Heading.propTypes = {
  title: PropTypes.string,
};