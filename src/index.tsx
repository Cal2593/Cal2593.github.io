import React, { useState, ChangeEventHandler } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import { ReservationDate } from './ReservationParts/ReservationDate';
import { TimeDropdown } from './ReservationParts/ReservationTime';
import { Signup } from './SignUpParts/SignUpForm';

const container = document.getElementById('app-root')!
const root = createRoot(container);

class ReservationFields extends React.Component {
    render() {
        return(
            <>
                <div className="main">
                    <div className='leftHand'>
                        <ReservationDate />
                    </div>
                    <div className='rightHand'>
                        <Signup />
                    </div>
                </div>
            </>
        )
    }
    
};

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

const App = () => {
    return <ReservationFields/>
}

root.render(<App />);