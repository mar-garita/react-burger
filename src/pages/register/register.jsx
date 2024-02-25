import styles from '../../styles/form.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import useForm from '../../hooks/useForm.js';
import { fetchRegister } from '../../services/actions/authActions.js';


export function RegistrationPage() {
    const dispatch = useDispatch();

    const {values, handleChange} = useForm({
        name: '',
        email: '',
        password: '',
    });

    const handleRegister = (evt) => {
        evt.preventDefault();
        dispatch(fetchRegister(values));
    }

    return (
        <div className={styles.form_wrapper}>
            <h1 className={styles.form_title}>Регистрация</h1>
            <form className={styles.form} onSubmit={handleRegister}>
                <Input placeholder="Имя" name="name" value={values.name} onChange={handleChange} />
                <EmailInput name="email" value={values.email} onChange={handleChange} />
                <PasswordInput name="password" value={values.password} onChange={handleChange} />
                <Button htmlType="submit" type="primary" size="medium">Зарегистрироваться</Button>
            </form>
            <p className={styles.text}>Уже зарегистрированы?
                <Link to={'/login'}>
                    <Button extraClass={styles.button_secondary} htmlType="button" type="secondary">Войти</Button>
                </Link>
            </p>
        </div>
    )
}
