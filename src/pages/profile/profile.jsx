import styles from './profile.module.css';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileNavigation from '../../components/profile-components/profile-navigation/profile-navigation.jsx';
import Loader from '../../components/ui/loader/loader.jsx';
import { getUser } from '../../services/selectors.js';


export function Profile() {
    const user = useSelector(getUser);

    return (
        <div className={styles.wrapper}>
            <ProfileNavigation />
            {user ? <Outlet /> : <Loader />}
        </div>
    )
}
