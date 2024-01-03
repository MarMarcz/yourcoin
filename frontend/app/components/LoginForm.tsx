import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/router';
import Navbar from './Navbar';

const Login = () => {
    const router = useRouter();
    const initialValues = {
        username: '',
        password: '',
    };

    const nothere = {
        username: 'admin',
        password: 'admin0',
    };

    interface Values {
        username: string;
        password: string;
    }

    const login = async (username: string, password: string) => {
        return username === nothere.username && password === nothere.password;
    };

    const handleSubmit = async (values: Values) => {
        const isValid = await login(values.username, values.password);
        if (isValid) {
            localStorage.setItem('isLoggedIn', 'true')
            router.push('/admin');
        } else {
            alert('Invalid login or password');
        }
    }

    return (
        <>
            <Navbar />
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                <Form>
                    <label>Login:</label>
                    <Field name="username" type="text" />
                    <ErrorMessage name="username" component="div" />

                    <label>Password:</label>
                    <Field name="password" type="password" />
                    <ErrorMessage name="password" component="div" />

                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </>
    );
}

export default Login;