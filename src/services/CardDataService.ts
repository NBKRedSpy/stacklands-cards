import createGuid from "./GuidService";
import {Card} from "../classes/Card"
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
             const response = await fetch(`${process.env.PUBLIC_URL}/data/StackLandsCards.json`)
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
}


