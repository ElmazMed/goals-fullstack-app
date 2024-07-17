import { Link } from "react-router-dom";
import { FaSignInAlt, FaUserAlt } from "react-icons/fa";

function Header() {
  return (
    <>
      <div className="header">
        <div className="logo">
          <Link to="/">
            <h1>Goals.</h1>
          </Link>
        </div>

        <ul>
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
        </ul>
      </div>
    </>
  );
}

export default Header;
