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
  const [openCards, setOpenCards] = useState([]); // Use useState for interactive state

  // Use useEffect to handle the logic when two cards are open
  useEffect(() => {
    if (allCards.filter((card) => !card.isCleared).length === 0) {
      setMessage("Game Over!");
      if (score > highScore) {
        setHighScore(score);
      }
    }
  }, [allCards, score, highScore]);
  useEffect(() => {
    if (openCards.length === 2) {
      const [id1, id2] = openCards;
      // const card1 = allCards.find((card) => card.id === id1);
      // const card2 = allCards.find((card) => card.id === id2);

      if (isPair(id1, id2)) {
        // Correctly handle a matching pair
        setScore((prevScore) => prevScore + RIGHTANSWER);
        setMessage("It's a pair!");
        setAllCards((prevDeck) =>
          prevDeck.map((card) =>
            card.id === id1 || card.id === id2
              ? { ...card, isCleared: true, isOpen: true }
              : card
          )
        );
        setOpenCards([]); // Clear the openCards array
      } else {
        // Correctly handle a mismatch with a delay
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
          setOpenCards([]); // Clear the array after the delay
        }, 1000); // 1-second delay
      }
    }
  }, [openCards, allCards, setAllCards, setScore, setMessage]);

  function handleCardClick(id) {
    const clickedCard = allCards.find((card) => card.id === id);

    // Prevent clicks if:
    // - The card is already cleared.
    // - The card is already open.
    // - Two cards are already open and the timer is running.
    if (clickedCard.isCleared || clickedCard.isOpen || openCards.length >= 2) {
      return;
    }

    // Toggle the card's open state
    setAllCards((prevDeck) =>
      prevDeck.map((card) =>
        card.id === id ? { ...card, isOpen: true } : card
      )
    );

    // Update the openCards array using the functional update form
    setOpenCards((prevOpen) => [...prevOpen, id]);
  }

  return (
    <>
      <Header score={score} highScore={highScore} message={message} />
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
