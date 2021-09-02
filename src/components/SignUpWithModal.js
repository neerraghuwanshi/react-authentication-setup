import * as Yup from 'yup'
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import withModal from '../HOCs/withModal';
import styles from '../css/Login.module.css'
import Colors from '../constants/Colors';
import { SignUpUser } from '../store/functions/auth'
import InputErrorMessage from './InputErrorMessage'
import ErrorModal from './ErrorModal';


function SignUp(props) {

    const { modalVisible, showModal, hideModal } = props

    const dispatch = useDispatch()

    const loading = useSelector(state => state.auth.loading)

    const history = useHistory();

    let passwordFieldValue = ''

    const SignUpSchema = Yup.object().shape({
        email: Yup.string()
            .required('Cannot be Empty')
            .email('E-mail is Invalid'),
        firstName: Yup.string()
            .required('Cannot be Empty')
            .test(
                'firstName-space',
                'Cannot include a White Space',
                (value)=> !/\s/.test(value),
            ).min(2, 'Cannot be Less than 2 Characters')
            .max(20, 'Cannot be Greater than 20 Characters')
            .matches(/^[\x20-\x7F]+$/, 'Allowed ASCII Characters - HEX(20-7F)'),
        lastName: Yup.string()
            .required('Cannot be Empty')
            .test(
                'lastName-space',
                'Cannot include a White Space',
                (value)=> !/\s/.test(value),
            ).min(2, 'Cannot be Less than 2 Characters')
            .max(20, 'Cannot be Greater than 20 Characters')
            .matches(/^[\x20-\x7F]+$/, 'Allowed ASCII Characters - HEX(20-7F)'),
        password: Yup.string()
            .required('Cannot be Empty')
            .test(
                'password-space',
                'Cannot include a White Space',
                (value)=> !/\s/.test(value),
            ).min(8, 'Cannot be Less than 8 Characters')
            .max(20, 'Cannot be Greater than 20 Characters')
            .matches(/[a-z]/, 'Needs a Lower Case Letter')
            .matches(/[A-Z]/, 'Needs an Upper Case Letter')
            .matches(/[0-9]/, 'Needs a Number')
            .matches(/[\W]/, 'Needs a Special Character')
            .matches(/^[\x20-\x7F]+$/, 'Allowed ASCII Characters - HEX(20-7F)'),
        confirmPassword: Yup.string()
            .required('Cannot be Empty')
            .test(
                'password-space',
                'Cannot include a White Space',
                (value) => !/\s/.test(value),
            ).min(8, 'Cannot be Less than 8 Characters')
            .max(20, 'Cannot be Greater than 20 Characters')
            .matches(/[a-z]/, 'Needs a Lower Case Letter')
            .matches(/[A-Z]/, 'Needs an Upper Case Letter')
            .matches(/[0-9]/, 'Needs a Number')
            .matches(/[\W]/, 'Needs a Special Character')
            .matches(/^[\x20-\x7F]+$/, 'Allowed ASCII Characters - HEX(20-7F)')
            .test(
                'confirmPassword=password',
                'Should be equal to Password',
                (value)=> value === passwordFieldValue,
            ),
    })

    const onSubmitHandler = (values) => {
        dispatch(SignUpUser(
            values.email,
            values.firstName,
            values.lastName,
            values.password,
            history,
            showModal,
        ))
    }

    return (
        <Formik
            initialValues={{
                email: '',
                firstName: '',
                lastName: '',
                password: '',
                confirmPassword: '',
            }}
            validationSchema={SignUpSchema}
            onSubmit={onSubmitHandler}>
            {({values}) => {
                passwordFieldValue = values.password
                return (
                    <Form
                        className={styles.form}>

                        <ErrorModal
                            visible={modalVisible}
                            onCancel={hideModal} />

                        {loading ?
                            <Loader
                                type="ThreeDots"
                                color={Colors.signUpButton}
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
                                    type="text"
                                    name="firstName" 
                                    placeholder="First Name"
                                    className={styles.input}/>
                                <ErrorMessage
                                    name="firstName" 
                                    component={InputErrorMessage}/>

                                <Field 
                                    type="text"
                                    name="lastName" 
                                    placeholder="Last Name"
                                    className={styles.input}/>
                                <ErrorMessage
                                    name="lastName" 
                                    component={InputErrorMessage}/>

                                <Field 
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className={styles.input}/>
                                <ErrorMessage
                                    name="password" 
                                    component={InputErrorMessage}/>

                                <Field 
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    className={styles.input} />
                                <ErrorMessage
                                    name="confirmPassword" 
                                    component={InputErrorMessage}/>

                                <button 
                                    type="submit"
                                    className={`${styles.button} ${styles.signUpButton}`}>
                                    Sign Up
                                </button>

                            </>
                        }
                    
                    </Form>
                )
            }}
        </Formik>
    )
}


export default withModal(SignUp)