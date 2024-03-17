import styles from './not-found.module.css';
import { Link } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';


export function NotFound404() {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Oops! 404 Error</h1>
            <p className={styles.text}>The page you requested does not exist</p>
            <p className={styles.text}>check the address or try
                <Link to='/'>
                    <Button extraClass={styles.button_secondary} htmlType="button" type="secondary">
                        homepage
                    </Button>
                </Link>
            </p>
        </div>
    )
}
