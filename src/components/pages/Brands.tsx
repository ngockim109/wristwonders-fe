/* eslint-disable no-useless-catch */
import React, { useEffect, useState } from "react";
import { Button, Layout } from "antd";
import BrandCreateModal from "@components/organisms/BrandCreateModal";
import BrandUpdateModal from "@components/organisms/BrandUpdateModal";
import BrandDeleteModal from "@components/organisms/BrandDeleteModal";
import BrandList from "@components/templates/BrandList";
import api from "@services/api";
import LoadingComponent from "@components/atoms/LoadingComponent";
import { ToastContainer, toast } from "react-toastify";

const { Content } = Layout;

const Brands = () => {
  const [modalVisible, setModalVisible] = useState({
    create: false,
    update: false,
    delete: false,
  });
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const response = await api.get("/brands");
      if (response.status === 200) {
        setBrands(response.data.data);
      } else {
        toast.error("Failed to fetch brands");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBrand = async (values) => {
    try {
      const response = await api.post("/brands", values);
      if (response.status === 201) {
        fetchBrands(); // Update brands state with new brand
        toast.success("Brand created successfully!");
        setModalVisible({ ...modalVisible, create: false });
      } else {
        toast.error("Failed to create brand");
      }
    } catch (error) {
      throw error;
    }
  };

  const handleUpdateBrand = async (values) => {
    try {
      const response = await api.put(`/brands/${selectedBrand?._id}`, values);
      if (response.status === 200) {
        fetchBrands();
        toast.success("Brand updated successfully!");
        setModalVisible({ ...modalVisible, update: false });
      } else {
        toast.error("Failed to update brand");
      }
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteBrand = async () => {
    try {
      const response = await api.delete(`/brands/${selectedBrand._id}`);
      if (response.status === 200) {
        fetchBrands();
        toast.success("Brand deleted successfully!");
        setModalVisible({ ...modalVisible, delete: false });
      } else {
        toast.error("Failed to delete brand");
      }
    } catch (error) {
      throw error;
    }
  };

  const showCreateModal = () => {
    setModalVisible({ ...modalVisible, create: true });
  };

  const showUpdateModal = (brand) => {
    setSelectedBrand(brand);
    setModalVisible({ ...modalVisible, update: true });
  };

  const showDeleteModal = (brand) => {
    setSelectedBrand(brand);
    setModalVisible({ ...modalVisible, delete: true });
  };

  const handleCancel = () => {
    setModalVisible({ create: false, update: false, delete: false });
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div>
      <Content style={{ margin: "0 16px" }}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
        />
        <div className="site-layout-background px-3 pt-3">
          <h2>Brand Management</h2>
          <div className="d-flex justify-content-end px-4">
            <Button
              type="primary"
              className="bg-custom text-dark fw-bold"
              onClick={showCreateModal}
            >
              Create Brand
            </Button>
          </div>

          <BrandCreateModal
            visible={modalVisible.create}
            onCreate={handleCreateBrand}
            onCancel={handleCancel}
          />

          <BrandUpdateModal
            visible={modalVisible.update}
            onClose={handleCancel}
            onUpdate={handleUpdateBrand}
            initialValues={selectedBrand}
          />

          <BrandDeleteModal
            visible={modalVisible.delete}
            onClose={handleCancel}
            onDelete={handleDeleteBrand}
          />

          <BrandList
            brands={brands}
            onEdit={showUpdateModal}
            onDelete={showDeleteModal}
          />
        </div>
      </Content>
    </div>
  );
};

export default Brands;
