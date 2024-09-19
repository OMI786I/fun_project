import React, { useState, useEffect } from "react";
import "./DinoGame.css"; // External CSS for styling

const Game = () => {
  const [isJumping, setIsJumping] = useState(false);
  const [obstaclePosition, setObstaclePosition] = useState(100);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Handle jumping
    const handleKeyDown = (event) => {
      if (event.code === "Space" && !isJumping) {
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 300); // Jump duration
      }
    };

    // Check for collisions
    const checkCollision = () => {
      if (obstaclePosition > 0 && obstaclePosition < 10 && !isJumping) {
        setIsGameOver(true);
      }
    };

    // Add event listener for jump
    document.addEventListener("keyup", handleKeyDown);

    // Move the obstacle
    const obstacleTimer = setInterval(() => {
      if (!isGameOver) {
        setObstaclePosition((prevPosition) =>
          prevPosition > 0 ? prevPosition - 2 : 100
        );
        checkCollision();
        // Increase score as the obstacle moves (player survives)
        setScore((prevScore) => prevScore + 1);
      }
    }, 20);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearInterval(obstacleTimer);
    };
  }, [isJumping, obstaclePosition, isGameOver]);

  const restartGame = () => {
    setIsGameOver(false);
    setObstaclePosition(100);
    setScore(0); // Reset score when game restarts
  };

  return (
    <div className="game-container">
      <h1 className="game-title">Dino Game</h1>
      <div className="game-screen">
        <div>
          <span className="font-bold">Score: </span>
          {score}
        </div>
        <div className={`dino ${isJumping ? "jump" : ""}`}></div>
        <div
          className="obstacle"
          style={{ left: `${obstaclePosition}%` }}
        ></div>
      </div>
      {isGameOver && (
        <div className="game-over">
          <h2>Game Over!</h2>
          <button className="game_button" onClick={restartGame}>
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default Game;
