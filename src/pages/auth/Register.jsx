import React from 'react'

function Register() {
  return (
    <div>
      <div className="row">
        <div className="col-md-6 mx-auto my-5">
          <h2>Register</h2>
          <form className="px-8" action="/admin">
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputConfrimPassword1" className="form-label">
                Confrim Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputConfrimPassword1"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register