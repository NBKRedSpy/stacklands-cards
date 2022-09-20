import './App.css';
import Card from './components/Card'
import { CardDataService } from './services/CardDataService';
import CardFilter from './components/CardFilter'
import * as c from './classes/Card'
import React, { ChangeEvent } from 'react'

const cardDataService = new CardDataService();

function App() {
    const [cardData, setCardData] = React.useState<c.Card[]>();

    React.useEffect(() => {
      async function cb() {
        // const cardData = await cardDataService.getAll()
        setCardData(await cardDataService.getAll());
      }
      cb();

      

    }, []);


    return (
      <div>
        <div><CardFilter onChange={filterChange} /></div>
        <div>
          {/* {cardData && cardData.map(x=> <div key={x.key}><Card card={x}/></div>)} */}
          {cardData && cardData.map(x=> <Card key={x.key} card={x}/>)}
        </div>

      </div>
    );

    async function filterChange(event: React.ChangeEvent<HTMLInputElement>)
    {
      if(event.target.value)
      {
        const cardData: c.Card[] = await cardDataService.getFiltered(event.target.value);

        setCardData(cardData);
      }
      else  
      {
        setCardData(await cardDataService.getAll());
      }
      
    }    
}



export default App;
