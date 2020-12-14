import React, { useState, useEffect } from "react";
import { Button, Container, Form, Col } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import blogActions from "../redux/actions/blog.actions";
import routeActions from "../redux/actions/route.actions";

const AddEditBlogPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    images: [],
  });
  const [addImage, setAddImage] = useState(false);
  const loading = useSelector((state) => state.blog.loading);
  const selectedBlog = useSelector((state) => state.blog.selectedBlog);
  const redirectTo = useSelector((state) => state.route.redirectTo);

  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const addOrEdit = params.id ? "Edit" : "Add";
  const blogId = params.id;

  useEffect(() => {
    if (blogId) {
      if (!selectedBlog) {
        dispatch(blogActions.getSingleBlog(blogId));
      }
      setFormData((formData) => ({
        ...formData,
        title: selectedBlog.title,
        content: selectedBlog.content,
        images: selectedBlog.images,
      }));
    }
  }, [blogId, selectedBlog, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, content, images } = formData;
    console.log(formData);
    if (addOrEdit === "Add") {
      dispatch(blogActions.createNewBlog(title, content, images));
    } else if (addOrEdit === "Edit") {
      dispatch(
        blogActions.updateBlog(selectedBlog._id, title, content, images)
      );
    }
  };

  const handleAddImage = () => {
    setAddImage(!addImage);
  };

  const handleCancel = () => {
    history.goBack();
  };

  const handleDelete = () => {
    dispatch(blogActions.deleteBlog(selectedBlog._id, "/"));
  };

  useEffect(() => {
    if (redirectTo) {
      if (redirectTo === "__GO_BACK__") {
        history.goBack();
        dispatch(routeActions.removeRedirectTo());
      } else {
        history.push(redirectTo);
        dispatch(routeActions.removeRedirectTo());
      }
    }
    // console.log(formData);
  }, [redirectTo, dispatch, history]);

  return (
    <Container className="d-flex align-items-center flex-column">
      <h1 className="text-primary mb-4">{addOrEdit} blog</h1>
      {addOrEdit === "Edit" && (
        <Button
          variant="danger"
          className="mb-4"
          onClick={handleDelete}
          disabled={loading}
        >
          Delete Blog
        </Button>
      )}
      <Form style={{ width: "35em" }} onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Control
            type="text"
            required
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="content">
          <Form.Control
            as="textarea"
            rows="10"
            placeholder="Content"
            name="content"
            value={formData.content}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Row>
            <Button
              className="ml-3 mb-3"
              variant="info"
              onClick={handleAddImage}
            >
              Add Images
            </Button>
            {addImage ? (
              <>
                <Form.Label htmlFor="imageLink" column sm="2">
                  Image Url:
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    id="review"
                    name="images"
                    type="text"
                    className="mb-3 ml-5"
                    value={formData.images}
                    onChange={handleChange}
                  />
                </Col>
              </>
            ) : (
              <></>
            )}
          </Form.Row>
          <Form.Row className="d-flex justify-content-around">
            <Button style={{ width: "16rem" }} type="submit">
              Submit
            </Button>
            <Button
              style={{ width: "16rem" }}
              variant="light"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Form.Row>
          <Form.Row></Form.Row>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default AddEditBlogPage;
