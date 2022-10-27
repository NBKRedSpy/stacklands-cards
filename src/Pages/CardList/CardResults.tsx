
import './CardResults.css'

import { CardSearchResult } from "../../classes/CardSearchResult";
import Cards from "./Cards";
import UiCard from "./classes/UiCard";
import React from 'react';
import Separator from './Separator';

/**
 * The main body of the CardList page.  Contains the Card groupings
 * which may include a divider indicating which cards have resources
 * that matched the filter.
 * @param props 
 * @returns 
 */
 export default function CardResults(props : {
    cardData: UiCard[] | undefined,
    onCardPinned: (card : UiCard) => void
  }) {
    
    let cardDataGroups: Map<string, UiCard[]>;
    const cardListJsx = new Array<JSX.Element>();
  
    if (props.cardData) {
      const foundCardData = props.cardData!.filter(x => { return x.cardSearchResult !== CardSearchResult.NotFound; });
  
      // Note - Since the filter result is sorted, the grouping will always have the Card Name matches first
      cardDataGroups = getSearchGrouping(foundCardData);
    }
    else {
      cardDataGroups = new Map<string, UiCard[]>();
    }
  
    cardDataGroups.forEach((cardGroup, key) => {

      let separatorText: string;

       switch(key) {
        case CardSearchResult.NoSearch:
          separatorText = "All Cards"
          break
        case CardSearchResult.Other:
          separatorText = "Resource match"
          break
        default:
          separatorText = "Name Match"
      }
      
      cardListJsx.push(<Separator text={separatorText} key={separatorText} />)

      cardListJsx.push(<Cards onCardPinned={props.onCardPinned} key={key} cards={cardGroup}></Cards>);
    });
    
    return (<div key={Math.random()} className={"card-results"} >{cardListJsx}</div>)

  }
  
  
/**
 * Groups the search results by the card's cardSearchResult
 * @param foundCardData The array of cards which match a filter.
 * @returns A Map grouped by the CardSearchResult.
 */
function getSearchGrouping(foundCardData: UiCard[]) : Map<string, Array<UiCard>> {
    let cardDataGroup = new Map<string, Array<UiCard>>();
  
    //Create the card Grouping by the CardSearchResult.
    foundCardData.forEach(x => {
      let groupArray: Array<UiCard>;
      if (!cardDataGroup.has(x.cardSearchResult as string)) {
        groupArray = [];
        cardDataGroup.set(x.cardSearchResult as string, groupArray);
      }
      else {
        groupArray = cardDataGroup.get(x.cardSearchResult as string)!;
      }
  
      groupArray.push(x);
    });
    
    return cardDataGroup
  }
  