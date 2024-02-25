import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/ui/modal/modal.jsx';
import IngredientDetails from '../../components/burger-ingredients/ingredient-details/ingredient-details.jsx';
import { deleteIngredientDetails } from '../../services/actions/ingredientDetailsActions.js';
import useModal from "../../hooks/useModal.js";


export function ModalIngredient() {
    const { onCloseModal } = useModal(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isOpen = true;

    const handleCloseModal = () => {
        dispatch(deleteIngredientDetails());
        onCloseModal();
        navigate('/');
    };

    return (
        <Modal title={'Детали ингредиента'} onClose={handleCloseModal} isOpen={isOpen}>
            <IngredientDetails />
        </Modal>
    )
}
