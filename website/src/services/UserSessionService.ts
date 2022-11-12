import { PrintHandlers } from "typescript"
import UiCard from "../Pages/CardList/classes/UiCard"

const PinnedKey = "Pinned"


export default class UserSessionService {

    /**
     * 
     * @returns A list of card key's which have been set as pinned.
     */
    getPinnedCards() : Array<string> {
        const pinnedJson =localStorage.getItem(PinnedKey)

        if(!pinnedJson) return new Array<string>()

        return JSON.parse(pinnedJson) as Array<string>
    } 
    
    /**
     * Sets the isPinned value for the uiCards based on the local storage.
     * @param uiCards The cards to set the status of
     */
    setUiCardPinStatus(uiCards : UiCard[]) : void
    {
      const pinnedCardKeys = this.getPinnedCards()
  
      let pinnedKeysSet = new Set<string>(pinnedCardKeys)
      uiCards.map(uiCard => uiCard.isPinned = pinnedKeysSet.has(uiCard.card!.name))
    }

    /**
     * Stores the keys of the cards that the user has pinned.
     * @param pinnedCards An array of UiCards to store if pinned or an array of strings which are the pinned card keys
     */
    setPinnedCards(pinnedCards : UiCard[] | Array<string>) : void
    {
        let pinnedCardsStrings;

        switch (true)
        {
            case (pinnedCards instanceof Array<UiCard>):
            {
                let uiCards = pinnedCards as Array<UiCard>

                pinnedCardsStrings = uiCards
                    .filter(x => x && x.isPinned)
                    .map(x=> x.card!.name)
                break;
            }
            case (pinnedCards instanceof Array<string>):
            {
                pinnedCardsStrings = pinnedCards
                break;
            }
            default:
            {
                throw new Error('unknown type')
            }
        }

        localStorage.setItem(PinnedKey, JSON.stringify(pinnedCardsStrings))
    }
}
