import { CardResource } from "./CardResource"
import { CardSearchResult } from "./CardSearchResult"
import * as ci from '../services/CardDataService'




/**
 * A Stacklands card such as a Smelter or Plank
 */
export class Card {
    key : string
    name : string
    type : string
    colorHeader : string | null = null
    colorBody : string | null = null


    /** 
     * An array of CardResources required for this card.
     */
    resources : CardResource[]

    constructor({key,name,type,resources,colorHeader,colorBody}: ci.Card )
    {
      this.key = key;
      this.name = name;
      this.type = type;
      this.resources = resources;
      this.colorHeader = colorHeader;
      this.colorBody = colorBody;
    }

    /**
     * 
     * @param {string} text - The text to search for.
     * @returns {CardSearchResult} - The result of the search.
     */
     search(text : string) : CardSearchResult 
    {

      if(!this.resources) return CardSearchResult.NotFound;
      
      const regEx = RegExp(text, "i");

      if(regEx.test(this.name)) return CardSearchResult.Name;

      
      const found = this.resources.some((resource) => 
      {
          return regEx.test(resource.name);
      });

      return found ? CardSearchResult.Other : CardSearchResult.NotFound;

    }      
}

