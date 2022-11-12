import './Cards.css'

import Card from "./Card"
import UiCard from "./classes/UiCard"


/**
 * Renders an array of cards.  This used for card grouping.
 * @param props 
 * @returns 
 */
export default function Cards(props: {
  cards : UiCard[]
  onCardPinned: (card : UiCard) => void
}) {
    return (
      <div >
        {(() =>  {
  
          if(props.cards && props.cards?.length !== 0) {
            return <div className="cards-container">{props.cards.map(x => <Card onCardPinned={props.onCardPinned} key={x.key} card={x}/>)}</div>
          }
          })()}
      </div>  
      
    )
  }