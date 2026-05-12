import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          ShopHub
        </Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/checkout" className="navbar-link">
            Cart
          </Link>
        </div>
        <div className="navbar-auth">
          <div className="navbar-auth-links">
            {!user && (
              <>
                <Link to="/auth" className="btn btn-secondary">
                  Login
                </Link>
                <Link to="/auth" className="btn btn-primary">
                  Signup
                </Link>
              </>
            )}
            {user && (
              <button onClick={logout} className="btn btn-secondary">
                Logout
              </button>
            )}  
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
