import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../ui/modal/modal.jsx';
import OrderDetails from '../order-details/order-details.jsx';
import { resetOrderNumber } from '../../../services/actions/orderDetailsAction.js';


function ModalOrderDetails({ isOpen, onClose }) {
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

ModalOrderDetails.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default ModalOrderDetails;
