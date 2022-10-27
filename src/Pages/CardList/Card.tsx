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
    const cssStyleName= card!.type.toLowerCase();

    function pinnedClick(event: React.MouseEvent<HTMLImageElement>)
    {
        event.preventDefault()
        if(props.onCardPinned) props.onCardPinned(uiCard)
    }

    return (
        <div key={card!.key} className={`container ${cssStyleName}-body`}>
            <div className={`header ${cssStyleName}-header`} >{card!.name}
                <Pinned isPinned={uiCard.isPinned!} pinnedClick={pinnedClick} />
            </div>
            <div className="card-body">
                {card!.resources.map((resource : CardResource, index : number) => (
                        <div key={index} >{resource.count}x {resource.resource}</div>
                ))}
            </div>
        </div>
    );
}
