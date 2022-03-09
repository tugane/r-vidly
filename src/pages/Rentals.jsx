import axios from "axios";
import React, { useEffect, useState } from "react";
import NewRentals from "../components/rentals/NewRentals";
import RentalsList from "../components/rentals/RentalsList";

function Rentals() {
  const [movies, setMovies] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    getMovies();
    getRentals();
    getCustomers();
  }, []);

  const getRentals = () => {
    axios
      .get("http://127.0.0.1:8000/api/rentals")
      .then((response) => setRentals(response.data.data))
      .catch((err) => console.log(err));
  };
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
        onReload={() => getRentals()}
      />
      <RentalsList
        movies={movies}
        customers={customers}
        rentals={rentals}
        onReload={() => getRentals()}
      />
    </div>
  );
}

export default Rentals;
