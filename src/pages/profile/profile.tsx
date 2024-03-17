import styles from './profile.module.css';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileNavigation from '../../components/profile-components/profile-navigation/profile-navigation.tsx';
import Loader from '../../components/ui/loader/loader.tsx';
import { getUser } from '../../services/selectors.ts';


export function Profile() {
    const user = useSelector(getUser);

    return (
        <div className={styles.wrapper}>
            <ProfileNavigation />
            {user ? <Outlet /> : <Loader />}
        </div>
    )
}
