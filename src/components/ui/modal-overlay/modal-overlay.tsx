import styles from './modal-overlay.module.css';
import React, { useEffect } from 'react';


interface IModalOverlay {
    isOpen: boolean,
    onClose: () => void,
}

function ModalOverlay ({ isOpen, onClose }: IModalOverlay) {
    useEffect(() => {
        const handleCloseEscape = (evt: KeyboardEvent) => {
            if (evt.key === 'Escape') {
                onClose();
            }
        };
        isOpen && document.addEventListener('keydown', handleCloseEscape);

        return () => {
            document.removeEventListener('keydown', handleCloseEscape);
        }
    }, [isOpen, onClose]);

    const handleCloseOverlayClick = (evt: React.MouseEvent<HTMLDivElement>) => {
        evt.stopPropagation();
        onClose();
    };

    return (
        isOpen &&
        <div className={styles.overlay} onClick={handleCloseOverlayClick}></div>
    )
}

export default ModalOverlay;
