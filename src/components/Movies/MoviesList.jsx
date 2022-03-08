import moment from "moment";
import React, { useState } from "react";
import Button from "../others/Button";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { Modal } from "react-bootstrap";
import ErrorMessage from "../others/ErrorMessage";

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  genre_id: Yup.number().required(),
});

function MoviesList({ movies, onReload, genres }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleOnDelete = (id) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete("http://127.0.0.1:8000/api/movies/delete/" + id)
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
    setValues,
  } = useFormik({
    initialValues: {
      id: "",
      title: "",
      genre_id: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .put("http://127.0.0.1:8000/api/movies/" + values.id, values)
        .then((response) => alert(response.data.message))
        .catch((errors) => {
          if (errors.response.status == 422) {
            setErrors(errors.response.data.errors);
          }
        })
        .finally(() => (setSubmitting(false), onReload()));
    },
  });
  const handleShow = (movie) => {
    setShow(true);
    setValues(movie);
  };
  return (
    <>
      <div className="col-md-8 mx-auto my-2 p-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Movies list</h5>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">genre</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {movies.map((movie, index) => (
                    <tr key={movie.id}>
                      <th>{index + 1}</th>
                      <th>{movie.title}</th>
                      <td>{movie.genre.name}</td>
                      <td>
                        <Button
                          className="btn-danger"
                          deleteBtn
                          onClick={() => handleOnDelete(movie.id)}
                        />
                        <Button text="Edit" onClick={() => handleShow(movie)} />
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
          <Modal.Title>Edit movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="form-label">Title</label>
              <input
                value={values.title}
                onChange={handleChange}
                className="form-control mb-1"
                name="title"
                onBlur={handleBlur}
              />
              <ErrorMessage name="title" touched={touched} errors={errors} />
            </div>
            <div>
              <label className="form-label">genre</label>
              <select
                onBlur={handleBlur}
                value={values.genre_id}
                onChange={handleChange}
                className="form-control mb-1"
                as="select"
                name="genre_id"
              >
                <option value="">Select genre</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
              <ErrorMessage name="genre_id" touched={touched} errors={errors} />
            </div>
            <Button loading={isSubmitting} />
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MoviesList;
