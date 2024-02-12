import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../ui/modal/modal.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import { deleteIngredientDetails } from '../../../services/actions/ingredientDetailsActions.js';


function ModalIngredient({ onClose, isOpen }) {
    const dispatch = useDispatch();

    const handleCloseModal = () => {
        dispatch(deleteIngredientDetails());
        onClose();
    };

    return (
        isOpen &&
        <Modal title={'Детали ингредиента'} onClose={handleCloseModal} isOpen={isOpen}>
            <IngredientDetails />
        </Modal>
    )
}

ModalIngredient.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default ModalIngredient;
