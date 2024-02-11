import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';


function ModalOverlay({ isOpen, onClose }) {
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

    const handleCloseOverlayClick = (evt) => {
        evt.stopPropagation();
        onClose();
    };

    return (
        isOpen &&
        <div className={styles.overlay} onClick={handleCloseOverlayClick}></div>
    )
}

ModalOverlay.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default ModalOverlay;
