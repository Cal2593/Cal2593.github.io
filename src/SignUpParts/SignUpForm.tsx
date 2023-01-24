import React, { useState, useRef } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import './SignUpForm.css';
import { usePopper } from 'react-popper';
import FocusTrap from 'focus-trap-react';

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

const MyCheckbox = ({ children, ...props }: {[x: string]: any; name: string }) => {
    const [ field, meta ] = useField({...props, type: 'checkbox'});
    return (
        <div>
            <label className="checkbox-input">
                <input type="checkbox" {...field} {...props} />
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ): null}
        </div>
    );
};

const MySelect = ({ label, ...props }: {[x: string]: any; name: string }) => {
    const [ field, meta ] = useField(props);
    return (
        <div>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ): null}
        </div>
    );
};

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Must be at least 2 characters or more')
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Must be at least 2 characters or more')
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    paymentPlan: Yup.string()
        .oneOf(
            [ 'annual', 'monthly', 'none' ],
            'Invalid Subscription Type'
        )
        .required('Required'),
    acceptedTerms: Yup.boolean()
            .required('Required')
            .oneOf([true], 'You must accept the terms and conditions.')
})

export function Signup() {
    const [ isPopperOpen, setIsPopperOpen ] = useState(false);

    const popperRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [ popperElement, setPopperElement ] = useState<HTMLDivElement | null>(null);

    const popper = usePopper(popperRef.current, popperElement, {
        placement: 'bottom-start'
    });

    const closePopper = () => {
        setIsPopperOpen(false);
        buttonRef?.current?.focus();
    };

    const handleButtonClick = () => {
            setIsPopperOpen(true);
    };

    const initialValues = { firstName: '', lastName: '', email: '', paymentPlan: '', acceptedTerms: false };
    return (
        <div ref={popperRef}>
            <button
                ref={buttonRef}
                type="button"
                className='createaccountbutton'
                aria-label="Create an account"
                onClick={handleButtonClick}
            >
                Sign in / Create Account
            </button>
            {isPopperOpen && (
                <FocusTrap
                    active
                    focusTrapOptions={{
                        initialFocus: false,
                        allowOutsideClick: true,
                        clickOutsideDeactivates: true,
                        onDeactivate: closePopper,
                    }}
                >
                    <div
                        tabIndex={-1}
                        style={popper.styles.popper}
                        className="dialog-sheet"
                        {...popper.attributes.popper}
                        ref={setPopperElement}
                        role="dialog"
                    >
                        <div className="section">
                            <h1>Create an account!</h1>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={SignupSchema}

                                onSubmit={async (values) => {
                                    await sleep(500);
                                    setIsPopperOpen(false);
                                    alert(JSON.stringify(values, null, 2));
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <MyTextInput 
                                            label="First Name"
                                            name="firstName"
                                            type="text"
                                            placeholder="Jane"
                                        />

                                        <MyTextInput 
                                            label="Last Name"
                                            name="lastName"
                                            type="text"
                                            placeholder="Doe"
                                        />

                                        <MyTextInput 
                                            label="Email Address"
                                            name="email"
                                            type="email"
                                            placeholder="janedoe@carssomanycars.com"
                                        />

                                        <MySelect label="Subscription" name="paymentPlan">
                                            <option value="">Select a subscription</option>
                                            <option value="annual">Annual Subscription</option>
                                            <option value="monthly">Monthly Subscription</option>
                                            <option value="none">No Subscription</option>
                                        </MySelect>

                                        <MyCheckbox name="acceptedTerms">
                                            I accept the terms and conditions
                                        </MyCheckbox>

                                        <button type="submit" disabled={isSubmitting}>Submit</button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </FocusTrap>
            )}
        </div>
    );
};