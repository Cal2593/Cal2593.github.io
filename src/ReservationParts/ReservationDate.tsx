import React, { useState, useRef, ChangeEventHandler, createContext, useContext } from 'react'
import { format, differenceInCalendarDays, isValid, parse, add } from 'date-fns';
import { DayPicker, Row, RowProps } from 'react-day-picker';
import FocusTrap from 'focus-trap-react';
import { usePopper } from 'react-popper';
import './ResDate.css';

export const ReservationDate = (props: any) => {
    //const [ selected, setSelected ] = useState<Date>();
    //const [ inputValue, setInputValue ] = useState<string>('');
    //const [ isPopperOpen, setIsPopperOpen ] = useState(false);

    // const popperRef = useRef<HTMLDivElement>(null);
    // const buttonRef = useRef<HTMLButtonElement>(null);
    // const [ popperElement, setPopperElement ] = useState<HTMLDivElement | null>(null);

    // const popper = usePopper(popperRef.current, popperElement, {
    //     placement: 'bottom-start'
    // });

    // const closePopper = () => {
    //     setIsPopperOpen(false);
    //     buttonRef?.current?.focus();
    // }

    // const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    //     setInputValue(e.currentTarget.value);
    //     const date = parse(e.currentTarget.value, 'y-MM-dd', new Date());
    //     if(isValid(date)) {
    //         setSelected(date);
    //     }else{
    //         setSelected(undefined);
    //     }
    // };

    // const handleButtonClick = () => {
    //     setIsPopperOpen(true);
    // };

//    const handleDaySelect = (date: Date) => {
//     setSelected(date);
//     if(date) {
//         setInputValue(format(date,'dd-MM-y'));
//         closePopper();
//     }else{
//         setInputValue('');
//     }
//    };

    let footer = <p>Please select a date for your reservation</p>
    if(props.select){
        footer = <p>You have selected {format(props.select,'PP')}.</p>
    }

    return (
        <>
            <div className="resInput" ref={props.popRef}>
                <label>
                    Reservation Date: 
                    <input 
                        type="text"
                        placeholder={format(new Date(), 'dd-MM-y')}
                        value={props.inpVal}
                        onChange={props.onChangeFunction}
                        className="input-reset pa2 ma2 bg-white black ba"
                    />
                </label>
                <button
                    ref={props.buttRef}
                    type="button"
                    className="pa2 bg-white button-reset ba"
                    aria-label="Pick a reservation date"
                    onClick={props.onClickFunction}
                >
                    <span role="img" aria-label="calendar icon">
                        📅
                    </span>
                </button>
            </div>
            {props.isPop && (
                <FocusTrap
                    active
                    focusTrapOptions={{
                        initialFocus: false,
                        allowOutsideClick: true,
                        clickOutsideDeactivates: true,
                        onDeactivate: props.closePop,
                        //fallbackFocus: buttonRef.current
                    }}
                >
                    <div
                        tabIndex={-1}
                        style={props.pop.styles.popper}
                        className="dialog-sheet"
                        {...props.pop.attributes.popper}
                        ref={props.setPopperElement}
                        role="dialog"
                    >
                        <DayPicker
                            className='reservation-date-picker'
                            defaultMonth={new Date()}
                            fromDate={new Date()}
                            toDate={add(new Date(), {months: 6})}
                            components={{ Row: OnlyFutureRows }}
                            hidden={isPastDate}
                            showOutsideDays
                            fixedWeeks
                            mode="single"
                            required
                            selected={props.select}
                            onDayClick={props.onDayClickFunction}
                            footer={footer}
                        />
                    </div>
                </FocusTrap>
            )}
        </>
    )
};


function isPastDate(date: Date) {
    return differenceInCalendarDays(date, new Date()) <0;
};

function OnlyFutureRows(props: RowProps) {
    const isPastRow = props.dates.every(isPastDate);
    if (isPastRow) return <></>;
    return <Row {...props} />;
};