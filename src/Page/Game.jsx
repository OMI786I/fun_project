import React, { useState, useEffect, useRef } from "react";
import "./DinoGame.css"; // External CSS for styling

const Game = () => {
  const [isJumping, setIsJumping] = useState(false);
  const [obstaclePosition, setObstaclePosition] = useState(100);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [click, setClick] = useState(true);
  const dinoRef = useRef(null);
  const obstacleRef = useRef(null);
  const handleClick = () => {
    setClick(true);
    if (click === true) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 300); // Jump duration
    }
  };

  console.log(click);
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
      const dinoRect = dinoRef.current.getBoundingClientRect();
      const obstacleRect = obstacleRef.current.getBoundingClientRect();

      if (
        dinoRect.left < obstacleRect.right &&
        dinoRect.right > obstacleRect.left &&
        dinoRect.top < obstacleRect.bottom &&
        dinoRect.bottom > obstacleRect.top
      ) {
        setIsGameOver(true);
      }
    };

    // Add event listener for jump
    document.addEventListener("keydown", handleKeyDown);

    // Move the obstacle
    const obstacleTimer = setInterval(() => {
      if (!isGameOver) {
        setObstaclePosition((prevPosition) =>
          prevPosition > 0 ? prevPosition - 2 : 100
        );
        checkCollision();
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
    setScore(0);
  };

  return (
    <div className="game-container">
      <h1 className="game-title font-bold">University Life</h1>
      <p>Press spacebar or click jump</p>
      <div className="game-screen">
        <div className="score">Score: {score}</div> {/* Display the score */}
        <div ref={dinoRef} className={`dino ${isJumping ? "jump" : ""}`}></div>
        <div
          ref={obstacleRef}
          className="obstacle"
          style={{ left: `${obstaclePosition}%` }}
        ></div>
      </div>
      <div className="btn game_button" onClick={() => handleClick()}>
        Jump
      </div>{" "}
      {/* Display the score */}
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
