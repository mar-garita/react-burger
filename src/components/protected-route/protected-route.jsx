import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../ui/loader/loader.jsx';
import { authChecked, getUser } from '../../services/selectors.js';
import PropTypes from "prop-types";

const ProtectedRoute = ({ onlyUnAuth = false, component }) => {
    const isAuthChecked = useSelector(authChecked); // показывает произведена ли проверка токена
    const user = useSelector(getUser);
    const location = useLocation();

    if (!isAuthChecked) {
        return <Loader />;
    }

    // Роут для неавторизованного пользователя && юзер авторизован
    if (onlyUnAuth && user) {
        // Редирект юзера на главную страницу или на тот адрес, что записан в location.state.from
        const { from } = location.state || { from: { pathname: '/' } };
        return <Navigate to={from} />
    }

    // Роут для авторизованного пользователя && юзер не авторизован
    if (!onlyUnAuth && !user) {
        return <Navigate to='/login' state={{ from: location }} />
    }

    // Роут для авторизованного пользователя && юзер авторизован
    return component;
}

ProtectedRoute.propTypes = {
    onlyUnAuth: PropTypes.bool,
    component: PropTypes.node.isRequired,
}

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({ component }) => (
    <ProtectedRoute onlyUnAuth={true} component={component} />
);
