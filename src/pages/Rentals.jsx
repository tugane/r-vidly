import axios from "axios";
import React, { useEffect, useState } from "react";
import NewRentals from "../components/rentals/NewRentals";

function Rentals() {
  const [movies, setMovies] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getMovies();
    getCustomers();
  }, []);
  const getMovies = () => {
    axios
      .get("http://127.0.0.1:8000/api/movies?all")
      .then((response) => setMovies(response.data))
      .catch((err) => console.log(err));
  };
  const getCustomers = () => {
    axios
      .get("http://127.0.0.1:8000/api/customers")
      .then((response) => setCustomers(response.data.data))
      .catch((err) => console.log(err));
  };
  return (
    <div className="row">
      <NewRentals
        customers={customers}
        movies={movies}
        onReload={() => getCustomers()}
      />
      {/* <CustomersList
        customers={customers}
        memberships={memberships}
        onReload={() => getCustomers()}
      /> */}
    </div>
  );
}

export default Rentals;
