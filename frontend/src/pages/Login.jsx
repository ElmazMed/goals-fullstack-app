import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
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
          <FaSignInAlt /> Login
        </h3>
        <p>Login to your account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
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

          <button type="submit" className="btn btn-block">
            Login
          </button>
        </form>
      </section>
    </>
  );
}

export default Login;
