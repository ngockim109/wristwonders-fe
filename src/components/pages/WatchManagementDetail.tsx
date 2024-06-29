/* eslint-disable no-useless-catch */
import React, { useState, useEffect } from "react";
import { Button, Card } from "antd";
import { useParams } from "react-router-dom";
import api from "@services/api";
import { ToastContainer, toast } from "react-toastify";
import LoadingComponent from "@components/atoms/LoadingComponent";
import { formatDate } from "@utils/FormatDateTime";
import WatchUpdateModal from "@components/organisms/WatchUpdateModal";
import WatchDeleteModal from "@components/organisms/WatchDeleteModal";
import CustomTag from "@components/atoms/CustomTag";
import { IWatch } from "@interfaces/watch.interface";
import { IBrand } from "@interfaces/brand.interface";

const WatchManagementDetails = () => {
  const { id } = useParams();
  const [watch, setWatch] = useState<IWatch | null>(null);
  const [loading, setLoading] = useState(true);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [loadingBrand, setLoadingBrand] = useState(true);

  useEffect(() => {
    fetchWatchDetails();
  }, []);
  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchWatchDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/watches/${id}`);
      if (response.status === 200) {
        setWatch(response?.data?.data?.watch);
      } else {
        toast.error("Failed to fetch watch details");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBrands = async () => {
    try {
      setLoadingBrand(true);
      const response = await api.get(`/brands`);
      if (response.status === 200) {
        setBrands(response?.data?.data || []);
      } else {
        toast.error("Failed to fetch brands");
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setLoadingBrand(false);
    }
  };

  const handleUpdate = async (updatedValues: IWatch) => {
    try {
      const response = await api.put(`/watches/${id}`, updatedValues);
      if (response.status === 200) {
        setWatch(response.data);
        toast.success(response.data.message ?? "Watch updated successfully");
        setUpdateModalVisible(false);
      } else {
        toast.error("Failed to update watch");
      }
    } catch (error) {
      throw error;
    }
  };

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/watches/${id}`);
      if (response.status === 200) {
        toast.success(response.data.message ?? "Watch deleted successfully!");
        setDeleteModalVisible(false);
        setWatch(null);
      } else {
        throw new Error("Failed to delete watch!");
      }
    } catch (error) {
      throw error;
    }
  };

  const updateInitialValues = { ...watch, brandId: watch?.brand?._id };
  if (loading) {
    return <LoadingComponent />;
  }

  if (!watch) {
    return (
      <div className="img-container my-auto">
        <img src="/public/empty.png" alt="Empty data" className="img" />
      </div>
    );
  }

  return (
    <div className="d-flex w-100">
      <div className="main-content" id="admin-layout">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
        />
        <div className="container mt-4">
          <div className="d-flex align-items-center gap-2">
            <h2>{watch.watchName}</h2>
            <Button type="primary" onClick={() => setUpdateModalVisible(true)}>
              <i className="bi bi-pencil-square"></i>
            </Button>
          </div>

          <Card title="Watch Information" className="mt-3">
            <div className="d-flex gap-4">
              <div className="img-watch-admin-container">
                <img
                  src={watch.image}
                  alt={watch.watchName}
                  className="img-watch-admin"
                />
              </div>
              <div>
                <p>
                  <strong>Brand:</strong> {watch?.brand?.brandName}
                  <br />
                  <strong>Price:</strong> ${watch.price}
                  <br />
                  <strong>Automatic:</strong>
                  <CustomTag
                    type={watch?.automatic ? "Automatic" : "Non-automatic"}
                  />
                  <br />
                  <strong>Description:</strong> {watch.watchDescription}
                  <br />
                  <strong>Created Date:</strong> {formatDate(watch.createdAt)}
                  <br />
                  <strong>Updated Date:</strong> {formatDate(watch.updatedAt)}
                  <br />
                </p>
              </div>
            </div>
          </Card>
          <div className="d-flex justify-content-end mt-3">
            <Button
              type="primary"
              danger
              onClick={() => setDeleteModalVisible(true)}
            >
              <i className="bi bi-trash"></i> Delete watch
            </Button>
          </div>
        </div>
        {loadingBrand ? (
          <LoadingComponent />
        ) : (
          <WatchUpdateModal
            visible={updateModalVisible}
            onClose={() => setUpdateModalVisible(false)}
            onUpdate={handleUpdate}
            initialValues={updateInitialValues}
            brands={brands}
          />
        )}
        <WatchDeleteModal
          visible={deleteModalVisible}
          onClose={() => setDeleteModalVisible(false)}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default WatchManagementDetails;
