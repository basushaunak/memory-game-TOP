import "./App.css";
import Header from "./components/Header.jsx";
import Card from "./components/Card.jsx";
import { useState, useEffect } from "react";
import { createDeck, shuffleDeck, isPair } from "./utils.js";

const WRONGANSWER = -50;
const RIGHTANSWER = 200;

function App() {
  const [allCards, setAllCards] = useState(shuffleDeck(createDeck()));
  const [message, setMessage] = useState("Click a card to reveal");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [openCards, setOpenCards] = useState([]);
  const [runCount, setRunCount] =useState(1);


  useEffect(() => {
    if (allCards.filter((card) => !card.isCleared).length === 0) {
      setMessage("Game Over!");
      if (runCount===1) {
        setHighScore(score);
      } else {
        if (score > highScore) {
          setHighScore(score);
        }
      }
      if(window.confirm("Do you want to start a new game?")){
        setScore(0);
        setOpenCards([]);
        setMessage("Clcik a card to reveal");
        setAllCards(shuffleDeck(createDeck()));
        setRunCount((oldCount)=>oldCount+1);
      }
    }
  }, [allCards, score, highScore]);
  useEffect(() => {
    if (openCards.length === 2) {
      const [id1, id2] = openCards;
      if (isPair(id1, id2)) {
        setScore((prevScore) => prevScore + RIGHTANSWER);
        setMessage("It's a pair!");
        setAllCards((prevDeck) =>
          prevDeck.map((card) =>
            card.id === id1 || card.id === id2
              ? { ...card, isCleared: true, isOpen: true }
              : card
          )
        );
        setOpenCards([]);
      } else {
        setScore((prevScore) => prevScore + WRONGANSWER);
        setMessage("No match, try again.");
        setTimeout(() => {
          setAllCards((prevDeck) =>
            prevDeck.map((card) =>
              card.id === id1 || card.id === id2
                ? { ...card, isOpen: false }
                : card
            )
          );
          setOpenCards([]);
        }, 1000);
      }
    }
  }, [openCards, allCards, setAllCards, setScore, setMessage]);

  function handleCardClick(id) {
    const clickedCard = allCards.find((card) => card.id === id);

    if (clickedCard.isCleared || clickedCard.isOpen || openCards.length >= 2) {
      return;
    }

    setAllCards((prevDeck) =>
      prevDeck.map((card) =>
        card.id === id ? { ...card, isOpen: true } : card
      )
    );


    setOpenCards((prevOpen) => [...prevOpen, id]);
  }

  return (
    <>
      <Header score={score} highScore={highScore} runCount={runCount} message={message} />
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
