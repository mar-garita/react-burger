import styles from './profile-navigation.module.css';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { fetchLogout } from '../../../services/actions/authActions.ts';
import { useDispatch } from 'react-redux';


function ProfileNavigation() {
    const dispatch = useDispatch();
    const location = useLocation();
    const currentRoute = location.pathname;

    const handleLogout = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        evt.preventDefault();
        //@ts-ignore
        dispatch(fetchLogout());
    }

    return (
        <div className={styles.wrapper}>
            <nav className={styles.nav}>
                <NavLink
                    to={'/profile'}
                    className={currentRoute === '/profile' ? `${styles.link_active}` : `${styles.link}`}
                >
                    Профиль
                </NavLink>
                <NavLink
                    to={'/profile/orders'}
                    className={currentRoute === '/profile/orders' ? `${styles.link_active}` : `${styles.link}`}
                >
                    История заказов
                </NavLink>
                <NavLink to={'/login'} className={styles.link} onClick={handleLogout}
                >
                    Выход
                </NavLink>
            </nav>
            <p className={styles.caption}>В этом разделе вы можете<br/>изменить свои персональные данные</p>
        </div>
    )
}

export default ProfileNavigation;
