import React from "react";
import { Field } from "redux-form";
import renderFields from "./renderFields";

export default function EditProfile(props) {
  const { renderInput, renderRadioInput, renderSelect } = renderFields;
  let {
    handleSubmit,
    errorMessage,
    changeViewModeHandler,
    fileChangeHandler,
    imageStyle,
    deleteProfileHandler,
    user,
    updatedImageFileURL,
    genderOptions,
  } = props;

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3 className="text-danger">{errorMessage}</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <div className="image-upload">
              <label htmlFor="profilePic">
                <img
                  alt="Profile Pic"
                  style={imageStyle}
                  src={
                    updatedImageFileURL
                      ? updatedImageFileURL
                      : user.profilePicPath
                      ? user.profilePicPath
                      : "https://social-media-mern-bucket.s3.ap-south-1.amazonaws.com/profilepics/unknown.jpeg"
                  }
                />
              </label>
              <input
                id="profilePic"
                name="profilePic"
                onChange={(e) => {
                  fileChangeHandler(e);
                }}
                type="file"
              />
            </div>
            <Field
              name="displayName"
              extraCssClass=" w-25 mx-auto"
              label="Display Name"
              component={renderInput}
              type="text"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <Field
              name="username"
              component={renderInput}
              label="Username"
              type="text"
            />

            <Field
              name="age"
              label="Age"
              component={renderInput}
              type="number"
            />
          </div>
          <div className="col-6">
            <Field
              name="location"
              label="Location"
              component={renderInput}
              type="text"
            />
            <Field
              component={renderRadioInput}
              label="Gender"
              name="gender"
              options={genderOptions}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <button type="submit" className="btn btn-success">
              Update
            </button>

            <button
              type="button"
              onClick={() => changeViewModeHandler("view")}
              className="m-1 btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <button
              className="btn btn-outline-danger"
              onClick={deleteProfileHandler}
            >
              Delete Profile
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
