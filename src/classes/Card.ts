import { CardResource } from "./CardResource"
import { CardSearchResult } from "./CardSearchResult"


/**
 * A Stacklands card such as a Smelter or Plank
 */
export class Card {
    key : string
    name : string
    type : string

    /** 
     * An array of CardResources required for this card.
     */
    resources : CardResource[]

    constructor({key,name,type,resources} : Card)
    {
      this.key = key;
      this.name = name;
      this.type = type;
      this.resources = resources;
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
          return regEx.test(resource.resource);
      });

      return found ? CardSearchResult.Other : CardSearchResult.NotFound;

    }      
}

