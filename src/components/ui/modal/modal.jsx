import styles from './modal.module.css';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const modal = document.getElementById('modal');

function Modal({ children, title, isOpen, onClose }) {

    return ReactDOM.createPortal(
        isOpen &&
            <div className={styles.modal}>
                <div className={styles.wrapper}>
                    <h3 className={styles.header}>{title}</h3>
                    <CloseIcon type="primary" onClick={onClose}/>
                </div>
                {children}
            </div>,
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
