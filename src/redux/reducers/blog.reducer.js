import * as types from "../constants/blog.constants";
const initialState = {
  blogs: [],
  totalPageNum: 1,
  selectedBlog: null,
  loading: false,
};

const blogReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    // GET ALL BLOGS
    case types.GET_BLOGS_REQUEST:
      return { ...state, loading: true };
    case types.GET_BLOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: payload.blogs,
        totalPageNum: payload.totalPages,
      };
    case types.GET_BLOGS_FAILURE:
      return { ...state, loading: false };

    // GET SINGLE BLOG
    case types.GET_BLOG_REQUEST:
      return { ...state, loading: true };
    case types.GET_BLOG_SUCCESS:
      return { ...state, loading: false, selectedBlog: payload };
    case types.GET_BLOG_FAILURE:
      return { ...state, loading: false };

    // POST BLOG
    case types.POST_BLOG_REQUEST:
      return { ...state, loading: true };
    case types.POST_BLOG_SUCCESS:
      return { ...state, loading: false };
    case types.POST_BLOG_FAILURE:
      return { ...state, loading: false };

    // UPDATE AND DELETE BLOG
    case types.UPDATE_BLOG_REQUEST:
    case types.DELETE_BLOG_REQUEST:
      return { ...state, loading: true };

    case types.UPDATE_BLOG_SUCCESS:
      return {
        ...state,
        selectedBlog: payload,
        loading: false,
      };
    case types.DELETE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedBlog: {},
      };
    case types.UPDATE_BLOG_FAILURE:
    case types.DELETE_BLOG_FAILURE:
      return { ...state, loading: false };

    // CREATE A REVIEW
    case types.CREATE_REVIEW_REQUEST:
      return { ...state, submitLoading: true };
    case types.CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        selectedBlog: {
          ...state.selectedBlog,
          reviews: [...state.selectedBlog.reviews, payload],
        },
        submitLoading: false,
      };
    case types.CREATE_REVIEW_FAILURE:
      return { ...state, submitLoading: false };

    // ADD REACTION FOR REVIEW OR BLOG
    case types.SEND_REACTION_REQUEST:
      return { ...state, submitLoading: true };

    case types.BLOG_REACTION_SUCCESS:
      return {
        ...state,
        selectedBlog: { ...state.selectedBlog, reactions: payload },
        submitLoading: false,
      };
    case types.REVIEW_REACTION_SUCCESS:
      return {
        ...state,
        selectedBlog: {
          ...state.selectedBlog,
          reviews: [
            ...state.selectedBlog.reviews.map((review) => {
              if (review._id !== payload.reviewId) return review;
              return { ...review, reactions: payload.reactions };
            }),
          ],
        },
        submitLoading: false,
      };

    case types.SEND_REACTION_FAILURE:
      return { ...state, submitLoading: false };
    default:
      return state;
  }
};

export default blogReducer;
