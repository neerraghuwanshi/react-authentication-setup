import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux"

import styles from '../css/Home.module.css'


function Home() {
    const name = useSelector(state => state.auth.name)
    
    return (
        <div className={styles.container}>
            {name ?
                <h2 className={`${styles.heading} ${styles.lightFont}`}>
                    Hello {name}
                </h2> :
                <>
                    <NavLink 
                        to='login'
                        className={styles.link}>
                        <div className={styles.loginContainer}>
                            <h2 className={styles.heading}>
                                Login
                            </h2>
                        </div>
                    </NavLink>
                    <NavLink 
                        to='signUp'
                        className={styles.link}>
                        <div className={styles.signUpContainer}>
                            <h2 className={styles.heading}>
                                Sign Up
                            </h2>
                        </div>
                    </NavLink>
                </>
            }
        </div>
    )
}


export default Home