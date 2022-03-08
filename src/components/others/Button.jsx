import React from "react";
import { FiTrash } from "react-icons/fi";
function Button({
  loading,
  type = "submit",
  text = "submit",
  onClick,
  className,
  deleteBtn,
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      type={type}
      className={`btn btn-primary m-1 btn-sm  ` + className}
    >
      {loading ? (
        <div className="spinner-border spinner-border-sm" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : deleteBtn ? (
        <FiTrash />
      ) : (
        text
      )}
    </button>
  );
}

export default Button;
