import React, { useState, useRef, ChangeEventHandler } from 'react'
import { format, differenceInCalendarDays, isValid, parse, add } from 'date-fns';
import { DayPicker, Row, RowProps } from 'react-day-picker';
import FocusTrap from 'focus-trap-react';
import { usePopper } from 'react-popper';
import './ResDate.css';

export const ReservationDate = () => {
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

    let footer = <p>Please select a date for your reservation</p>
    if(selected){
        footer = <p>You have selected {format(selected,'PP')}.</p>
    }

    return (
        <div>
            <div ref={popperRef}>
                <label>
                    Reservation Date: 
                    <input 
                        type="text"
                        placeholder={format(new Date(), 'dd-MM-y')}
                        value={inputValue}
                        onChange={handleInputChange}
                        className="input-reset pa2 ma2 bg-white black ba"
                    />
                </label>
                <button
                    ref={buttonRef}
                    type="button"
                    className="pa2 bg-white button-reset ba"
                    aria-label="Pick a reservation date"
                    onClick={handleButtonClick}
                >
                    <span role="img" aria-label="calendar icon">
                        📅
                    </span>
                </button>
            </div>
            {isPopperOpen && (
                <FocusTrap
                    active
                    focusTrapOptions={{
                        initialFocus: false,
                        allowOutsideClick: true,
                        clickOutsideDeactivates: true,
                        onDeactivate: closePopper,
                        //fallbackFocus: buttonRef.current
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
                        <DayPicker
                            defaultMonth={new Date()}
                            fromDate={new Date()}
                            toDate={add(new Date(), {months: 6})}
                            components={{ Row: OnlyFutureRows }}
                            hidden={isPastDate}
                            showOutsideDays
                            fixedWeeks
                            mode="single"
                            required
                            selected={selected}
                            onDayClick={handleDaySelect}
                            footer={footer}
                        />
                    </div>
                </FocusTrap>
            )}
        </div>
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