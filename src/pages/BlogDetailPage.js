import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Moment from "react-moment";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import blogActions from "../redux/actions/blog.actions";
import routeActions from "../redux/actions/route.actions";

const BlogDetailPage = () => {
  const blog = useSelector((state) => state.blog.selectedBlog);
  const redirectTo = useSelector((state) => state.route.redirectTo);
  const currentUser = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.blog.loading);
  const submitLoading = useSelector((state) => state.blog.submitLoading);

  const params = useParams();
  const [reviewText, setReviewText] = useState("");

  const handleInputChange = (e) => {
    setReviewText(e.target.value);
  };
  const handleSubmitReview = (e) => {
    e.preventDefault();
    dispatch(blogActions.createReview(params.id, reviewText));
    setReviewText("");
  };

  const history = useHistory();
  const dispatch = useDispatch();

  const handleGoBack = () => {
    dispatch(routeActions.redirect(`/`));
  };

  useEffect(() => {
    if (redirectTo) {
      history.push(redirectTo);
      dispatch(routeActions.removeRedirectTo());
    }
  }, [dispatch, history, redirectTo]);

  return (
    <Container>
      <div className="d-flex justify-content-between">
        <Button onClick={handleGoBack}>Back</Button>
        {blog?._id && currentUser?._id === blog?.author?._id ? (
          <Link to={`/blog/edit/${blog._id}`}>
            <Button variant="primary">Edit</Button>
          </Link>
        ) : (
          <></>
        )}
      </div>
      <h3>{blog && blog.title}</h3>
      <p className="text-muted">
        @{blog && blog.author?.name} wrote{" "}
        <Moment fromNow>{blog?.createdAt}</Moment>
      </p>
      <hr />
      <p>{blog && blog.content}</p>
      <hr />
      <ul className="list-unstyled">
        {blog &&
          blog.reviews?.map((review) => {
            return (
              <li key={review._id}>
                <p style={{ fontSize: "2rem" }}>
                  <i>{review.content}</i>
                </p>
                <span style={{ fontSize: "0.8rem" }}>
                  posted by <strong>{review.user.name}</strong> on
                  <strong>
                    <Moment fromNow>{review.createdAt}</Moment>{" "}
                  </strong>
                </span>
                <hr />
              </li>
            );
          })}
        {isAuthenticated ? (
          <>
            <Form onSubmit={handleSubmitReview}>
              <Form.Group as={Row}>
                <Form.Label htmlFor="review" column sm="2">
                  Review:
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    id="review"
                    type="text"
                    value={reviewText}
                    onChange={handleInputChange}
                  />
                </Col>
                {submitLoading && loading ? (
                  <Button variant="primary" type="button" disabled>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Submitting...
                  </Button>
                ) : (
                  <Button type="submit" disabled={!reviewText}>
                    Submit
                  </Button>
                )}
              </Form.Group>
            </Form>
          </>
        ) : (
          <></>
        )}
      </ul>
    </Container>
  );
};

export default BlogDetailPage;
