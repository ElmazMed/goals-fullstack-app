import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { login, reset } from "../features/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (isSuccess || user) {
      navigate("/dashboard");
    }
    if (isError) {
      if (message === "Request failed with status code 400") {
        setErrMsg("Sorry we could not find your account!");
      }
    }
    dispatch(reset());
  }, [user, isSuccess, isError, message, dispatch, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrMsg("Please add your email and password!");
    } else {
      const userData = { email, password };
      dispatch(login(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

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
            <p style={{ color: "crimson" }}>{errMsg}</p>
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
