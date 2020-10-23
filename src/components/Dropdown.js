import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ label, options, selected, onSelectedChange }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(); 

    useEffect(() => {
        const onBodyClick = (event) => {
            if (ref.current.contains(event.target)) {
                return;
            } 
            setOpen(false);
        };
        document.body.addEventListener('click', onBodyClick);
        return () => {
            document.body.removeEventListener('click', onBodyClick);
        };

        //run just one time -> place an empty array
    }, []);

    const renderedOptions = options.map((option) => { 
        if (option.value === selected.value) {
            return null;
        }
    // null in React means 'dont render anything'
        return (
            <div 
                key={option.value}
                className="item"
                onClick={() => onSelectedChange(option) }
            >
                {option.label}
            </div>
        );
    });
    
    return (
        <div ref={ref} className = "ui form">
            <div className = "field">
                <label className = "label">{label}</label>
                <div
                    onClick={() => setOpen(!open)}
                    className={`ui selection dropdown ${open ? 'visible active': ''}`}
                 >
                    <i className="dropdown icon"></i>
                    <div className="text">{selected.label}</div>
                    <div className={`menu ${open ? 'visible transition' : ''}`}>{renderedOptions}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;

//Whenever we remove a component from the dom 
//all the refs that are attached to elements that are inside that component get 
//set to null, or more specifically the ref.current property get's set to null
//because we no longer have an element to refer to.
