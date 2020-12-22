import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  SET_IMAGE,
  REMOVE_IMAGE,
  ALL_POSTS_SUCCESS,
  ALL_POSTS_REQUEST,
  LIKE_POST_SUCCESS,
  ALL_POSTS_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILURE
} from "./postActionTypes";

const initialState = {
  loading: false,
  smallLoading: false,
  successMessage: "",
  errorMessage: "",
  image: null,
  imageUrl: "",
  posts: [],
  likedCount: 0,
  postId: ""
};

const postReducer = (state = initialState, action) => {
  let { type, payload, error } = action;
  switch (type) {
    case CREATE_POST_REQUEST:
    case ALL_POSTS_REQUEST:
    case CREATE_COMMENT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        image: null,
        imageURL: ""
      };
    case SET_IMAGE:
      let imageURL = URL.createObjectURL(payload);
      return {
        ...state,
        image: payload,
        imageUrl: imageURL
      };
    case REMOVE_IMAGE:
      return {
        ...state,
        image: null,
        imageUrl: ""
      };
    case ALL_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: payload.data.posts
      };
    case ALL_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: error.response.data.error
      };
    case LIKE_POST_SUCCESS:
      let { post, likedPost } = payload.data;
      return {
        ...state,
        //  smallLoading: false,
        posts: updatedPostsAfterToggle([...state.posts], post),
        likedCount: likedPost,
        postId: ""
      };
    case LIKE_POST_FAILURE:
      return {
        ...state,
        likedSuccess: "",
        smallLoading: false,
        errorMessage: error.data,
        postId: ""
      };
    case DELETE_POST_REQUEST:
    case LIKE_POST_REQUEST:
      return {
        ...state,
        smallLoading: true,
        postId: payload.request.data.postId
      };
    case DELETE_POST_SUCCESS:
      let { deletedPostId } = payload.data;
      return {
        ...state,
        smallLoading: false,
        posts: [...state.posts].filter(p => p._id !== deletedPostId),
        postId: ""
      };
    case DELETE_POST_FAILURE:
      return {
        ...state,
        smallLoading: false,
        errorMessage: error.response.data.message,
        postId: ""
      };
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: updatePostsAfterComment([...state.posts], payload.data.post)
      };
    case CREATE_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: error.response.data.message
      };
    default:
      return state;
  }
};

let updatePostsAfterComment = (posts, post) => {
  let postIndex = posts.findIndex(p => p._id === post._id);
  posts[postIndex] = post;
  return posts;
};

let updatedPostsAfterToggle = (posts, post) => {
  posts.some(p => {
    if (p._id === post._id) {
      p.liked = post.liked;
      p.likedByUsers = post.likedByUsers;
      return true;
    }
    return false;
  });
  return posts;
};

export default postReducer;
