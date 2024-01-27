import styles from './modal.module.css';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay.jsx';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';


const modal = document.getElementById('modal');

function Modal({ children, title, isOpen, onClose }) {
    useEffect(() => {
        const handleCloseEscape = (evt) => {
            if (evt.key === 'Escape') {
                onClose();
            }
        };
        isOpen && document.addEventListener('keydown', handleCloseEscape);

        return () => {
            document.removeEventListener('keydown', handleCloseEscape);
        }
    }, [isOpen, onClose]);

    const handleCloseOverlay= (evt) => {
        if (evt.target === evt.currentTarget) {
            evt.stopPropagation();
            onClose();
        }
    };

    const handleCloseModal = (evt) => {
        evt.stopPropagation();
        onClose();
    };

    return ReactDOM.createPortal(
        <ModalOverlay onClose={handleCloseOverlay} isOpen={isOpen} >
            <div className={styles.modal}>
                <div className={styles.wrapper}>
                    <h3 className={styles.header}>{title}</h3>
                    <CloseIcon type="primary" onClick={handleCloseModal} />
                </div>
                {children}
            </div>
        </ModalOverlay>,
        modal
    );
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default Modal;
