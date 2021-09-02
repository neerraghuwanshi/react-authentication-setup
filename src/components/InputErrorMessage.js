import styles from '../css/InputErrorMessage.module.css'


function InputErrorMessage(props) {
    return (
        <div className={styles.container}>
            {props.children}
        </div>
    )
}


export default InputErrorMessage