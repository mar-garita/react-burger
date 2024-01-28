import Modal from '../modal/modal.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import ingredientDataTypes from '../../propTypes/ingredientPropsTypes.js';
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay.jsx';


function ModalIngredient({ ingredient, onClose, isOpen }) {
    const handleCloseModal = (evt) => {
        evt.stopPropagation();
        onClose();
    };

    return (
        isOpen &&
        <>
            <ModalOverlay isOpen={isOpen} onClose={onClose} />
            <Modal title={'Детали ингредиента'} onClose={handleCloseModal} isOpen={isOpen}>
                <IngredientDetails ingredient={ingredient} />
            </Modal>
        </>
    )
}

ModalIngredient.propTypes = {
    ingredient: ingredientDataTypes.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default ModalIngredient;
