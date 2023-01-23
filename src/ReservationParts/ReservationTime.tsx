import React, { useState, ChangeEventHandler } from "react";
import { getHours, startOfHour,addHours, isSameDay } from 'date-fns';

export function TimeDropdown ( props:any ) {
    const [ open, setOpen ] = useState(false);
    const startTime = startTimeFinder();
    const [ times, setTimes] = useState(utils.range(startTime,20));

    return(
        <div className="menu-container">
            <div className="menu-trigger" onClick={()=>{setOpen(!open)}}>
                <button>
                    Hello
                </button>
            </div>
            <div className="dropdown-menu">
                <h2>Please select a start time</h2>
                    <div className="DropdownElements">
                        {utils.range(startTime,20).map(timeId =>
                            <div key={timeId} className="time"/>    
                        )}
                    </div>
            </div>
        </div>
    )
}

function startTimeFinder(){
    if(isSameDay(6,new Date())){
        return getHours(addHours(startOfHour(new Date()),1));
    }else{
        return 6;
    }
}

const utils = {
    range: (min: number, max: number) => Array.from({length: max - min +1}, (_,i) => min+i),
}