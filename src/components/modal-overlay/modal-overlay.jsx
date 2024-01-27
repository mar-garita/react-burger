import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';


function ModalOverlay({ children, isOpen, onClose }) {
    return (
        <div className={isOpen ? styles.overlay_opened : styles.overlay_closed} onClick={onClose}>
            {children}
        </div>
    )
}

ModalOverlay.propTypes = {
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default ModalOverlay;
