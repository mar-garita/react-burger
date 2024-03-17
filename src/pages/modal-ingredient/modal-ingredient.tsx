import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/ui/modal/modal.tsx';
import IngredientDetails from '../../components/burger-ingredients/ingredient-details/ingredient-details.tsx';
import { deleteIngredientDetails } from '../../services/actions/ingredientDetailsActions.ts';
import useModal from "../../hooks/useModal.ts";


export function ModalIngredient() {
    const { onCloseModal } = useModal();
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
