import React from "react";

function ErrorMessage({ errors, name, touched }) {
  return (
    <div className="block">
      {errors[name] && touched[name] ? (
        <span className="small text-danger">{errors[name]}</span>
      ) : null}
    </div>
  );
}

export default ErrorMessage;
