import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import styles from "../css/Navbar.module.css";
import { authLogout } from "../store/actions/auth";


function Navbar() {

    const history = useHistory()

    const token = useSelector(state => state.auth.token)

    const dispatch = useDispatch()

    const logout = () => {
        dispatch(authLogout())
        history.push('/')
    }

    return (
        <nav>
            <div className={styles.container}>
                <ul className={styles.ul}>
                    <div className={styles.linksContainer}>
                        <li>
                            <NavLink
                                exact 
                                to="/"
                                className={`${styles.link} ${styles.firstLink}`}
                                activeClassName={styles.activeLink}>
                                Home
                            </NavLink>
                        </li>
                    </div>
                    <div className={styles.linksContainer}>
                        {token ?
                            <li>
                                <button
                                    className={`${styles.link} ${styles.logoutButton}`}
                                    onClick={logout}>
                                    Logout
                                </button>
                            </li> :
                            <>
                                <li>
                                    <NavLink
                                        exact
                                        to="/login"
                                        className={styles.link}
                                        activeClassName={styles.activeLink}>
                                        Login
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        exact
                                        to="/signup"
                                        className={styles.link}
                                        activeClassName={styles.activeLink}>
                                        Sign Up
                                    </NavLink>
                                </li>
                            </>
                        }
                    </div>
                </ul>
            </div>
      </nav>
    )
}


export default Navbar