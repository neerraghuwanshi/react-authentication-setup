import * as Yup from 'yup'
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import withModal from '../HOCs/withModal';
import styles from '../css/Login.module.css'
import Colors from '../constants/Colors';
import { LoginUser } from '../store/functions/auth'
import InputErrorMessage from './InputErrorMessage'
import ErrorModal from './ErrorModal';


function Login(props) {

    const { modalVisible, showModal, hideModal } = props

    const dispatch = useDispatch()

    const loading = useSelector(state => state.auth.loading)

    const history = useHistory();

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .required('Cannot be Empty')
            .email('E-mail is Invalid'),
        password: Yup.string()
            .required('Cannot be Empty')
            .test(
                'password-space',
                'Cannot include a White Space',
                (value) => !/\s/.test(value),
            )
            .min(8, 'Cannot be Less than 8 Characters')
            .max(20, 'Cannot be Greater than 20 Characters')
            .matches(/[a-z]/, 'Needs a Lower Case Letter')
            .matches(/[A-Z]/, 'Needs an Upper Case Letter')
            .matches(/[0-9]/, 'Needs a Number')
            .matches(/[\W]/, 'Needs a Special Character')
            .matches(/^[\x20-\x7F]+$/, 'Allowed ASCII Characters - HEX(20-7F)'),
    })

    const onSubmitHandler = (values) => {
        dispatch(LoginUser(
            values.email,
            values.password,
            history,
            showModal,
        ))
    }

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={onSubmitHandler}>

            <Form
                className={styles.form}>

                <ErrorModal
                    visible={modalVisible}
                    onCancel={hideModal} />

                {loading ?
                    <Loader
                        type="ThreeDots"
                        color={Colors.loginButton}
                        height={100}
                        width={100} /> :
                    <>

                        <Field 
                            type="email"
                            name="email" 
                            placeholder="E-mail"
                            className={styles.input}/>
                        <ErrorMessage
                            name="email"
                            component={InputErrorMessage}/>

                        <Field 
                            type="password"
                            name="password"
                            placeholder="Password"
                            className={styles.input}/>
                        <ErrorMessage
                            name="password" 
                            component={InputErrorMessage}/>

                        <button
                            type="submit"
                            className={`${styles.button} ${styles.loginButton}`}>
                            Login
                        </button>

                    </>
                }

            </Form>

        </Formik>
    )
}


export default withModal(Login)