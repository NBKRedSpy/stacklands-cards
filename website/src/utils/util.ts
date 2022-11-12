/**
 * Case insensitive search
 * @param {sourceText} the text to search
 * @param {searchText} the text to search for.
 * @returns true if text matches.  if not matched or sourceText or searchText are not a string, returns false.
 */
 export function ciSearch(sourceText : string, searchText : string)
 {
     if(!sourceText) return false;
     if(!searchText) return false;
     return (sourceText.localeCompare(searchText,undefined, {sensitivity: "base"}) === 0);
 }
 
 export const ciSortFunction = Intl.Collator(undefined, {sensitivity: "base"}).compare;
 
 
 