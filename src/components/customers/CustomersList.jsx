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
  name: Yup.string().required(),
  membership_id: Yup.number().required(),
  dob: Yup.date().required(),
});

function CustomersList({ customers, onReload, memberships }) {
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
              .delete("http://127.0.0.1:8000/api/customers/delete/" + id)
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
      name: "",
      membership_id: "",
      dob: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .put("http://127.0.0.1:8000/api/customers/" + values.id, values)
        .then((response) => alert(response.data.message))
        .catch((errors) => {
          if (errors.response.status == 422) {
            setErrors(errors.response.data.errors);
          }
        })
        .finally(() => (setSubmitting(false), onReload()));
    },
  });
  const handleShow = (customer) => {
    setShow(true);
    setValues(customer);
  };
  return (
    <>
      <div className="col-md-8 mx-auto my-2 p-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Customers list</h5>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Membership</th>
                    <th scope="col">Date of Birth</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer, index) => (
                    <tr key={customer.id}>
                      <th>{index + 1}</th>
                      <th>{customer.name}</th>
                      <td>{customer.membership.name}</td>
                      <td>{moment(customer.dob).format("LL")}</td>
                      <td>
                        <Button
                          className="btn-danger"
                          deleteBtn
                          onClick={() => handleOnDelete(customer.id)}
                        />
                        <Button
                          text="Edit"
                          onClick={() => handleShow(customer)}
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
          <Modal.Title>Edit Customer</Modal.Title>
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
    </>
  );
}

export default CustomersList;
