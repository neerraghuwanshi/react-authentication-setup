import styles from '../css/Wrapper.module.css'


function Wrapper(props) {
    return (
        <div className={styles.container}>
            {props.children}
        </div>
    )
}


export default Wrapper