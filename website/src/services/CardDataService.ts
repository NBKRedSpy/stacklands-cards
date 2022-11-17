import createGuid from "./GuidService";
import {ciSortFunction} from "../utils/util"
import * as cd from '../data/StackLandsCards'
import * as clc from '../classes/Card'

export interface Card {
    key : string
    name : string
    colorHeader : string | null
    colorBody : string | null
    resources : CardResource[]
  }
  
  export interface CardResource {
    name : string
    count : number
  }

export class CardDataService {
    data : clc.Card[] | undefined

    constructor()
    {
        this.data = undefined;
    }

    initData() : clc.Card[]
    {
        if(!this.data)
        {
            this.data = new Array<clc.Card>()

            for (const value of cd.cardData) {

                const card = new clc.Card({key: createGuid(), ...value});
                this.data.push(card);
            }
                
            this.data = this.data!.sort((a,b) => ciSortFunction(a.name, b.name));
       }
        
        return this.data;
    }

    getAll() : clc.Card[]
    {
        return this.initData();
    }
}


