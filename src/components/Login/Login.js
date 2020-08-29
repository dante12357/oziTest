import React from 'react';
import {Field, Form, Formik} from "formik";
import Button from "../Button";
import * as yup from "yup";
import PropTypes from "prop-types";


const Login = props =>{

    const {profileState, authState} = props;

    const ReviewSchema = yup.object()
        .shape(
            {
                email: yup.string().email('Невалидный email')
                    .required('Введите email'),
                password: yup.string()
                    .min(4, 'Минимальная длинна 4 символов')
                    .required('Введите пароль'),
            });
    return(
        <Formik initialValues={{
            clientId: '1',
            email: '',
            password: ''
        }}
                validationSchema={ReviewSchema}
                onSubmit={(values, actions) => {
                    fetch('https://tager.dev.ozitag.com/api/auth/user', {
                        method: 'POST',
                        body: JSON.stringify(values),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then((response) => {
                        return response.json();
                    }).then((resData) => {
                        localStorage.setItem('accessToken', resData.data.accessToken);
                        authState(localStorage.getItem('accessToken'));

                        if (localStorage.getItem('accessToken')) {
                            fetch('https://tager.dev.ozitag.com/api/user/profile', {
                                method: 'GET',
                                headers: {
                                    'Accept': 'application/json, text/plain, */*',
                                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                                    'Content-Type': 'application/json'
                                }
                            }).then((response) => {
                                return response.json();
                            })
                                .then((resData) => {
                                    profileState(resData.data)
                                })

                        }

                    })

                }}>
            {({errors, handleChange, touched, handleBlur}) => (
                <Form autoComplete="off">
                    <div>
                        <div>
                            <Field type='text' name='email'
                                   placeholder='Введите логин'
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                            />{errors.email && touched.email && <div>{errors.email}</div>}
                        </div>
                        <div>
                            <Field type='password' name='password'
                                   placeholder='Введите пароль'
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                            />{errors.password && touched.password && <div>{errors.password}</div>}
                        </div>

                        <Button type='submit' value='Войти'/>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

Login.PropsType = {
    profileState: PropTypes.func,
    authState: PropTypes.func,
}

export default Login;
