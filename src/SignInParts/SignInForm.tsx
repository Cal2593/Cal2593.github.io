import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import './SignInForm.css';
import { Link, Route, Routes } from 'react-router-dom';
import { SignUp } from '../pages/Signup';

const sleep = (ms: number) => new Promise((r) => setTimeout(r,ms));

const MyTextInput = ({ label, ...props }: {[x: string]: any; name: string }) => {
    const [ field, meta ] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

const SigninSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    password: Yup.string()
        .required('Required')
})

export function Signin() {

    const initialValues = { email: '', password: '' };
    return (
        <div className="section">
            <Formik
                initialValues={initialValues}
                validationSchema={SigninSchema}

                onSubmit={async (values) => {
                    await sleep(500);
                    alert(JSON.stringify(values, null, 2));
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <MyTextInput 
                            label="Email Address"
                            name="email"
                            type="email"
                            placeholder="janedoe@carssomanycars.com"
                        />

                        <MyTextInput
                            label="Password"
                            name="password"
                            type="password"
                        />
                        <Link to={'/pages/Signup'} replace={true}>I don't have an account</Link>
                        <br />
                        <button type="submit" disabled={isSubmitting}>Sign in</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};