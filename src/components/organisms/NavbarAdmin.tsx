import { IMember } from "@interfaces/member.interface";
import React from "react";
import { Link } from "react-router-dom";
interface NavbarAdminProps {
  member: IMember;
  handleLogout: () => void;
}

const NavbarAdmin = ({ member, handleLogout }: NavbarAdminProps) => {
  return (
    <nav className="navbar border-bottom border-body navbar-expand-lg admin-navbar">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form> */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {member ? (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle d-flex align-items-center text-decoration-none text-dark d-flex gap-2"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle fs-5"></i>
                  {member.membername}
                </Link>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link
                      className="dropdown-item text-decoration-none text-light "
                      to="/profile"
                    >
                      Profile
                    </Link>
                  </li>
                  {member.isAdmin && (
                    <li>
                      <Link
                        className="dropdown-item text-decoration-none text-light"
                        to="/brands"
                      >
                        Management
                      </Link>
                    </li>
                  )}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-decoration-none text-dark"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  className="nav-link text-decoration-none text-light"
                  to="/auth/login"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
