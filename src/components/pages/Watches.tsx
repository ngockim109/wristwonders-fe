import React, { useEffect, useState } from "react";
import { Button } from "antd";
import WatchCreateModal from "@components/organisms/WatchCreateModal";
import WatchList from "@components/templates/WatchList";
import WatchUpdateModal from "@components/organisms/WatchUpdateModal";
import WatchDeleteModal from "@components/organisms/WatchDeleteModal";
import api from "@services/api";
import LoadingComponent from "@components/atoms/LoadingComponent";
import { IBrand } from "@interfaces/brand.interface";
import { ToastContainer, toast } from "react-toastify";
import { IWatch } from "@interfaces/watch.interface";

const Watches = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [watches, setWatches] = useState<IWatch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingBrand, setLoadingBrand] = useState<boolean>(true);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [selectedWatch, setSelectedWatch] = useState<IWatch | null>(null); // State for the selected watch

  useEffect(() => {
    fetchWatches();
    fetchBrands();
  }, []);

  const fetchWatches = async () => {
    try {
      setLoading(true);
      const response = await api.get("/watches");
      if (response) {
        setWatches(response.data.data.watches); // Update watches state with data from API
      } else {
        console.error("Failed to fetch watches");
      }
    } catch (error) {
      console.error("Error fetching watches:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBrands = async () => {
    try {
      setLoadingBrand(true);
      const response = await api.get("/brands");
      if (response.status === 200) {
        setBrands(response.data.data || []);
      } else {
        toast.error("Failed to fetch brands");
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setLoadingBrand(false);
    }
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setUpdateModalVisible(false);
    setDeleteModalVisible(false);
    setSelectedWatch(null); // Clear selected watch when closing modals
  };

  const handleUpdate = async (updatedValues: IWatch) => {
    try {
      const response = await api.put(
        `/watches/${selectedWatch?._id}`,
        updatedValues,
      );
      if (response.status === 200) {
        toast.success("Watch updated successfully");
        fetchWatches(); // Refresh watch list after update
      } else {
        toast.error("Failed to update watch");
      }
    } catch (error) {
      console.error("Error updating watch:", error);
      toast.error(
        error?.response?.data?.error ??
          `Error updating watch: ${error?.message}`,
      );
    } finally {
      handleCancel(); // Close the modal after updating
    }
  };

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/watches/${selectedWatch?._id}`);
      if (response.status === 200) {
        toast.success("Watch deleted successfully");
        fetchWatches(); // Refresh watch list after deletion
      } else {
        toast.error("Failed to delete watch");
      }
    } catch (error) {
      console.error("Error deleting watch:", error);
      toast.error(`Error deleting watch: ${error?.message}`);
    } finally {
      handleCancel(); // Close the modal after deletion
    }
  };

  const handleCreateWatch = async (values) => {
    try {
      const response = await api.post("/watches", values);
      console.log(response);
      if (response.status === 200) {
        fetchWatches(); // Update watches state with new watch
        toast.success("Watch created successfully!");
        setModalVisible(false); // Close the modal after successful creation
      } else {
        toast.error("Failed to create watch");
      }
    } catch (error) {
      toast.error(
        `${error?.response?.data?.error ?? "Failed to create watch"}`,
      );
    }
  };

  // Function to trigger update modal
  const openUpdateModal = (watch: IWatch) => {
    setSelectedWatch(watch);
    setUpdateModalVisible(true);
  };

  // Function to trigger delete modal
  const openDeleteModal = (watch: IWatch) => {
    setSelectedWatch(watch);
    setDeleteModalVisible(true);
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
      <h2 className="px-3 pt-3">Watch Management</h2>
      <div className="d-flex justify-content-end px-4">
        <Button
          type="primary"
          className="bg-custom text-dark fw-bold"
          onClick={showModal}
        >
          Create Watch
        </Button>
      </div>
      {!loadingBrand && (
        <WatchCreateModal
          onCreate={handleCreateWatch}
          visible={modalVisible}
          onCancel={handleCancel}
          brands={brands}
        />
      )}

      {/* List watches with actions for update and delete */}
      {loading ? (
        <LoadingComponent />
      ) : (
        <WatchList
          watches={watches}
          onEdit={openUpdateModal}
          onDelete={openDeleteModal}
        />
      )}

      {/* Update Watch Modal */}
      {selectedWatch && (
        <WatchUpdateModal
          visible={updateModalVisible}
          onClose={handleCancel}
          onUpdate={handleUpdate}
          initialValues={{ ...selectedWatch, brandId: selectedWatch.brand._id }}
          brands={brands}
        />
      )}

      {/* Delete Watch Modal */}
      {selectedWatch && (
        <WatchDeleteModal
          visible={deleteModalVisible}
          onClose={handleCancel}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Watches;
