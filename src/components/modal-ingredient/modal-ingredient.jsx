import Modal from '../modal/modal.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import ingredientDataTypes from '../../propTypes/ingredientPropsTypes.js';
import PropTypes from 'prop-types';


function ModalIngredient({ ingredient, onClose, isOpen }) {
    return (
        <Modal title={'Детали ингредиента'} onClose={onClose} isOpen={isOpen}>
            <IngredientDetails ingredient={ingredient} />
        </Modal>
    )
}

ModalIngredient.propTypes = {
    ingredient: ingredientDataTypes.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default ModalIngredient;
