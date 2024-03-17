import styles from '../../styles/form.module.css';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import useForm from '../../hooks/useForm.ts';
import { api } from '../../utils/api.ts';


export function ResetPasswordPage() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('resetPassword')) {
            navigate('/forgot-password');
        }
    }, [navigate]);

    const {values, handleChange} = useForm({
        password: '',
        token: '',
    });

    const handleResetConfirm = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        try {
            await api.passwordResetConfirm(values as { token: string; password: string; });
            navigate('/login');
            localStorage.removeItem('resetPassword');
        } catch (error) {
            console.error(`Ошибка при выполнении запроса: ${error}`);
        }
    }

    return (
        <div className={styles.form_wrapper}>
            <h1 className={styles.form_title}>Восстановление пароля</h1>
            <form className={styles.form} onSubmit={handleResetConfirm}>
                <PasswordInput placeholder="Введите новый пароль" name="password" value={values.password} onChange={handleChange} />
                <Input placeholder="Введите код из письма" name="token" value={values.token} onChange={handleChange} />
                <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
            </form>
            <p className={styles.text}>Вспомнили пароль?
                <Link to={'/login'}>
                    <Button extraClass={styles.button_secondary} htmlType="button" type="secondary">Войти</Button>
                </Link>
            </p>
        </div>
    )
}
