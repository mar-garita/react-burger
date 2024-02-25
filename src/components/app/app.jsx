import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import AppHeader from '../app-header/app-header.jsx';
import { OnlyAuth } from '../protected-route/protected-route.jsx';
import { OnlyUnAuth } from '../protected-route/protected-route.jsx';
import {
    EditProfile,
    ForgotPasswordPage,
    HomePage,
    IngredientPage,
    LoginPage,
    ModalIngredient,
    NotFound404,
    OrdersHistory,
    OrdersPage,
    Profile,
    RegistrationPage,
    ResetPasswordPage
} from '../../pages/index.jsx';
import { fetchUserDetails } from '../../services/actions/authActions.js';
import { fetchIngredients } from '../../services/actions/ingredientsActions.js';


function App() {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect( () => {
        dispatch(fetchIngredients());
        dispatch(fetchUserDetails());
    }, [])

    const state = location.state;

    return (
        <>
            <AppHeader/>
            <Routes location={state?.backgroundLocation || location}>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<OnlyUnAuth component={<LoginPage />} />} />
                <Route path='/register' element={<OnlyUnAuth component={<RegistrationPage />} />} />
                <Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
                <Route path='/reset-password' element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
                <Route path='/orders' element={<OnlyAuth component={<OrdersPage />} />} />
                <Route path='/profile' element={<OnlyAuth component={<Profile />} />} >
                    <Route index element={<OnlyAuth component={<EditProfile />} />} />
                    <Route path='orders' element={<OnlyAuth component={<OrdersHistory />} />} />
                </Route>
                <Route path={'/ingredients/:id'} element={<IngredientPage />} />
                <Route path='*' element={<NotFound404 />} />
            </Routes>

            {state?.backgroundLocation && (
                <Routes>
                    <Route path='/ingredients/:id' element={<ModalIngredient />} />
                </Routes>
            )}
        </>
    )
}

export default App;
