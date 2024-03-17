import styles from '../../styles/form.module.css';
import { SyntheticEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import useForm from '../../hooks/useForm.ts';
import { api } from '../../utils/api.ts';


export function ForgotPasswordPage() {
    const navigate = useNavigate();

    const {values, handleChange} = useForm({
        email: ''
    });


    const handleResetPassword = async (evt: SyntheticEvent<HTMLFormElement>) => {
        evt.preventDefault();
        try {
            await api.passwordResetRequest(values as { email: string });
            localStorage.setItem('resetPassword', 'true');
            navigate('/reset-password');
        } catch (error) {
            console.error(`Ошибка при выполнении запроса: ${error}`);
        }
    }

    return (
        <div className={styles.form_wrapper}>
            <h1 className={styles.form_title}>Восстановление пароля</h1>
            <form className={styles.form} onSubmit={handleResetPassword}>
                <EmailInput placeholder="Укажите e-mail" name="email" value={values.email} onChange={handleChange} />
                <Button htmlType="submit" type="primary" size="medium">Восстановить</Button>
            </form>
            <p className={styles.text}>Вспомнили пароль?
                <Link to={'/login'}>
                    <Button extraClass={styles.button_secondary} htmlType="button" type="secondary">Войти</Button>
                </Link>
            </p>
        </div>
    )
}
