/* eslint-disable no-useless-catch */
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import api from "@services/api"; // Giả định rằng bạn có một dịch vụ API để gọi các endpoint.
import { useParams } from "react-router-dom";
import LoadingComponent from "@components/atoms/LoadingComponent";
import { ToastContainer, toast } from "react-toastify";
import BrandUpdateModal from "@components/organisms/BrandUpdateModal";
import BrandDeleteModal from "@components/organisms/BrandDeleteModal";

const BrandDetail = () => {
  const { id } = useParams();
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  useEffect(() => {
    fetchBrandDetails();
  }, [id]);

  const fetchBrandDetails = async () => {
    try {
      const response = await api.get(`/brands/${id}`);
      if (response.status === 200) {
        setBrand(response.data.data);
      } else {
        toast.error("Failed to fetch brand details.");
      }
    } catch (err) {
      toast.error(`Error fetching brand details: ${err.error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBrand = async (values) => {
    try {
      const response = await api.put(`/brands/${id}`, values);
      if (response.status === 200) {
        toast.success(response.data.message ?? "Brand updated successfully!");
        fetchBrandDetails();
      } else if (response.status === 400) {
        toast.error(response.data.error ?? "Failed to update brand.");
      } else {
        toast.error("Failed to update brand.");
      }
    } catch (err) {
      throw err;
    }
  };

  const handleDeleteBrand = async () => {
    try {
      const response = await api.delete(`/brands/${id}`);
      if (response.status === 200) {
        toast.success(response.data.message ?? "Brand deleted successfully!");
        setBrand(null);
      } else {
        toast.error(response.data.error ?? "Failed to delete brand.");
      }
    } catch (err) {
      throw err;
    }
  };

  if (loading) {
    return <LoadingComponent></LoadingComponent>; // Replace with a proper loading component if available
  }

  if (!brand) {
    return (
      <div className="img-container my-auto">
        <img src="/public/empty.png" alt="Empty data" className="img" />
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
      <div className="d-flex align-items-center gap-2">
        <h2>Brand Details</h2>
        <Button
          type="primary"
          className="bg-custom text-dark"
          onClick={() => setModalVisible(true)}
        >
          <i className="bi bi-pencil-square d-flex justify-content-center align-items-center"></i>
        </Button>
      </div>
      <div className="card mt-3">
        <div className="card-header">
          <h5 className="card-title">Brand Name: {brand.brandName}</h5>
        </div>
        <div className="card-body">
          <p className="card-text">ID: {brand._id}</p>
          <p className="card-text">
            Created At: {new Date(brand.createdAt).toLocaleDateString()}
          </p>
          <p className="card-text">
            Updated At: {new Date(brand.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="d-flex justify-content-end mt-3">
        <Button
          type="primary"
          danger
          onClick={() => setDeleteModalVisible(true)}
        >
          <i className="bi bi-trash d-flex justify-content-center align-items-center"></i>
          Delete
        </Button>
      </div>

      {/* Update Brand Modal */}
      <BrandUpdateModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onUpdate={handleUpdateBrand}
        initialValues={{ brandName: brand.brandName }}
      />

      {/* Delete Brand Modal */}
      <BrandDeleteModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onDelete={handleDeleteBrand}
      />
    </div>
  );
};

export default BrandDetail;
