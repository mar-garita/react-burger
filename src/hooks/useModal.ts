import { useState } from 'react';


interface IUseModal {
    isOpen: boolean;
    onOpenModal: () => void;
    onCloseModal: () => void;
}

const useModal = (): IUseModal => {
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
