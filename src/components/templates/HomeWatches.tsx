import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

const HomeWatches = ({ watches, brands, filterBrandName, onFilterChange }) => {
  const [selectedBrand, setSelectedBrand] = useState(filterBrandName);

  const handleSelectChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  const handleFilterClick = (event) => {
    event.preventDefault();
    onFilterChange(selectedBrand);
  };

  return (
    <div className="mb-3">
      <div className="mt-3 w-100 d-flex justify-content-end">
        <form className="d-flex gap-2 me-3" onSubmit={handleFilterClick}>
          <div className="d-flex gap-2">
            <select
              name="brand"
              id="brand"
              className="form-select"
              value={selectedBrand} // Controlled component with local state
              onChange={handleSelectChange} // Handle selection change
            >
              <option value="All">All Brands</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand.brandName}>
                  {brand.brandName}
                </option>
              ))}
            </select>
            <button type="submit" className="btn btn-dark">
              Filter
            </button>
          </div>
        </form>
      </div>

      {watches && watches.length > 0 ? (
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
                    <Button>View Details</Button>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="img-container my-auto d-flex flex-column justify-content-center align-items-center mt-5">
          <img src="/public/empty.png" alt="Empty data" className="img" />
          <span>No watches</span>
        </div>
      )}
    </div>
  );
};

export default HomeWatches;
