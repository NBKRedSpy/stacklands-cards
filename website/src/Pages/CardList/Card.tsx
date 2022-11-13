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

    let isDarkColor = false

    const headerColorStyle = {
        backgroundColor: card?.colorHeader ?? "rgba(215,213,168, 50%)"
    }

    const bodyColorStyle = {
        backgroundColor: card?.colorBody ?? "rgba(215,213,168, 100%)"
    }
    
    isDarkColor = isRgbDarkColor(headerColorStyle.backgroundColor);        

    
    

    return (
        <div onClick={pinnedClick} key={card!.key} className={`container ${isDarkColor ? "high-contrast-text" : ''}`}>
            <div className={`header`} style={headerColorStyle}  >{card!.name}
                <Pinned isPinned={uiCard.isPinned!} pinnedClick={null}/>
            </div>
            <div className="card-body" style={bodyColorStyle} >
                {card!.resources.map((resource : CardResource, index : number) => (
                        <div key={index} >{resource.count}x {resource.name}</div>
                ))}
            </div>
        </div>
    );
}

/**
 * Returns true if the color is considered dark.
 * @param rgbString 
 * @returns 
 * Note - this come from this stack overflow post:  https://stackoverflow.com/questions/22603510/is-this-possible-to-detect-a-colour-is-a-light-or-dark-colour
 * Which references: 
 */
function isRgbDarkColor(rgbString : string) {
    let rgba = rgbString.match(/\d+/g)!
    
    rgba.pop();

    const [r,g,b] = rgba.map(x=> Number.parseInt(x))

    //This is known as the "Hue Saturation Perception" equation
    //http://alienryderflex.com/hsp.html
    const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b))
    return hsp < 127;
}