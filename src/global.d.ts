// declare module '*.css' {
//     interface IClassNames {
//         [className: string]: string
//     }
//     const classNames: IClassNames;
//     export = classNames;
// }

// declare const styles: { [className: string]: string };
// export default styles;

declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '@ya.praktikum/react-developer-burger-ui-components' {
    export const BurgerIcon;
    export const Button;
    export const ConstructorElement;
    export const Counter;
    export const CloseIcon;
    export const CurrencyIcon;
    export const DragIcon;
    export const EmailInput;
    export const Input;
    export const ListIcon;
    export const Logo;
    export const PasswordInput;
    export const ProfileIcon;
    export const Tab;
}
