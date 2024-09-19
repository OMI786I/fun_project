import { useEffect, useRef, useState } from "react";
import "./DinoGame.css"; // External CSS for styling

const Game = () => {
  const [isJumping, setIsJumping] = useState(false);
  const [obstaclePosition, setObstaclePosition] = useState(100);
  const [isGameOver, setIsGameOver] = useState(false);

  const dinoRef = useRef(null);
  const obstacleRef = useRef(null);

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
  };

  return (
    <div className="game-container">
      <h1 className="game-title">Dino Game</h1>
      <div className="game-screen">
        <div ref={dinoRef} className={`dino ${isJumping ? "jump" : ""}`}></div>
        <div
          ref={obstacleRef}
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
