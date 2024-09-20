import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Score = () => {
  const [asc, setAsc] = useState(true);
  const [searchData, setSearchData] = useState("");
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["repoData", searchData],
    queryFn: () =>
      fetch(
        `http://localhost:5000/score?sort=${
          asc ? "asc" : "desc"
        }&search=${searchData}`
      ).then((res) => res.json()),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setSearchData(data.search);
    refetch();
  };

  console.log(searchData);
  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h1 className="text-center font-bold underline text-3xl">Score</h1>
      <div className="flex justify-center">
        {" "}
        <div className="flex flex-col w-[30%] ">
          <h1 className="font-bold">sort scores</h1>
          <button
            className="btn btn-warning"
            onClick={() => {
              setAsc(!asc), refetch();
            }}
          >
            {asc ? "Low to High" : "High to Low"}
          </button>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex space-x-4 items-center"
          >
            <input
              {...register("search")}
              type="text"
              placeholder="Search..."
              className="input input-bordered w-full max-w-xs"
            />
            <input className="btn btn-primary" type="submit" value="Search" />
          </form>
        </div>
      </div>

      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {data.map((res, index) => (
                <tr key={res._id}>
                  <th>{index + 1}</th>
                  <td>{res.name}</td>
                  <td>{res.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Score;
