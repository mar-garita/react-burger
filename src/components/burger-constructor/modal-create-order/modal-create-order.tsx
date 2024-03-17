import Loader from '../../ui/loader/loader.tsx';
import Modal from '../../ui/modal/modal.tsx';


interface IModalCreateOrder {
    isOpen: boolean,
    onClose: () => void,
}
function ModalCreateOrder({ isOpen, onClose }: IModalCreateOrder) {
    return (
        <Modal title='Оформляем заказ...' isOpen={isOpen} onClose={onClose}>
            <Loader />
        </Modal>
    )
}

export default ModalCreateOrder;
