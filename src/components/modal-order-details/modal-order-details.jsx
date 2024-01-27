import Modal from '../modal/modal.jsx';
import OrderDetails from '../order-details/order-details.jsx';
import PropTypes from 'prop-types';


function ModalOrderDetails({ isOpen, onClose }) {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <OrderDetails />
        </Modal>
    )
}

ModalOrderDetails.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default ModalOrderDetails;
