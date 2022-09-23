import React from 'react';
import './CardFilter.css'

//Debug
export default function cardFilter(props: any) {
    return <div>
        <input type="text" name='filterInput' className="filter-input" onChange={props.onChange} placeholder='filter'></input>
    </div>
}