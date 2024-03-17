import styles from './draggable-element.module.css';
import {ReactNode, useRef} from 'react';
import { useDrag, useDrop } from 'react-dnd';


interface IDraggableElement {
    index: number,
    moveElement: (dragIndex: number, hoverIndex: number) => void,
    className: string,
    children: ReactNode,
}

interface IDragItem {
    index: number
    id: string
    type: string
}

function DraggableElement({ index, moveElement, className, children }: IDraggableElement) {
    const ref = useRef<HTMLDivElement>(null);

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
        hover: (item: IDragItem, monitor) => {
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
            if (!clientOffset) {
                return;
            }
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

export default DraggableElement;
