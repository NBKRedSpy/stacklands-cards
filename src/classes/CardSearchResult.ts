export class CardSearchResult {
    //No match was found
    static NotFound: string = "NotFound"
    //The search matched the description
    static Name : string = "Name"
    //The search matched another item. Ex: a resource.
    static Other : string  = "Other"
    
    /**
     * Sort by search result of Description, Other, NotFound
     */
    static sort(a : CardSearchResult, b : CardSearchResult){
      if(a === b) return 0;
  
      let aOrder = this.getSortOrder(a);
      let bOrder = this.getSortOrder(b);
  
      return aOrder > bOrder ? 1 : -1;
    }
  
    /**
     *Sort order for search result. Description, Other, NotFound 
     */
    
    static getSortOrder(value : CardSearchResult)
    {
      switch(value)
      {
        case this.Name:
          return 1;
        case this.Other:
          return 2;
        case this.NotFound:
          return 3;
        default:
          throw new Error("value not found");
      }
    }
  }
  