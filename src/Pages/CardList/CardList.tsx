import React from 'react';

import * as _ from 'lodash';
import { firstBy } from 'thenby';
import * as c from '../../classes/Card';
import { CardSearchResult } from '../../classes/CardSearchResult';
import CardFilter from '../../components/CardFilter';
import { CardDataService } from '../../services/CardDataService';
import './CardList.css';
import UiCard from './UiCard';
import CardResults from './CardResults';

const cardDataService = new CardDataService();

/**
 * The card list page.  Contains a filter and the list of cards which match the filter.
 */
export default function CardList() {

  //Debounces the filter input  
  const filterDebounce = _.debounce(filterCards, 100, {maxWait: 1000})
  const [cardData, setCardData] = React.useState<UiCard[]>();

  React.useEffect(() => {
    async function cb() {
      const cardData = await cardDataService.getAll();
      const uiCards = createUiCards(cardData);
      setCardData(uiCards);
    }
    cb();
  }, []);

  //The groups of UiCards split by the search result. 
  return (
    <div>
      <div><CardFilter onChange={filterChangeEvent} /></div>
      <CardResults cardData={cardData}/>
    </div>
  )

  function filterChangeEvent(event: React.ChangeEvent<HTMLInputElement>): void
  {
      filterDebounce(event.target.value) 
  }    

  /**
   * Sets all of the cards' cardSearchResult based on if the user's search matched the card.
   * @param search 
   */
  function filterCards(search: string) : void {
    const filteredCardData: UiCard[] = getFiltered(search, cardData!);

    setCardData(filteredCardData);
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
        x.cardSearchResult = x.card.search(searchText)
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
      firstBy<UiCard>((a ,b) => CardSearchResult.sort(a.cardSearchResult,b.cardSearchResult))
      .thenBy((a,b) => a.card.name.localeCompare(b.card.name))
      );
  }




