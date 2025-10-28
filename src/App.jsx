// import { useState } from 'react'
import "./App.css";
import Header from "./components/Header.jsx";
import Card from "./components/Card.jsx"
import {useState} from 'react';
import {createDeck, shuffleDeck} from "./utils.js"


function App() {
  const [allCards, setAllCards] = useState(shuffleDeck(createDeck()));

  return (
    <>
      <Header score="100" highScore="1000" />
      <div className="game">
        {
          allCards.map(card=>(<Card key={card.id} card={card}/>)) 
        }
      </div>
    </>
  );
}

export default App;


// {
//   allCards.map(card => (
//     <CardDisplay key={card.id} card={card} />
//   ))
// }