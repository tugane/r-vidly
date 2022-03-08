import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomersList from "../components/customers/CustomersList";
import NewCustomer from "../components/customers/NewCustomer";

function Customers() {
  const [memberships, setMemberships] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getMemberships();
    getCustomers();
  }, []);
  const getMemberships = () => {
    axios
      .get("http://127.0.0.1:8000/api/memberships")
      .then((response) => setMemberships(response.data))
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
      <NewCustomer memberships={memberships} onReload={() => getCustomers()} />
      <CustomersList
        customers={customers}
        memberships={memberships}
        onReload={() => getCustomers()}
      />
    </div>
  );
}

export default Customers;
