import React from 'react';

import * as _ from 'lodash';
import { firstBy } from 'thenby';
import * as c from '../../classes/Card';
import { CardSearchResult } from '../../classes/CardSearchResult';
import { CardDataService } from '../../services/CardDataService';
import './CardList.css';
import UiCard from './classes/UiCard';
import CardResults from './CardResults';
import UserSessionService from '../../services/UserSessionService';
import Cards from './Cards'
import Separator from './Separator';

const cardDataService = new CardDataService();
const userSessionService = new UserSessionService()

/**
 * The main page of the application. Contains a list of cards optionally filtered by the filter text..
 */
export default function CardList() {

  //Debounces the filter input  
  const filterDebounce = _.debounce(filterCards, 100, {maxWait: 1000})
  const [uiCards, setUiCards] = React.useState<UiCard[]>(() => new Array<UiCard>());

  React.useEffect(() => {
    async function cb() {
      const cardData = await cardDataService.getAll();
      const createdUiCards = createUiCards(cardData);

      
      userSessionService.setUiCardPinStatus(createdUiCards)

      setUiCards(createdUiCards);
      
    }
    cb();

  }, []);

  const pinnedCards = uiCards.filter(x=> x.isPinned);

  return (
    <div>
      <div>
        <input autoFocus type="text" name='filterInput' className="filter-input" onChange={filterChangeEvent} placeholder='filter'></input>
      </div>
      {pinnedCards.length !== 0 && 
      <div>
        <span className="favorites-separator" onClick={toggleFavorites}><Separator text="Favorites"/></span><span className="clear-favorites" onClick={handleClearFavorites}>&#10006;</span>
        <div className="favorite-cards">
          <Cards cards={pinnedCards} onCardPinned={handleCardPinned}></Cards>
        </div>
      </div>
      }
      <CardResults onCardPinned={handleCardPinned}  cardData={uiCards}/>
    </div>
  )

  function toggleFavorites() {
    var favoriteCards = (document.querySelector(".favorite-cards") as HTMLElement)!

    favoriteCards.style.display = favoriteCards.style.display === "" ? "none" : ""

    
  }
  function handleClearFavorites(event: React.MouseEvent<HTMLSpanElement>) {

    setUiCards(prev => {
        const newCardArray = prev.map(x=> {
        x.isPinned = false; 
        return x;}
      )

      userSessionService.setPinnedCards(newCardArray)

      return newCardArray;
    })

    event.preventDefault()
    
  }

  function filterChangeEvent(event: React.ChangeEvent<HTMLInputElement>): void
  {
      filterDebounce(event.target.value) 
  }  
  
  function handleCardPinned(uiCard: UiCard){
    if(!uiCards) return

    setUiCards((prev) => {
      const newCardArray = prev.map(card => 
        {
          if(card.key === uiCard.key)
          {
            return {
              ...card,
              isPinned: !card.isPinned
            }
          }
          else
          {
            return card
          }
        })

      //child already updated. Update the user's settings.
      userSessionService.setPinnedCards(newCardArray)

      return newCardArray
    })

  }

  /**
   * Sets all of the cards' cardSearchResult based on if the user's search matched the card.
   * @param search 
   */
  function filterCards(search: string) : void {
    const filteredCardData: UiCard[] = getFiltered(search, uiCards!);

    setUiCards(filteredCardData);
  }
}

/**
 * Converts the card data to UiCards for this control
 * @param cards the raw cards to load
 */
function createUiCards(cards : c.Card[]) : UiCard[]
{
    return cards.map(x => new UiCard(x));
}

/**
     * Returns the list of cards which matches the search.
     * @param {string} Text to filter by 
     * @returns {Cards[]}  The list of cards which match the search text.  
     *    Sorted by Name matches, then resource matches
     */
  function getFiltered(searchText : string, cardData: UiCard[]) : UiCard[]
  {

    let cardsFiltered

    if(!!searchText){
      //Has filter text
      cardsFiltered = cardData.map(x => {
        x.cardSearchResult = x.card!.search(searchText)
        return x;
      })
    }
    else{
      //Filter text is empty.  Reset cards to no search
      cardsFiltered = cardData.map(x => {
        x.cardSearchResult = CardSearchResult.NoSearch
        return x;
      })
    }

    return cardsFiltered.sort(
      firstBy<UiCard>((a ,b) => CardSearchResult.sort(a.cardSearchResult!,b.cardSearchResult!))
      .thenBy((a,b) => a.card!.name.localeCompare(b.card!.name))
      );
  }




