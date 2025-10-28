// import { useState } from 'react'
import "./App.css";
import Header from "./components/Header.jsx";
import Card from "./components/Card.jsx";
import { useState } from "react";
import { createDeck, shuffleDeck } from "./utils.js";
const WRONGANSWER = -50;
const RIGHTANSWER = 100;

function App() {
  const [allCards, setAllCards] = useState(shuffleDeck(createDeck()));
  const [message, setMessage] = useState("Click a card to reveal");
  // const [isOpen, setIsOpen] = useState(false);
  // const [isCleared, setIsCleared] = useState(false);
  let openCards = [];
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async function handleCardClick(id) {
    if (openCards.length >= 2) {
      //already two cards are opened, you can't open another card!
      setMessage("Two cards are open, you can't open a third card!");
      return;
    }
    setAllCards((prevDeck) =>
      prevDeck.map((card) =>
        card.id === id
          ? { ...card, isOpen: !card.isOpen } // toggle true/false
          : card
      )
    );
    if (openCards.length === 2) {
      //Two cards have been opened, act on it to check if they are pair or not
      //If they are add to score and mark isCleared to true for both cards.
      //If they are not deduct marks
      //close both cards and make the openCards array empty after two seconds (2000ms)
      await sleep(2000);
    }
  }

  return (
    <>
      <Header score="0" highScore="0" message={message} />
      <div className="game">
        {allCards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleClick={() => handleCardClick(card.id)}
          />
        ))}
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
