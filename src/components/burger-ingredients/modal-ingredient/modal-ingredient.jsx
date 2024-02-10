import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../ui/modal/modal.jsx';
import ModalOverlay from '../../ui/modal-overlay/modal-overlay.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import { deleteIngredientDetails } from '../../../services/actions/ingredientDetailsActions.js';


function ModalIngredient({ onClose, isOpen }) {
    const dispatch = useDispatch();

    const handleCloseModal = (evt) => {
        evt.stopPropagation();
        dispatch(deleteIngredientDetails());
        onClose();
    };

    return (
        isOpen &&
        <>
            <ModalOverlay isOpen={isOpen} onClose={onClose} />
            <Modal title={'Детали ингредиента'} onClose={handleCloseModal} isOpen={isOpen}>
                <IngredientDetails />
            </Modal>
        </>
    )
}

ModalIngredient.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default ModalIngredient;
