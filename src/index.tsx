import React, { useState, useRef, ChangeEventHandler } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import { ReservationDate } from './ReservationParts/ReservationDate';

const container = document.getElementById('app-root')!
const root = createRoot(container);

const App = () => (
    <>
        <h1>Cars...so many cars...</h1>
        <ReservationDate />
    </>
);

function ReservationForm() {
const [resDate, setDate] = React.useState('');
const [resStartTime, setStart] = React.useState('');
const [resDuration, setDuration] = React.useState('');

const handleChange = (event: any) => {
    setDate(event.target.value);
    setStart(event.target.value);
    setDuration(event.target.value);
};

    return (
        <form>
        <label>
            Reservation date:
            <input 
                type="date" 
                value={resDate} 
                onChange={handleChange} 
            />
        </label>
        <label>
            Duration of reservation:
            <input 
                type="time" 
                value={resStartTime} 
                onChange={handleChange} 
            />
        </label>
        </form>
    );
};

root.render(<App />);