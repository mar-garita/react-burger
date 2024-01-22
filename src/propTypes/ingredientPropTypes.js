import PropTypes from "prop-types";

const ingredientDataTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
});

export default ingredientDataTypes;
