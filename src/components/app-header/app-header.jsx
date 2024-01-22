import styles from './app-header.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from "react";

function AppHeader() {
    const [isNavLinkHovered, setIsNavLinkHovered] = useState('');

    const handleMouseEnter = (linkName) => {
        setIsNavLinkHovered(linkName)
    }

    const handleMouseLeave = () => {
        setIsNavLinkHovered('');
    }

    return (
        <header className={styles.header}>
            <div className={styles.wrapper}>
                <nav className={styles.navigation}>
                    <a href="#"
                       onMouseEnter={() => handleMouseEnter('constructor')}
                       onMouseLeave={handleMouseLeave}
                       className={isNavLinkHovered === 'constructor' ? `${styles.link_active}` : `${styles.link_inactive}`}
                    >
                        <BurgerIcon type={isNavLinkHovered === 'constructor' ? "primary" : "secondary"} />
                        Конструктор
                    </a>

                    <a href="#"
                       onMouseEnter={() => handleMouseEnter('order-list')}
                       onMouseLeave={handleMouseLeave}
                       className={isNavLinkHovered === 'order-list' ? `${styles.link_active}` : `${styles.link_inactive}`}
                    >
                        <ListIcon type={isNavLinkHovered === 'order-list' ? "primary" : "secondary"} />
                        Лента заказов
                    </a>
                </nav>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <div className={styles.profile}>
                    <a href="#"
                       onMouseEnter={() => handleMouseEnter('profile')}
                       onMouseLeave={handleMouseLeave}
                       className={isNavLinkHovered === 'profile' ? `${styles.link_active}` : `${styles.link_inactive}`}
                    >
                        <ProfileIcon type={isNavLinkHovered === 'profile' ? "primary" : "secondary"} />
                        Личный кабинет
                    </a>
                </div>
            </div>
        </header>
    )
}

export default AppHeader;
