export class CardResource {
    name : string
    count : number

    constructor({name, count} : CardResource)
    {
        this.name = name;
        this.count = count;
    }
}