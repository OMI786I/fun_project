import React, { useState, useEffect, useRef } from "react";
import "./DinoGame.css"; // External CSS for styling

const Game = () => {
  const [isJumping, setIsJumping] = useState(false);
  const [obstaclePosition, setObstaclePosition] = useState(100);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [click, setClick] = useState(true);
  const [life, setLife] = useState(15);
  const dinoRef = useRef(null);
  const obstacleRef = useRef(null);
  console.log(life);
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
        dinoRect.right > obstacleRect.left &&
        dinoRect.left < obstacleRect.right &&
        dinoRect.bottom > obstacleRect.top &&
        dinoRect.top < obstacleRect.bottom
      ) {
        setLife(life - 1);
      }
    };

    if (life === 0) {
      setIsGameOver(true);
    }

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
    setLife(15);
  };

  return (
    <div className="game-container">
      <h1 className="game-title font-bold">Retake Dodger</h1>
      <p>Press spacebar or click jump</p>
      <div className="game-screen">
        <div className="score flex justify-center gap-5 ">
          <div>
            <span className="font-bold">Life: </span>
            {Math.ceil(life / 5)}
          </div>
          <p>
            {" "}
            <span className="font-bold">Score:</span> {score}
          </p>
        </div>{" "}
        {/* Display the score */}
        <div ref={dinoRef} className={`dino ${isJumping ? "jump" : ""}`}>
          <img src="Lidd7Me5T.gif" />
        </div>
        <div
          ref={obstacleRef}
          className="obstacle"
          style={{ left: `${obstaclePosition}%` }}
        >
          Retake
        </div>
      </div>
      <div className="btn game_button" onClick={() => handleClick()}>
        Jump
      </div>{" "}
      {/* Display the score */}
      {isGameOver && (
        <div className="game-over">
          <h2 className="bg-red-600 w-[30%] mx-auto text-white my-4 rounded-xl">
            Re Add!
          </h2>
          <button className="game_button" onClick={restartGame}>
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default Game;
