import createGuid from "./GuidService";
import {Card} from "../classes/Card"
import {CardSearchResult} from "../classes/CardSearchResult"
import {CardResource} from "../classes/CardResource"
import {ciSortFunction} from "../utils/util"

export class CardDataService {
    data : Card[] | undefined

    constructor()
    {
        this.data = undefined;
    }

    async initData() : Promise<Card[]>
    {
        if(!this.data)
        {
             const response = await fetch("data/StackLandsCards.json")
             if(!response.ok)
             {
                throw response.statusText
             }

             const responseText = await response.text(); 

             this.data = JSON.parse(responseText, (key,value) => {
                if(!isNaN(Number.parseInt(key)) &&  value.name )
                {
                    return new Card({key: createGuid(), ...value});
                }
                if(value.resource && value.count)
                {
                    return new CardResource(value);
                }
                return value;
             });
                
            this.data = this.data!.sort((a,b) => ciSortFunction(a.name, b.name));
            
       }
        
        return this.data;
    }

    async getAll() : Promise<Card[]>
    {
        return await this.initData();
    }

    /**
     * Returns the list of cards which matches the search.
     * @param {string} Text to filter by 
     * @returns {Cards[]}  The list of cards which match the search text.
     */
    async getFiltered(searchText : string)
    {
        await this.initData();

        return this.data!.map(x => {
            return {
                searchResult: x.search(searchText),
                card: x,
            }
        }).filter(x => 
            {
                return x.searchResult !== CardSearchResult.NotFound;
            }
        ).sort((a,b) => 
            {
                return CardSearchResult.sort(a.searchResult,b.searchResult);
            }
        ).map(x => {
            return x.card;
        });


    }
}


