import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LoadingComponent from "@components/atoms/LoadingComponent";
import api from "@services/api"; // Import your API service

const SearchResult = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          `/watches/search?query=${encodeURIComponent(query)}`,
        );
        if (response.status === 200) {
          console.log(response.data);
          const searchData = response.data; // Assuming your API returns relevant data
          setWatches(searchData?.data?.watches); // Update to match your API response structure
        } else {
          console.error("Failed to fetch search results");
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div>
      <div className="rounded-1 bg-new-secondary py-2 px-3 mt-3 d-flex align-items-center">
        <Link to="/" className="text-decoration-none">
          Home
        </Link>
        <i className="bi bi-chevron-right mx-1"></i>
        <span>{`Search result for "${query}" (${watches?.length > 1 ? `${watches?.length} results` : `${watches?.length} result`})`}</span>
      </div>
      {watches?.length > 0 ? (
        <div className="watch-cards my-4 container">
          {watches.map((watch) => (
            <div key={watch._id} className="watch-card mb-4">
              <div className="card">
                <Link
                  to={`/watches/collection/${watch._id}`}
                  className="text-decoration-none text-dark"
                >
                  <div className="img-watch-container">
                    <img
                      src={watch.image}
                      alt={`${watch.watchName} Image`}
                      className="img-watch"
                    />
                  </div>
                  <div className="d-flex justify-content-center flex-column align-items-center">
                    <div className="mt-2 mb-1">
                      {watch.brand.brandName.toUpperCase()}
                    </div>
                    <span className="fw-bold">{watch.watchName}</span>
                  </div>
                  <button type="button" className="btn bg-custom w-100 mt-2">
                    <Link
                      to={`/watches/collection/${watch._id}`}
                      className="text-decoration-none text-dark"
                    >
                      View Details
                    </Link>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="img-container my-auto d-flex flex-column justify-content-center align-items-center mt-5">
          <img src="/public/empty.png" alt="Empty data" className="img" />
          <span>No watches found matching "{query}"</span>
        </div>
      )}
    </div>
  );
};

export default SearchResult;
