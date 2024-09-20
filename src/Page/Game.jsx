import React, { useState, useEffect, useRef } from "react";
import "./DinoGame.css"; // External CSS for styling
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Game = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [open, setOpen] = React.useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [obstaclePosition, setObstaclePosition] = useState(100);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [click, setClick] = useState(true);
  const [life, setLife] = useState(15);
  const dinoRef = useRef(null);
  const obstacleRef = useRef(null);
  console.log(life);

  const onSubmit = (data) => {
    console.log(data);

    axios
      .post("http://localhost:5000/score", data)
      .then((response) => {
        if (response.data.insertedId) {
          toast.success("Your score is successfully added");
          setOpen(false);
        }
        console.log(response);
      })
      .catch((error) => {
        toast.error("There was an error adding the data");
        console.log(error);
      });
  };

  const handleClick = () => {
    setClick(true);
    if (click === true) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 300); // Jump duration
    }
  };

  const handleStop = () => {
    setIsGameOver(true);
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
      <Modal open={open} onClose={() => setOpen(false)}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 p-4 bg-base-100 shadow-md rounded-lg"
        >
          {/* Name Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className={`input input-bordered w-full ${
                errors.name ? "input-error" : ""
              }`}
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-sm text-error mt-1">
                Name field is required
              </span>
            )}
          </div>

          {/* Score Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Score</span>
            </label>
            <input
              type="number"
              value={score}
              placeholder="Your score"
              className="input input-bordered w-full"
              {...register("score")}
              readOnly
            />
          </div>

          {/* Submit Button */}
          <div className="form-control">
            <input
              type="submit"
              className="btn btn-sm btn-success text-white w-full"
              value="Submit"
            />
          </div>
        </form>
      </Modal>
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
      <div className="flex gap-7 justify-center md:my-12">
        {" "}
        <div className="btn game_button" onClick={() => handleClick()}>
          Jump
        </div>{" "}
        <div className="btn game_button" onClick={() => handleStop()}>
          Stop
        </div>{" "}
      </div>

      {/* Display the score */}
      {isGameOver && (
        <div className="game-over">
          <h2 className="bg-red-600 w-[30%] mx-auto text-white my-4 rounded-xl">
            Re Add!
          </h2>
          <div className="flex gap-4 justify-center">
            {" "}
            <button className="game_button" onClick={restartGame}>
              Restart
            </button>
            <button className="game_button" onClick={() => setOpen(true)}>
              Save Score
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
