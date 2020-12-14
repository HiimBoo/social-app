import * as types from "../constants/blog.constants";
import api from "../../apiService";
import routeActions from "./route.actions";
import { toast } from "react-toastify";

// the middleware functions will be here
const blogsRequest = (pageNum) => async (dispatch) => {
  dispatch({ type: types.GET_BLOGS_REQUEST, payload: null });
  try {
    // main code
    const res = await api.get(`/api/blogs?page=${pageNum}`);
    dispatch({ type: types.GET_BLOGS_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.GET_BLOGS_FAILURE, payload: null });
  }
};

const getABlog = (id) => async (dispatch) => {
  dispatch({ type: types.GET_BLOG_REQUEST, payload: null });
  try {
    // main code
    const res = await api.get(`/api/blogs/${id}`);
    dispatch({ type: types.GET_BLOG_SUCCESS, payload: res.data.data });
    dispatch(routeActions.redirect(`/blogs/${id}`));
  } catch (error) {
    dispatch({ type: types.GET_BLOG_FAILURE, payload: null });
  }
};

const createNewBlog = (
  title,
  content,
  images,
  redirectTo = "__GO_BACK__"
) => async (dispatch) => {
  dispatch({ type: types.POST_BLOG_REQUEST, payload: null });
  try {
    const res = await api.post("api/blogs", { title, content, images });
    dispatch({
      type: types.POST_BLOG_SUCCESS,
      payload: res.data.data,
    });
    dispatch(routeActions.redirect(redirectTo));
    toast.success("New blog has been created!");
  } catch (error) {
    console.log(error);
    dispatch({ type: types.POST_BLOG_FAILURE, payload: error });
  }
};

const updateBlog = (
  blogId,
  title,
  content,
  images,
  redirectTo = "__GO_BACK__"
) => async (dispatch) => {
  dispatch({ type: types.UPDATE_BLOG_REQUEST, payload: null });
  try {
    const res = await api.put(`api/blogs/${blogId}`, {
      title,
      content,
      images,
    });
    dispatch({
      type: types.UPDATE_BLOG_SUCCESS,
      payload: res.data.data,
    });
    dispatch(routeActions.redirect(redirectTo));
    toast.success("The blog has been updated!");
  } catch (error) {
    console.log(error);
    dispatch({ type: types.UPDATE_BLOG_FAILURE, payload: error });
  }
};

const deleteBlog = (blogId, redirectTo = "__GO_BACK__") => async (dispatch) => {
  dispatch({ type: types.DELETE_BLOG_REQUEST, payload: null });
  try {
    const res = await api.delete(`api/blogs/${blogId}`);
    dispatch({
      type: types.DELETE_BLOG_SUCCESS,
      payload: res.data,
    });
    dispatch(routeActions.redirect(redirectTo));
    toast.success("The blog has been deleted!");
  } catch (error) {
    console.log(error);
    dispatch({ type: types.DELETE_BLOG_FAILURE, payload: error });
  }
};

const createReview = (blogId, reviewText) => async (dispatch) => {
  dispatch({ type: types.CREATE_REVIEW_REQUEST, payload: null });
  try {
    const res = await api.post(`api/reviews/blogs/${blogId}`, {
      content: reviewText,
    });
    dispatch({
      type: types.CREATE_REVIEW_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: types.CREATE_REVIEW_FAILURE, payload: error });
  }
};

const sendEmojiReaction = (targetType, targetId, emoji) => async (dispatch) => {
  dispatch({ type: types.SEND_REACTION_REQUEST, payload: null });
  try {
    const res = await api.post(`/reactions`, { targetType, targetId, emoji });
    if (targetType === "Blog") {
      dispatch({
        type: types.BLOG_REACTION_SUCCESS,
        payload: res.data.data,
      });
    }
    if (targetType === "Review") {
      dispatch({
        type: types.REVIEW_REACTION_SUCCESS,
        payload: { reactions: res.data.data, reviewId: targetId },
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: types.SEND_REACTION_FAILURE, payload: error });
  }
};

const blogActions = {
  blogsRequest,
  getABlog,
  createNewBlog,
  deleteBlog,
  updateBlog,
  createReview,
  sendEmojiReaction,
};
export default blogActions;
