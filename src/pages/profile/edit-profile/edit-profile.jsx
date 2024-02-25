import styles from '../../../styles/form.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import useForm from '../../../hooks/useForm.js';
import { getUser } from '../../../services/selectors.js';
import { fetchUpdateUser } from '../../../services/actions/authActions.js';

export function EditProfile() {
    const [inputIsChanged, setInputIsChanged] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(getUser);

    const {values, handleChange, reset} = useForm({
        name: user.name,
        email: user.email,
        password: 'Password',
    });

    const handleEditProfile = (evt) => {
        evt.preventDefault();
        dispatch(fetchUpdateUser(values));
        setInputIsChanged(false);
    }

    const handleChangeInput = (evt) => {
        handleChange(evt);
        setInputIsChanged(true);
    }

    const resetForm = () => {
        reset();
        setInputIsChanged(false);
    }

    return (
        <form className={styles.form} onSubmit={handleEditProfile}>
            <Input icon="EditIcon" placeholder="Имя" name="name" value={values.name} onChange={handleChangeInput}/>
            <EmailInput icon="EditIcon" placeholder="Логин" name="email" value={values.email}
                        onChange={handleChangeInput}/>
            <PasswordInput icon="EditIcon" name="password" value={values.password} onChange={handleChangeInput}/>
            {inputIsChanged &&
                <div className={styles.wrap_buttons}>
                    <Button htmlType="button" type="secondary" onClick={resetForm}>Отменить</Button>
                    <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
                </div>
            }
        </form>
    )
}
