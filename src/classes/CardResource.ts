export class CardResource {
    resource : string
    count : number

    constructor({resource, count} : CardResource)
    {
        this.resource = resource;
        this.count = count;
    }
}