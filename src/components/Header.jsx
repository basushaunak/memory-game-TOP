
import logo from "../assets/images/logo.png"
import ScoreCard from "./ScoreCard";
import "../styles/Header.css";

export default function Header({ score, highScore,message="" }) {
  return (
  <div className="header">
    <div className="app-title">
        <img src={logo} className="logo" />
        <h1 className="app-name">Memory Game</h1>
    </div>
    <ScoreCard score={score} highScore={highScore} />
    <div className="message">{message}</div>
  </div>
  );
}
