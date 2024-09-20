import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Score = () => {
  const [asc, setAsc] = useState(true);
  const [searchData, setSearchData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageAmount, setTotalPageAmount] = useState(0);
  const dataPerPage = 5; // Define how many scores per page

  const {
    isLoading: paginatedDataPending,
    error,
    data: paginatedData,
    refetch,
  } = useQuery({
    queryKey: ["paginated-data", searchData, currentPage, asc],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/score?sort=${
          asc ? "asc" : "desc"
        }&search=${searchData}&dataPerPage=${dataPerPage}&currentPage=${currentPage}`
      );
      setTotalPageAmount(res.data.totalPages); // Set total pages
      return res.data.result;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setSearchData(data.search);
    setCurrentPage(1);
    refetch();
  };

  const handleSort = () => {
    setAsc(!asc);
    setCurrentPage(1);
    refetch();
  };

  if (paginatedDataPending)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  const totalPages = [...Array(totalPageAmount).keys()]; // Create array for pagination buttons

  return (
    <div>
      <h1 className="text-center font-bold underline text-3xl">Score</h1>

      <div className="flex justify-center">
        <div className="flex flex-col w-[30%] ">
          <h1 className="font-bold">Sort Scores</h1>
          <button
            className="btn btn-warning btn-sm my-4"
            onClick={() => handleSort()}
          >
            {asc === true ? "High to Low" : "Low to High"}
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
            {/* Table Header */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((res, index) => (
                <tr key={res._id}>
                  <th>{(currentPage - 1) * dataPerPage + (index + 1)}</th>
                  <td>{res.name}</td>
                  <td>{res.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-center my-4">
          {totalPages.map((page) => (
            <button
              className="btn btn-primary"
              key={page}
              onClick={() => setCurrentPage(page + 1)}
            >
              {page + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Score;
