import {Card} from '../../../classes/Card'
import { CardSearchResult} from '../../../classes/CardSearchResult';
//The UI version of the card for the CardList

export default class UiCard {
    key? : string 
    card? : Card
    isPinned? : boolean
    cardSearchResult?: CardSearchResult
    
    /**
     *
     */
    constructor(card: Card | undefined = undefined) {

        if(!card) return

        this.card = card;
        this.key = card.key
        this.isPinned = false;
        this.cardSearchResult = CardSearchResult.NoSearch;
    }
}
