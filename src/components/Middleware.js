import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Loader from "react-loader-spinner";

import { setInitialAuthState } from '../store/functions/auth'
import styles from '../css/Middleware.module.css'


function Middleware(props) {
    
    const doneSettingInitialState = useSelector(
        state => state.auth.doneSettingInitialState
    )

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(setInitialAuthState())
    }, [dispatch])

    return (
        doneSettingInitialState ? 
            props.children :
            <div className={styles.container}>
                <Loader
                    type="ThreeDots"
                    color="black"
                    height={100}
                    width={100} />
            </div>
    )
}


export default Middleware