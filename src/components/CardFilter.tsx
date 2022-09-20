import React from 'react';
import './CardFilter.css'

//Debug
export default function cardFilter(props: any) {
    return <div>
        <span className="filter-container">
            <label>Filter: </label>
            <input type="text" name='filterInput' className="filter-input" onChange={props.onChange} placeholder='filter'></input>
        </span>
    </div>
}