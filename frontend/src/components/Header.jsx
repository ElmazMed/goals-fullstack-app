import { Link } from "react-router-dom";
import { FaSignInAlt, FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../features/AuthSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/register");
  };
  return (
    <>
      <div className="header">
        <div className="logo">
          <Link to="/">
            <h1>Goals.</h1>
          </Link>
        </div>

        <ul>
          {user ? (
            <li>
              <button className="btn" onClick={handleLogout}>
                {" "}
                <FaSignOutAlt /> Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <FaUserAlt /> Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default Header;
