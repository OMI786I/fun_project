import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Feedback = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post("http://localhost:5000/feedback", data)
      .then((response) => {
        if (response.data.insertedId) {
          toast.success("Thank you for your feedback");
        }
        console.log(response);
      })
      .catch((error) => {
        toast.error("There was an error");
        console.log(error);
      });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-center text-2xl font-bold mb-4">Feedback Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            className="input input-bordered w-full"
            placeholder="Your Name"
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>

        {/* Rating Field */}
        <div>
          <label className="label">
            <span className="label-text">Rating</span>
          </label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <label key={star} className="cursor-pointer">
                <input
                  {...register("rating", { required: "Rating is required" })}
                  type="radio"
                  value={star}
                  className="hidden"
                />
                <span
                  className={`text-2xl ${
                    star <= (watch("rating") || 0)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              </label>
            ))}
          </div>
          {errors.rating && (
            <span className="text-red-500">{errors.rating.message}</span>
          )}
        </div>

        {/* Comment Field */}
        <div>
          <label className="label">
            <span className="label-text">Comment</span>
          </label>
          <textarea
            {...register("comment", { required: "Comment is required" })}
            className="textarea textarea-bordered w-full"
            placeholder="Your comments..."
          ></textarea>
          {errors.comment && (
            <span className="text-red-500">{errors.comment.message}</span>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;
