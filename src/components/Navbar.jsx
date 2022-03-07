import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Navbar.css";
export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      {" "}
      <nav className="navigation">
        <h1
          className="tag"
          onClick={() => {
            navigate("/");
          }}
        >
          Wine Application
        </h1>
        <ul>
          <li id="gtcart">
            <Link to="/cart">Go to Cart</Link>
          </li>
          <li id="gthome">
            <Link to="/">Do Shopping</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
