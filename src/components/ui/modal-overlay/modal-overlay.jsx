import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteIngredientDetails } from '../../../services/actions/ingredientDetailsActions.js';


function ModalOverlay({ isOpen, onClose }) {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleCloseEscape = (evt) => {
            if (evt.key === 'Escape') {
                dispatch(deleteIngredientDetails());
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
        dispatch(deleteIngredientDetails());
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
