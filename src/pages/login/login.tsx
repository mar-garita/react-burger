import styles from '../../styles/form.module.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import useForm from '../../hooks/useForm.ts';
import { fetchLogin } from '../../services/actions/authActions.ts';


export function LoginPage() {
    const dispatch = useDispatch();

    const {values, handleChange} = useForm({
        email: '',
        password: ''
    });

    const handleLogin = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        //@ts-ignore
        dispatch(fetchLogin(values));
    }

    return (
        <div className={styles.form_wrapper}>
            <h1 className={styles.form_title}>Вход</h1>
            <form className={styles.form} onSubmit={handleLogin}>
                <EmailInput name="email" value={values.email} onChange={handleChange} />
                <PasswordInput name="password" value={values.password} onChange={handleChange} />
                <Button htmlType="submit" type="primary" size="medium">Войти</Button>
            </form>
            <div className={styles.wrap_text}>
                <p className={styles.login_text}>Вы — новый пользователь?
                    <Link to={'/register'}>
                        <Button extraClass={styles.button_secondary} htmlType="button" type="secondary">
                            Зарегистрироваться
                        </Button>
                    </Link>
                </p>
                <p className={styles.login_text}>Забыли пароль?
                    <Link to={'/forgot-password'}>
                        <Button extraClass={styles.button_secondary} htmlType="button" type="secondary">
                            Восстановить пароль
                        </Button>
                    </Link>
                </p>
            </div>
        </div>
    )
}
