import styles from './draggable-element.module.css';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';


function DraggableElement({ children, index, moveElement, className }) {
    const ref = useRef(null);

    const [{ isDragging}, drag] = useDrag({
        type: "constructorElement", // тип перетаскиваемого элемента
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging() //
        })
    })

    const [, drop] = useDrop({
        accept: "constructorElement",
        // hover - функция, которая вызывается, когда перетаскиваемый элемент наводится на компонент
        hover: (item, monitor) => {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            // Размер элемента, на который наводят
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Координата Y середины элемента, на который наводят
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Текущая позиция курсора
            const clientOffset = monitor.getClientOffset();
            // hoverClientY - вертикальная координата курсора относительно верхней границы элемента,
            // на который наводят
            // clientOffset.y - вертикальная координата курсора относительно верхней границы окна браузера
            // hoverBoundingRect.top - вертикальная координата верхней границы элемента, на который наводят,
            // относительно верхней границы окна браузера
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            // Проверяет, находится ли перетаскиваемый элемент выше элемента, на который наводят,
            // и находится ли курсор в верхней половине элемента, на который наводят.
            // Если оба условия выполняются, то перетаскиваемый элемент не должен перемещаться.
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) { return }
            // Проверяет, находится ли перетаскиваемый элемент ниже элемента, на который наводят,
            // и находится ли курсор в нижней половине элемента, на который наводят.
            // Если оба условия выполняются, то перетаскиваемый элемент также не должен перемещаться.
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) { return }

            moveElement(dragIndex, hoverIndex)
            item.index = hoverIndex
        }
    })

    // Связывание функций drag и drop с элементом через его ref
    // Это делает элемент источником для перетаскивания и целью для принятия перетаскиваемых элементов
    drag(drop(ref));

    const elementClassName = isDragging ? `${styles.invisible}` : `${styles.visible}`

    return (
        <div ref={ref} className={`${className} ${elementClassName}`}>
            {children}
        </div>
    )
}

DraggableElement.propTypes = {
    children: PropTypes.node.isRequired,
    index: PropTypes.number.isRequired,
    moveElement: PropTypes.func.isRequired,
    className: PropTypes.string,
}

export default DraggableElement;
