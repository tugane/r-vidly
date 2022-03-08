import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import * as Yup from "yup";
import Button from "../others/Button";
import ErrorMessage from "../others/ErrorMessage";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  membership_id: Yup.number().required(),
  dob: Yup.date().required(),
});

function NewCustomer({ memberships, onReload }) {
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
      name: "",
      membership_id: "",
      dob: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .post("http://127.0.0.1:8000/api/customers", values)
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
          <Modal.Title>New Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="form-label">Name</label>
              <input
                value={values.name}
                onChange={handleChange}
                className="form-control mb-1"
                name="name"
                onBlur={handleBlur}
              />
              <ErrorMessage name="name" touched={touched} errors={errors} />
            </div>
            <div>
              <label className="form-label">Membership</label>
              <select
                onBlur={handleBlur}
                value={values.membership_id}
                onChange={handleChange}
                className="form-control mb-1"
                as="select"
                name="membership_id"
              >
                <option value="">Select Membership</option>
                {memberships.map((membership) => (
                  <option key={membership.id} value={membership.id}>
                    {membership.name}
                  </option>
                ))}
              </select>
              <ErrorMessage
                name="membership_id"
                touched={touched}
                errors={errors}
              />
            </div>
            <div>
              <label className="form-label">Date of Birth</label>
              <input
                value={values.dob}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control mb-1"
                type="date"
                name="dob"
              />
              <ErrorMessage name="dob" touched={touched} errors={errors} />
            </div>
            <Button loading={isSubmitting} />
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default NewCustomer;
