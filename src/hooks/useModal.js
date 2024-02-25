import { useState } from 'react';

const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onOpenModal = () => {
        setIsOpen(true);
    }

    const onCloseModal = () => {
        setIsOpen(false);
    }

    return {
        isOpen,
        onOpenModal,
        onCloseModal
    }
}

export default useModal;
