import React from 'react'
import './Card.css'
import UiCard from './classes/UiCard'
import {CardResource} from "../../classes/CardResource"
import Pinned from "../../components/Pinned"

/**
 * A single card that contains the title and favorites star
 * @param props 
 * @returns 
 */
export default function Card(props: {
    card: UiCard,
    onCardPinned: (card : UiCard) => void
})
{
    const [uiCard] = React.useState<UiCard>(props.card);

    const card = props.card.card;

    function pinnedClick(event: React.MouseEvent<HTMLImageElement>)
    {
        event.preventDefault()
        if(props.onCardPinned) props.onCardPinned(uiCard)
    }

    let headerColorStyle = {}
    let bodyColorStyle = {}

    let isDarkColor = false

    if(card?.colorBody)
    {
        headerColorStyle = {
            backgroundColor: card.colorHeader
        }

        bodyColorStyle = {
            backgroundColor: card.colorBody
        }
        
        isDarkColor = isRgbDarkColor(card.colorHeader!);        
    }

    
    

    return (
        <div key={card!.key} className={`container ${isDarkColor ? "high-contrast-text" : ''}`}>
            <div className={`header`} style={headerColorStyle}  >{card!.name}
                <Pinned isPinned={uiCard.isPinned!} pinnedClick={pinnedClick} />
            </div>
            <div className="card-body" style={bodyColorStyle} >
                {card!.resources.map((resource : CardResource, index : number) => (
                        <div key={index} >{resource.count}x {resource.name}</div>
                ))}
            </div>
        </div>
    );
}

function isRgbDarkColor(rgbString : string) {
    let rgba = rgbString.match(/\d+/g)!
    
    rgba.pop();

    const sum = rgba.reduce((total, current) => total + Number.parseInt(current),0)

    return (sum / 3 <= 120)
    
}