import React, {useState, useRef, ChangeEventHandler} from "react";
import { format, isValid, parse} from 'date-fns';
import { ReservationDate } from "./ReservationDate";
import { Formik, Form, useField } from 'formik';
import { usePopper } from 'react-popper';
import * as Yup from 'yup';
import './ReservationSelector.css';
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

const ReservationSchema = Yup.object().shape({
    starttime: Yup.number()
        .oneOf(
            [6,7,8,9,10,11,12,13,14,15,15,17,18,19],
            'Invalid starting hour'
        )
        .required('Required'),
    startminutes: Yup.number()
        .oneOf(
            [0,15,30,45],
            'Invalid starting time'
        )
        .required('Required'),
    endtime: Yup.number()
        .max(20, 'Booking cannot end later that 20:00')
        .required('Required'),
    endminutes: Yup.number()
        .oneOf(
            [0,15,30,45],
            'Invalid ending time'
        )
        .required('Required'),
    vehicleregistration: Yup.string()
        .length(7, 'Must be 7 characters')
        .required('Required'),
    location: Yup.string()
        .required('Required'),
})

function sendToBackEnd(values: any) {
    console.log(values);
    axios.post("http://localhost:8000/", values)
        .then(response => {
            console.log(response);
    })
}

export function ReservationSelector() {
    const initialValues = {};
    const startHoursOptions: number[] = [6,7,8,9,10,11,12,13,14,15,16,17,18,19];
    const minutesOptions: number[] = [0,15,30,45];
    const endHoursOptions: number[] = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

    const [ selected, setSelected ] = useState<Date>();
    const [ inputValue, setInputValue ] = useState<string>('');
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
    }

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setInputValue(e.currentTarget.value);
        const date = parse(e.currentTarget.value, 'y-MM-dd', new Date());
        if(isValid(date)) {
            setSelected(date);
        }else{
            setSelected(undefined);
        }
    };

    const handleButtonClick = () => {
        setIsPopperOpen(true);
    };

    const handleDaySelect = (date: Date) => {
        setSelected(date);
        if(date) {
            setInputValue(format(date,'dd-MM-y'));
            closePopper();
        }else{
            setInputValue('');
        }
    };

    return(
        <div className="reservationSelector">
            <Formik
                initialValues={initialValues}
                validationSchema={ReservationSchema}
                
                onSubmit={async (values, { setSubmitting }) => {
                    await sleep(500);
                    console.log("Submitting");
                    values = {...values, date: selected, type: "Reservation Request"};
                    alert(JSON.stringify(values, null, 2));
                    sendToBackEnd(values);
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="top">
                            <ReservationDate 
                                onClickFunction={handleButtonClick} 
                                buttRef={buttonRef}
                                select={selected}
                                popRef={popperRef}
                                inpVal={inputValue}
                                onChangeFunction={handleInputChange}
                                isPop={isPopperOpen}
                                closePop={closePopper}
                                pop={popper}
                                popEl={popperElement}
                                onDayClickFunction={handleDaySelect}
                            />
                            <MySelect label = "Location" name="location">
                                <option value="">Select a location</option>
                                <option value="bristol">Bristol</option>
                                <option value="gloucester">Gloucester</option>
                                <option value="yate">Yate</option>
                            </MySelect>
                        </div>
                        <div className="startTimeSetter">
                            <MySelect label="Start Hours" name="starttime">
                                <option value=""></option>
                                {startHoursOptions.map(i =>
                                    <option key={i} value={i}>{i}</option>    
                                )}
                            </MySelect>
                            <MySelect label="Start Minutes" name="startminutes">
                                <option value=""></option>
                                    {minutesOptions.map(i =>
                                        <option key={i} value={i}>{i}</option>    
                                    )}
                            </MySelect>
                            <MySelect label="End Hours" name="endtime">
                                <option value=""></option>
                                    {endHoursOptions.map(i =>
                                        <option key={i} value={i}>{i}</option>    
                                    )}
                            </MySelect>
                            <MySelect label="End Minutes" name="endminutes">
                                <option value=""></option>
                                    {minutesOptions.map(i =>
                                        <option key={i} value={i}>{i}</option>    
                                    )}
                            </MySelect>
                        </div>
                        <MyTextInput 
                            label="Vehicle Registration"
                            name="vehicleregistration"
                            type="text"
                            placeholder="WF58 YAX"
                        />
                        <div className="resChecks">
                            <MyCheckbox name="electricCharging">
                                Electric Charging
                            </MyCheckbox>
                            <MyCheckbox name="covered">
                                Under Cover Bay
                            </MyCheckbox>
                            <MyCheckbox name="valet">
                                Valet Parking
                            </MyCheckbox>
                            <MyCheckbox name="accessible">
                                Accessible
                            </MyCheckbox>
                        </div>
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}   
