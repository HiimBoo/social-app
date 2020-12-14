import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardColumns,
  Container,
  Jumbotron,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import blogActions from "../redux/actions/blog.actions";
import { ClipLoader } from "react-spinners";
import PaginationBar from "../components/PaginationBar";
import { useHistory } from "react-router-dom";
import routeActions from "../redux/actions/route.actions";
import Moment from "react-moment";

const HomePage = () => {
  const blogs = useSelector((state) => state.blog.blogs);
  const totalPageNum = useSelector((state) => state.blog.totalPageNum);
  const loading = useSelector((state) => state.blog.loading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [pageNum, setPageNum] = useState(1);

  const dispatch = useDispatch();
  const history = useHistory();
  const redirectTo = useSelector((state) => state.route.redirectTo);

  const handleClickBlog = (Id) => {
    dispatch(blogActions.getABlog(Id));
  };

  const handleWriteNow = () => history.push("/blog/add");

  useEffect(() => {
    dispatch(blogActions.blogsRequest(pageNum));
  }, [dispatch, pageNum]);

  useEffect(() => {
    if (redirectTo) {
      history.push(redirectTo);
      dispatch(routeActions.removeRedirectTo());
    }
  }, [dispatch, redirectTo, history]);

  return (
    <Container>
      <Jumbotron fluid>
        <Container className="text-center">
          <h1>Social Blog</h1>
          <p>Write about your amazing experiences.</p>
          {isAuthenticated ? (
            <Button onClick={handleWriteNow}>Write now</Button>
          ) : (
            ""
          )}
        </Container>
      </Jumbotron>
      <PaginationBar
        pageNum={pageNum}
        setPageNum={setPageNum}
        totalPageNum={totalPageNum}
      />
      {loading ? (
        <div className="text-center">
          <ClipLoader color="red" size={150} loading={true} />
        </div>
      ) : (
        <>
          {blogs.length > 0 ? (
            <ul className="d-flex flex-wrap justify-content-between">
              <CardColumns>
                {blogs?.map((blog) => (
                  <li key={blog._id} className="list-unstyled mb-4">
                    <Card onClick={() => handleClickBlog(blog._id)}>
                      <Card.Img
                        variant="top"
                        style={{ width: "20rem" }}
                        src={blog.images && blog.images[0]}
                      />
                      <Card.Body>
                        <Card.Title>{blog?.title}</Card.Title>
                        <Card.Text>{blog?.content}</Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">
                          @{blog?.author?.name}{" "}
                          <Moment fromNow>{blog?.createdAt}</Moment>
                        </small>
                      </Card.Footer>
                    </Card>
                  </li>
                ))}
              </CardColumns>
            </ul>
          ) : (
            <p>There are no blogs</p>
          )}
        </>
      )}
    </Container>
  );
};

export default HomePage;
