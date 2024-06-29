import React, { useEffect, useState } from "react";
import HomeWatches from "@components/templates/HomeWatches";
import api from "@services/api";
import LoadingComponent from "@components/atoms/LoadingComponent";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const [watches, setWatches] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filterBrandName, setFilterBrandName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();
  const navigate = useNavigate();

  const getQueryParams = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("brand") || "";
  };

  useEffect(() => {
    const fetchData = async (brandFilter: string) => {
      try {
        setLoading(true);
        const response = brandFilter
          ? await api.get(
              `/watches/filter?brand=${encodeURIComponent(brandFilter)}`,
            )
          : await api.get("/");

        if (response.status === 200) {
          const { watches, brands, message } = response.data.data || {};
          setWatches(watches || []);
          setBrands(brands || []);
          setMessage(message || "");
          setError("");
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage("");
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const brandFilter = getQueryParams();
    setFilterBrandName(brandFilter);
    fetchData(brandFilter);
  }, [location.search]);

  const handleFilterChange = (selectedBrand: string) => {
    setFilterBrandName(selectedBrand);
    selectedBrand
      ? navigate(`/?brand=${encodeURIComponent(selectedBrand)}`)
      : navigate(`/`);
  };

  return loading ? (
    <LoadingComponent />
  ) : (
    <div>
      <HomeWatches
        watches={watches}
        brands={brands}
        filterBrandName={filterBrandName}
        onFilterChange={handleFilterChange} // Pass the handler to the child component
      />
    </div>
  );
};

export default Home;
