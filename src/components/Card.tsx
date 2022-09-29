import React from 'react'
import './Card.css'
import * as c from '../classes/Card'
import {CardResource} from "../classes/CardResource"

export default function Card(props: {card: c.Card})
{
    const card = props.card
    const cssStyleName= card.type.toLowerCase();

        return (
            <div key={card.key} className={`container ${cssStyleName}-body`}>
                <div className={`header ${cssStyleName}-header`} >{card.name}</div>
                <div className="card-body">
                    {card.resources.map((resource : CardResource, index : number) => (
                            <div key={index} >{resource.count}x {resource.resource}</div>
                    ))}
                </div>
            </div>
        );
}
