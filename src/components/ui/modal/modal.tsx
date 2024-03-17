import styles from './modal.module.css';
import { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay.tsx';


const modal = document.getElementById('modal') as Element;

interface IModal {
    title?: string,
    isOpen: boolean,
    onClose: () => void,
    children: ReactNode,
}

function Modal({ title, isOpen, onClose, children }: IModal) {

    return ReactDOM.createPortal(
        isOpen &&
        <>
            <ModalOverlay isOpen={isOpen} onClose={onClose} />
            <div className={styles.modal}>
                <div className={styles.wrapper}>
                    <h3 className={styles.header}>{title}</h3>
                    <CloseIcon type="primary" onClick={onClose}/>
                </div>
                {children}
            </div>
        </>,
        modal
    );
}

export default Modal;
