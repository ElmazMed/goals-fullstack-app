import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../features/AuthSlice";
import Spinner from "../components/Spinner";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess || user) {
      navigate("/");
    }
    if (isError) {
      if (message === "Request failed with status code 401") {
        setErrMsg("This user is already registred");
      }
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  const [errMsg, setErrMsg] = useState("");

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setErrMsg("All the fields required!");
    } else if (password !== confirmPassword) {
      setErrMsg("Password doesn't match!");
    } else {
      const userData = { name, email, password };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

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
          <p style={{ color: "crimson" }}>{errMsg}</p>
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
