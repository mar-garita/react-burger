import { useDispatch } from 'react-redux';
import Modal from '../../ui/modal/modal.tsx';
import OrderDetails from '../order-details/order-details.tsx';
import { resetOrderNumber } from '../../../services/actions/orderDetailsAction.ts';


interface IModalOrderDetails {
    isOpen: boolean,
    onClose: () => void,
}

function ModalOrderDetails({ isOpen, onClose }: IModalOrderDetails) {
    const dispatch = useDispatch();

    const closeOrderDetails = () => {
        onClose();
        dispatch(resetOrderNumber());
    }

    return (
        <Modal isOpen={isOpen} onClose={closeOrderDetails}>
            <OrderDetails />
        </Modal>
    )
}

export default ModalOrderDetails;
