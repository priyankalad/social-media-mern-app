import React, { useEffect } from "react";
import { reduxForm } from "redux-form";
import { connect, useDispatch } from "react-redux";
import allActions from "../redux/allActions";
import CreatePost from "../components/CreatePost";
import validateForm from "../formValidations/validations";

const validate = (values) => {
  return validateForm(values, "createpost");
};

let CreatePostCon = (props) => {
  return <CreatePost props={props} />;
};

const onSubmit = (values, dispatch, props) => {
  values.postImage = props.image;
  dispatch(
    allActions.postActions.createNewPost(
      "/user/post/create",
      values,
      props.token
    )
  ).then((res) => {
    if (!res.error) props.history.push("/");
  });
};

const mapStateToProps = (state, props) => {
  let { errorMessage, loading, image, imageUrl } = state.post;
  return {
    errorMessage: errorMessage,
    loading: loading,
    token: state.userProfile.token,
    image: image,
    imageUrl: imageUrl,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleImageUpload: (image) => {
      console.log(image);
      dispatch(allActions.postActions.setImage(image));
    },
    removeImage: () => {
      dispatch(allActions.postActions.removeImage());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "createPostForm",
    onSubmit,
    validate,
  })(CreatePostCon)
);
