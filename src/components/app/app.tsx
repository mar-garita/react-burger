import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import AppHeader from '../app-header/app-header.tsx';
import { OnlyAuth } from '../protected-route/protected-route.tsx';
import { OnlyUnAuth } from '../protected-route/protected-route.tsx';
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
} from '../../pages/pages.ts';
import { fetchUserDetails } from '../../services/actions/authActions.ts';
import { fetchIngredients } from '../../services/actions/ingredientsActions.ts';


function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const state = location.state;

    useEffect( () => {
        //@ts-ignore
        dispatch(fetchIngredients());
        //@ts-ignore
        dispatch(fetchUserDetails());
    }, [])

    return (
        <>
            <AppHeader/>
            <Routes location={state?.backgroundLocation || location}>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<OnlyUnAuth component={LoginPage} />} />
                <Route path='/register' element={<OnlyUnAuth component={RegistrationPage} />} />
                <Route path='/forgot-password' element={<OnlyUnAuth component={ForgotPasswordPage} />} />
                <Route path='/reset-password' element={<OnlyUnAuth component={ResetPasswordPage} />} />
                <Route path='/orders' element={<OnlyAuth onlyUnAuth={false}  component={OrdersPage} />} />
                <Route path='/profile' element={<OnlyAuth onlyUnAuth={false}  component={Profile} />} >
                    <Route index element={<OnlyAuth onlyUnAuth={false}  component={EditProfile} />} />
                    <Route path='orders' element={<OnlyAuth onlyUnAuth={false}  component={OrdersHistory} />} />
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
