import React from 'react'


const MilliSecondsPerHour = 1000 * 60 * 60
const LastCountDateKey = "lastCountDate"

/**
 * A very simple site counter
 */
export default function Counter() {
    
    React.useEffect(() => 
    {
        
       try {
         //The last time the counter was updated for this client in ISO format.
         let lastUpdateString = localStorage.getItem(LastCountDateKey)
 
         let updateVisitCount = true
 
         if(lastUpdateString)
         {
             let lastUpdate = new Date(lastUpdateString)
             updateVisitCount = new Date().valueOf() - lastUpdate.valueOf() > MilliSecondsPerHour
         }
 
         if(updateVisitCount) {
             localStorage.setItem(LastCountDateKey, new Date().toISOString());
             fetch("https://api.countapi.xyz/hit/nbkredspy.github.io_stacklands-cards/visits");
 
         }
       } catch (error) {
            //Ignore all errors
       }
        
    }, [])

    return (<></>)
}