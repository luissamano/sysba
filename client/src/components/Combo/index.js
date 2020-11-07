import React from "react";

const Combo = ({options}, event) => {

    const setStorage = event => {
        localStorage.setItem('valueCombo', event.target.value);        
    };

    return (
        <select value={localStorage.getItem('valueCombo') === undefined ? 0 : localStorage.getItem('valueCombo')}>
            {options.map((item) => (
                <option key={item.id} value={item.id}>{item.departamento}</option>
          ))}
        </select>

    )
};

export default Combo;