import './Cards.css'

import Card from "../../components/Card"
import UiCard from "./UiCard"


/**
 * Renders an array of cards
 * @param state 
 * @returns 
 */
export default function Cards(state: {cards : UiCard[]}) {
    return (
      <div className="{'cards-container'}">
        {(() =>  {
  
          if(state.cards && state.cards?.length !== 0) {
            return <div>{state.cards.map(x => <Card key={x.key} card={x.card}/>)}</div>
          }
          })()}
      </div>  
      
    )
  }