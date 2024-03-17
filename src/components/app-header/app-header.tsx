import styles from './app-header.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { authChecked, getUser } from '../../services/selectors.ts';


function AppHeader() {
    const user = useSelector(getUser);
    const isAuthChecked = useSelector(authChecked);
    const location = useLocation();
    const currentRoute = location.pathname;

    return (
        <header className={styles.header}>
            <div className={styles.wrapper}>
                <nav className={styles.navigation}>
                    <NavLink
                        to='/'
                        className={currentRoute === '/' ? `${styles.link_active}` : `${styles.link_inactive}`}
                    >
                        <BurgerIcon type={currentRoute === '/' ? 'primary' : 'secondary'} />
                        Конструктор
                    </NavLink>
                    <NavLink
                        to='/orders'
                        className={currentRoute === '/orders' ? `${styles.link_active}` : `${styles.link_inactive}`}
                    >
                        <ListIcon type={currentRoute === '/orders' ? 'primary' : 'secondary'} />
                        Лента заказов
                    </NavLink>
                </nav>
                <NavLink to='/' className={styles.logo}>
                    <Logo />
                </NavLink>
                <nav className={styles.profile}>
                    <NavLink
                        to='/profile'
                        className={currentRoute.startsWith('/profile') ? `${styles.link_active}` : `${styles.link_inactive}`}
                    >
                        <ProfileIcon type={currentRoute.startsWith('/profile') ? "primary" : "secondary"} />
                        {!isAuthChecked ? null :
                         user ? user.name : 'Личный кабинет'
                        }
                    </NavLink>
                </nav>
            </div>
        </header>
    )
}

export default AppHeader;
