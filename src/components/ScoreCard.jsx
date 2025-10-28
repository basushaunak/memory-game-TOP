import "../styles/ScoreCard.css";

export default function ScoreCard({score, highScore}){
    return(
        <div className="score-card">
            <p className="score-card-para">Score:</p><p className="score">{score}</p>
            <p className="score-card-para">High:</p><p className="high-score">{highScore}</p>
        </div>
    )
}