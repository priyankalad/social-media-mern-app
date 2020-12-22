import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  SET_IMAGE,
  REMOVE_IMAGE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  CLEAR,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  ALL_POSTS_REQUEST,
  ALL_POSTS_SUCCESS,
  ALL_POSTS_FAILURE,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILURE
} from "./postActionTypes";

const setImage = image => {
  return {
    type: SET_IMAGE,
    payload: image
  };
};
const removeImage = () => {
  return {
    type: REMOVE_IMAGE
  };
};
const createNewPost = (url, data, token) => {
  const formData = getFormData(data);
  return {
    types: [CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAILURE],
    payload: {
      client: "default",
      request: {
        url: url,
        method: "post",
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      }
    }
  };
};

const deletePost = (url, postId, token) => {
  return {
    types: [DELETE_POST_REQUEST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE],
    payload: {
      client: "default",
      request: {
        url: url,
        data: { postId: postId },
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    }
  };
};

const clearState = () => {
  return {
    type: CLEAR
  };
};

const toggleLikePost = (url, postId, token) => {
  return {
    types: [LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LIKE_POST_FAILURE],
    payload: {
      client: "default",
      request: {
        url: url,
        method: "put",
        data: { postId },
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    }
  };
};

const getAllPosts = (url, token) => {
  return {
    types: [ALL_POSTS_REQUEST, ALL_POSTS_SUCCESS, ALL_POSTS_FAILURE],
    payload: {
      client: "default",
      request: {
        url: url,
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    }
  };
};

const createComment = (url, token, postId, comment) => {
  return {
    types: [
      CREATE_COMMENT_REQUEST,
      CREATE_COMMENT_SUCCESS,
      CREATE_COMMENT_FAILURE
    ],
    payload: {
      client: "default",
      request: {
        url: url,
        method: "post",
        data: {
          postId: postId,
          comment: comment
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    }
  };
};

function getFormData(object) {
  let formData = new FormData();
  for (var key in object) {
    formData.append(key, object[key]);
  }
  return formData;
}
export default {
  createNewPost,
  deletePost,
  clearState,
  toggleLikePost,
  getAllPosts,
  setImage,
  removeImage,
  createComment
};
