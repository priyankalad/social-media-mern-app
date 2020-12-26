import React, { useEffect } from "react";
import { reduxForm, SubmissionError } from "redux-form";
import { useDispatch, connect } from "react-redux";
import allActions from "../redux/allActions";
import Loading from "../components/Loading";

import "../index.css";
import validateForm from "../formValidations/validations";
import EditProfile from "../components/EditProfile";
import ViewProfile from "../components/ViewProfile";
import ProfileHeader from "../components/ProfileHeader";

const validate = (values) => {
  return validateForm(values, "editprofile");
};
function EditProfileCon(props) {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    reset,
    token,
    loading,
    errorMessage,
    viewMode,
    deleteSuccess,
  } = props;
  if (deleteSuccess) {
    dispatch(allActions.userProfileActions.logout());
    props.history.push("/login");
  }
  let changeViewModeHandler = (viewMode) =>
    dispatch(allActions.userProfileActions.changeViewMode(viewMode));
  let fileChangeHandler = (event) => {
    let selectedFile = event.target.files[0];
    dispatch(allActions.userProfileActions.uploadImage(selectedFile));
  };
  let deleteProfileHandler = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure, you want to delete the profile?")) {
      dispatch(
        allActions.userProfileActions.deleteProfile("/user/delete", token)
      );
    } else return false;
  };
  let genderOptions = {
    male: { label: "Male", selected: false },
    female: { label: "Female", selected: false },
    other: { label: "Other", selected: false },
  };

  const image_style = {
    width: "130px",
    height: "130px",
    borderRadius: "50%",
  };
  let editForm = (
    <EditProfile
      reset={reset}
      errorMessage={errorMessage}
      handleSubmit={handleSubmit}
      changeViewModeHandler={changeViewModeHandler}
      fileChangeHandler={fileChangeHandler}
      imageStyle={image_style}
      deleteProfileHandler={deleteProfileHandler}
      user={props.initialValues}
      updatedImageFileURL={props.updatedImageFileURL}
      genderOptions={genderOptions}
    />
  );
  let viewForm = (
    <ViewProfile
      user={props.initialValues}
      imageStyle={image_style}
      genderOptions={genderOptions}
    />
  );

  useEffect(() => {
    dispatch(
      allActions.userProfileActions.getUserProfile("/user/profile", token)
    );
    return () => {
      changeViewModeHandler("view");
    };
  }, [dispatch, token]);
  return loading ? (
    <Loading isLoading={loading} />
  ) : (
    <>
      <ProfileHeader
        viewMode={viewMode}
        changeViewModeHandler={changeViewModeHandler}
      />
      {viewMode === "edit" ? editForm : viewForm}
    </>
  );
}

const onSubmit = (values, dispatch, props) => {
  let { token, updatedImageFile } = props;
  if (updatedImageFile) values.profilePic = updatedImageFile;
  return dispatch(
    allActions.userProfileActions.editUserProfile(
      "/user/profile",
      values,
      token
    )
  ).then((res) => {
    if (res.error) {
      let { errors } = res.error.response.data;
      if (errors) {
        throw new SubmissionError(errors);
      }
    }
  });
};

const mapStateToProps = (state, props) => {
  let {
    user,
    updatedImageFile,
    updatedImageFileURL,
    errorMessage,
    loading,
    viewMode,
    successMessage: deleteSuccess,
  } = state.userProfile;

  return {
    initialValues: user,
    updatedImageFile: updatedImageFile,
    updatedImageFileURL: updatedImageFileURL,
    token: state.userProfile.token,
    errorMessage: errorMessage,
    loading: loading,
    viewMode: viewMode,
    deleteSuccess: deleteSuccess,
    deleteError: errorMessage,
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: "editProfile",
    enableReinitialize: true,
    onSubmit,
    validate,
  })(EditProfileCon)
);
