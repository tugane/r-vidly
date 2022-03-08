import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import * as Yup from "yup";
import Button from "../others/Button";
import ErrorMessage from "../others/ErrorMessage";
import Select from "react-select";

const validationSchema = Yup.object().shape({
  customer_id: Yup.number().required(),
  movie: Yup.array(),
});

function NewRentals({ movies, customers, onReload }) {
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
      axios
        .post("http://127.0.0.1:8000/api/rentals", values)
        .then(
          (response) => (
            alert(response.data.message),
            console.log(response.data),
            resetForm()
          )
        )
        .catch((errors) => {
          if (errors.response.status == 422) {
            setErrors(errors.response.data.errors);
          }
        })
        .finally(() => (setSubmitting(false), onReload()));
    },
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    getOptions();
  }, [movies]);

  const getOptions = () => {
    setOptions([]);
    movies.forEach((element) => {
      setOptions((oldArray) => [
        ...oldArray,
        { value: element.id, label: element.title },
      ]);
    });
  };

  return (
    <div className="col-md-8 mx-auto my-2 p-3">
      <Button onClick={handleShow} text="New"></Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Rental</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="form-label">Movie</label>
              <Select
                options={options}
                isMulti={true}
                onChange={(values) => (
                  setValues({
                    customer_id: values.customer_id,
                    movie: values,
                  }),
                  setErrors({ customer_id: errors.customer_id, movie: null })
                )}
                name="movie"
              />
              <ErrorMessage name="movie" touched={touched} errors={errors} />
            </div>
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

            <Button loading={isSubmitting} />
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default NewRentals;
