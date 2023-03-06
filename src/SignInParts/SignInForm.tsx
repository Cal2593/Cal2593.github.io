import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import './SignInForm.css';
import { Link, Route, Routes } from 'react-router-dom';
import axios from "axios";

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

function sendToBackEnd(values:any){
    console.log(values);
    axios.post("http://localhost:8000/", values)
        .then(response => {
            console.log(response);
        })
}

export function Signin() {
    const initialValues = { email: '', password: '' };
    return (
        <div className="section">
            <Formik
                initialValues={initialValues}
                validationSchema={SigninSchema}

                onSubmit={async (values, { setSubmitting }) => {
                    await sleep(500);
                    console.log("Submitting");
                    alert(JSON.stringify(values, null, 2));
                    sendToBackEnd(values);
                    setSubmitting(false);
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