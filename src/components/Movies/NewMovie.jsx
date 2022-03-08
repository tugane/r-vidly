import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import * as Yup from "yup";
import Button from "../others/Button";
import ErrorMessage from "../others/ErrorMessage";

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  genre_id: Yup.number().required(),
});

function NewMovie({ genres, onReload }) {
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
  } = useFormik({
    initialValues: {
      title: "",
      genre_id: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .post("http://127.0.0.1:8000/api/movies", values)
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

  return (
    <div className="col-md-8 mx-auto my-2 p-3">
      <Button onClick={handleShow} text="New"></Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="form-label">Name</label>
              <input
                value={values.title}
                onChange={handleChange}
                className="form-control mb-1"
                name="title"
                onBlur={handleBlur}
                placeholder="Movie Title"
              />
              <ErrorMessage name="title" touched={touched} errors={errors} />
            </div>
            <div>
              <label className="form-label">Genre</label>
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
    </div>
  );
}

export default NewMovie;
