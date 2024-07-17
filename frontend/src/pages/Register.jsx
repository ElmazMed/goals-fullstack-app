import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: [e.target.value],
    }));
  };

  const onSubmit = (e) => e.preventDefault();

  return (
    <>
      <section className="heading">
        <h3>
          <FaUser /> Register
        </h3>
        <p>Please create your account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={onChange}
              id="name"
              name="name"
              placeholder="Add your name"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={onChange}
              id="email"
              name="email"
              placeholder="Add your email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={onChange}
              id="password"
              name="password"
              placeholder="Add your password"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={onChange}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm password"
            />
          </div>
          <button type="submit" className="btn btn-block">
            Register
          </button>
        </form>
      </section>
    </>
  );
}

export default Register;
