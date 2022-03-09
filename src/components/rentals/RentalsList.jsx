import React, { useEffect, useState } from "react";
import Button from "../others/Button";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import * as Yup from "yup";
import axios from "axios";
import { Modal } from "react-bootstrap";
import ErrorMessage from "../others/ErrorMessage";
import Select from "react-select";
import { useFormik } from "formik";

const validationSchema = Yup.object().shape({
  customer_id: Yup.number().required(),
  movie: Yup.array(),
});

function RentalsList({ rentals, onReload, movies, customers }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [options, setOptions] = useState([]);
  const [active, setActive] = useState(null);
  const handleOnDelete = (id) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete("http://127.0.0.1:8000/api/rentals/delete/" + id)
              .then((response) => (alert(response.data.message), onReload()))
              .catch((err) => console.log(err));
          },
        },
        {
          label: "No",
          onClick: null,
        },
      ],
    });
  };
  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    setSubmitting,
    handleChange,
    values,
    handleBlur,
    setErrors,
    resetForm,
    setValues,
  } = useFormik({
    initialValues: {
      customer_id: "",
      movie: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let data = {
        customer_id: values.customer_id,
        movie: getIds(values.movie),
      };
      axios
        .put("http://127.0.0.1:8000/api/rentals/" + active, data)
        .then((response) => alert(response.data.message))
        .catch((errors) => {
          if (errors.response.status == 422) {
            setErrors(errors.response.data.errors);
          }
        })
        .finally(() => (setSubmitting(false), onReload()));
    },
  });
  useEffect(() => {
    getOptions();
  }, [movies]);

  const handleShow = (rental) => {
    setValues({});
    setActive(rental.id);
    setValues({
      customer_id: rental.customer_id,
      movie: getSelected(rental.movies),
    });
    setShow(true);
  };

  const getSelected = (movies) => {
    let newValues = [];
    movies.forEach((element) => {
      newValues.push({ value: element.id, label: element.title });
    });
    return newValues;
  };

  const getOptions = () => {
    setOptions([]);
    movies.forEach((element) => {
      setOptions((oldArray) => [
        ...oldArray,
        { value: element.id, label: element.title },
      ]);
    });
  };
  const getIds = (values) => {
    let newValues = [];
    values.forEach((element) => {
      newValues.push(element.value);
    });
    return newValues;
  };

  return (
    <>
      <div className="col-md-8 mx-auto my-2 p-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">rentals list</h5>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Movies</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rentals.map((rental, index) => (
                    <tr key={rental.id}>
                      <th>{index + 1}</th>
                      <th>{rental.customer.name}</th>
                      <td>
                        {rental.movies.map((movie) => (
                          <span
                            className="badge bg-secondary"
                            style={{ marginRight: "2px" }}
                            key={movie.id}
                          >
                            {movie.title}
                          </span>
                        ))}
                      </td>
                      <td>
                        <Button
                          className="btn-danger"
                          deleteBtn
                          onClick={() => handleOnDelete(rental.id)}
                        />
                        <Button
                          text="Edit"
                          onClick={() => handleShow(rental)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Rental</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="form-label">Customer</label>
              <select
                onBlur={handleBlur}
                value={values.customer_id}
                onChange={handleChange}
                className="form-control mb-1"
                as="select"
                name="customer_id"
              >
                <option value="">Select Customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
              <ErrorMessage
                name="customer_id"
                touched={touched}
                errors={errors}
              />
            </div>
            <div>
              <label className="form-label">Movie</label>
              <Select
                options={options}
                isMulti={true}
                value={values.movie}
                onChange={(selectedMovies) => (
                  setValues({
                    customer_id: values.customer_id,
                    movie: selectedMovies,
                  }),
                  setErrors({
                    customer_id: errors.customer_id,
                    movie: null,
                  })
                )}
                name="movie"
              />
              <ErrorMessage name="movie" touched={touched} errors={errors} />
            </div>
            <Button loading={isSubmitting} />
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RentalsList;
