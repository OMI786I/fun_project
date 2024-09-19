import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PreviosProjects = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/projects.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  console.log(data);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-12">
      {data.map((res) => (
        <div
          key={res.id}
          className="card card-compact bg-base-100 w-72 md:w-96 shadow-xl"
        >
          <figure>
            <img src={res.image} className="w-80" alt="Shoes" />
          </figure>
          <div className="card-body bg-primary text-white">
            <h2 className="card-title">{res.title}</h2>
            <p>{res.description}</p>
            <Link to={res.link}>
              {" "}
              <div className="card-actions justify-end">
                <button className="btn btn-neutral">Visit</button>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PreviosProjects;
