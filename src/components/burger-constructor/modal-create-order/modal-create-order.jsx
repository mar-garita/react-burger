import Loader from '../../ui/loader/loader.jsx';
import Modal from '../../ui/modal/modal.jsx';
import PropTypes from "prop-types";


function ModalCreateOrder({ isOpen, onClose }) {
    return (
        <Modal title='Оформляем заказ...' isOpen={isOpen} onClose={onClose}>
            <Loader />
        </Modal>
    )
}

ModalCreateOrder.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default ModalCreateOrder;
