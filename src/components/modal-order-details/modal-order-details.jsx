import Modal from '../modal/modal.jsx';
import ModalOverlay from '../modal-overlay/modal-overlay.jsx';
import OrderDetails from '../order-details/order-details.jsx';
import PropTypes from 'prop-types';


function ModalOrderDetails({ isOpen, onClose }) {

    return (
        <>
            <ModalOverlay isOpen={isOpen} onClose={onClose} />
            <Modal isOpen={isOpen} onClose={onClose}>
                <OrderDetails />
            </Modal>
        </>
    )
}

ModalOrderDetails.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default ModalOrderDetails;
