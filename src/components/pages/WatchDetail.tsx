import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Button, Rate, Alert, Skeleton, Card, Space } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "@hooks/useAuth";
import StarRating from "@components/atoms/StarRating";
import { formatDateTime } from "@utils/FormatDateTime";
import api from "@services/api";
import { IComment } from "@interfaces/comment.interface";
import { IWatch } from "@interfaces/watch.interface";
import CustomTag from "@components/atoms/CustomTag";
import { ToastContainer, toast } from "react-toastify";

const WatchDetails = () => {
  const { auth } = useAuth();
  const { id } = useParams();
  const [watch, setWatch] = useState<IWatch | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchWatchDetails = async () => {
    try {
      const response = await api.get(`/watches/collection/${id}`);
      setWatch(response.data.data);
      setComments(response.data.data.comments);
      console.log(response.data.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch watch details. Please try again later.");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchWatchDetails();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      rating: 1,
      content: "",
    },
    validationSchema: Yup.object({
      rating: Yup.number()
        .min(1, "Rating must be at least 1")
        .max(3, "Rating must be at most 3")
        .required("Rating is required"),
      content: Yup.string().required("Comment is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await api.post(`/watches/collection/${id}`, values);
        if (response.status === 201) {
          fetchWatchDetails();
          resetForm(); // Clear form after successful submission
          toast.success("Comment submitted successfully!");
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.error || "Failed to submit comment.",
        );
      }
    },
  });

  if (loading) {
    return <Skeleton active />;
  }

  if (!watch) {
    return (
      <div className="img-container my-auto">
        <img src="/public/empty.png" alt="Empty data" className="img" />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
      <Space direction="vertical" size="large">
        <Card>
          <Space
            direction="horizontal"
            size="large"
            className="d-flex align-items-start"
          >
            <div className="img-watch-admin-container">
              <img
                src={watch.image}
                alt={watch.watchName}
                className="img-watch-information"
              />
            </div>
            <div>
              <h4 className="mb-3">{watch?.brand?.brandName.toUpperCase()}</h4>
              <h5 className="d-inline-block me-2 fw-bold">{watch.watchName}</h5>
              <CustomTag
                type={watch?.automatic ? "Automatic" : "Non-automatic"}
              />
              <br />
              <div className="d-flex gap-3">
                <Rate
                  count={3}
                  defaultValue={watch?.averageRating}
                  allowHalf
                  disabled
                />
                <div className="ml-2">
                  (
                  {watch?.totalComments && watch?.totalComments > 0
                    ? `${watch?.totalComments} comments`
                    : `${watch?.totalComments} comment`}{" "}
                  )
                </div>
              </div>
              <h4 className="mt-2 fw-bold">${watch.price}</h4>
              <p className="mt-4">
                <strong>Description:</strong> {watch.watchDescription}
              </p>
            </div>
          </Space>
        </Card>

        <div className="rating-container mt-5">
          <h4 className="fw-bold">Member feedbacks</h4>
          {auth?.member && !auth?.member.isAdmin ? (
            <Card className="my-3 bg-custom-third p-4 rounded-1">
              <Form onFinish={formik.handleSubmit}>
                <div className="w-100 d-flex justify-content-center">
                  <Form.Item
                    name="rating"
                    validateStatus={
                      formik.errors.rating && formik.touched.rating
                        ? "error"
                        : ""
                    }
                    help={
                      formik.errors.rating && formik.touched.rating
                        ? formik.errors.rating
                        : ""
                    }
                  >
                    <Rate
                      count={3}
                      name="rating"
                      value={formik.values.rating}
                      onChange={(value) =>
                        formik.setFieldValue("rating", value)
                      }
                    />
                  </Form.Item>
                </div>
                <Form.Item
                  name="content"
                  validateStatus={
                    formik.errors.content && formik.touched.content
                      ? "error"
                      : ""
                  }
                  help={
                    formik.errors.content && formik.touched.content
                      ? formik.errors.content
                      : ""
                  }
                >
                  <Input.TextArea
                    rows={4}
                    name="content"
                    value={formik.values.content}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Form.Item>
                <div className="w-100 d-flex justify-content-center">
                  <Form.Item>
                    <Button
                      type="primary"
                      className="bg-dark"
                      htmlType="submit"
                      loading={formik.isSubmitting}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </Card>
          ) : (
            <div className="my-3 rounded-1 d-flex flex-column align-items-center justify-content-center bg-custom p-4">
              <p>You must have an account to comment!</p>
              <a href="/auth/login" className="btn btn-dark">
                Login
              </a>
            </div>
          )}

          {comments?.length > 0 ? (
            <ul className="list-group mb-4">
              {comments.map((comment) => (
                <li
                  key={comment._id}
                  className="list-group-item d-flex flex-column my-2"
                >
                  <div className="d-flex align-items-center gap-2">
                    <Rate count={3} disabled defaultValue={comment.rating} />
                    <small className="text-secondary">
                      {formatDateTime(comment.createdAt)}
                    </small>
                  </div>
                  <div>
                    <strong>{comment.author.name}</strong>
                    <p className="mt-2">{comment.content}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="d-flex flex-column align-items-center justify-content-center">
              <div className="img-container my-auto">
                <img src="/public/empty.png" alt="Empty data" className="img" />
              </div>
              <p>No comments yet. Be the first to comment!</p>
            </div>
          )}
        </div>
      </Space>
    </div>
  );
};

export default WatchDetails;
