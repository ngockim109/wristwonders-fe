import React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "@services/api"; // Import your API service

const Navbar = ({ member, handleLogout }) => {
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  const handleSearch = async (query) => {
    try {
      const response = await api.get(
        `/watches/search?query=${encodeURIComponent(query)}`,
      );
      if (response.status === 200) {
        // Redirect to search results page
        navigate(`/search?query=${encodeURIComponent(query)}`);
      } else {
        console.error("Failed to fetch search results");
        // Handle error case if needed
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      // Handle error case if needed
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const query = formData.get("query").toString().trim();
    handleSearch(query);
  };

  return (
    <nav
      className="navbar navbar-dark bg-dark border-bottom border-body navbar-expand-lg"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand text-decoration-none text-light" to="/">
          <h3>WristWonders</h3>
        </Link>
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
          <ul className="navbar-nav mr-2 mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active text-light text-decoration-none"
                aria-current="page"
                to="/"
              >
                HOME
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <form onSubmit={handleSubmit} className="d-flex me-4">
              <input
                className="form-control search-input"
                type="text"
                name="query"
                placeholder="Search watch name..."
                aria-label="Search"
                required
              />
              <button
                className="btn btn-outline-success btn-search bg-custom"
                type="submit"
              >
                Search
              </button>
            </form>
            {member ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center text-decoration-none text-light d-flex gap-2"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle d-flex align-items-center"></i>
                  {member.membername}
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  {member.isAdmin ? (
                    <>
                      <li>
                        <Link
                          className="dropdown-item text-decoration-none text-dark"
                          to="/profile"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item text-decoration-none text-dark"
                          to="/brands"
                        >
                          Management
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          className="dropdown-item text-decoration-none text-dark"
                          to="/profile"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item text-decoration-none text-dark"
                          to="/profile/feedbacks"
                        >
                          My feedbacks
                        </Link>
                      </li>
                    </>
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

export default Navbar;
