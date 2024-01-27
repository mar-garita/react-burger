import { useState } from 'react';

const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onOpenModal = () => {
        console.log('Открываю модалку')
        setIsOpen(true);
    }

    const onCloseModal = () => {
        console.log('Закрываю модалку')
        setIsOpen(false);
    }

    return [
        isOpen,
        onOpenModal,
        onCloseModal
    ]
}

export default useModal;
