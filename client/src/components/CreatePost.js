import React from "react";
import Loading from "./Loading";
import renderFields from "./renderFields";
import { Field } from "redux-form";
const { renderTextArea } = renderFields;

export default function CreatePost(props) {
  const {
    handleSubmit,
    pristine,
    invalid,
    errorMessage,
    loading,
    image,
    imageUrl,
    removeImage,
    handleImageUpload,
  } = props.props;

  return (
    <>
      <Loading isLoading={loading} />
      <div className="container">
        <div className="row">
          <div className="col">
            <h4 className="text-danger">{errorMessage}</h4>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12">
                  <Field
                    name="title"
                    placeholder="What's happening?"
                    rows="4"
                    cols="50"
                    style={{
                      border: 0,
                      outline: 0,
                      borderBottom: "1px solid #ced4da",
                    }}
                    component={renderTextArea}
                  />
                </div>
              </div>
              {image ? (
                <div className="row">
                  <div className="col-12">
                    <div
                      className="postImage"
                      style={{
                        backgroundImage: "url(" + imageUrl + ")",
                        cursor: "default",
                      }}
                    >
                      <span
                        onClick={removeImage}
                        className="close fa fa-times fa-3x"
                      ></span>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}

              <div className="row mt-2">
                <div className="col-8">
                  <label htmlFor="upload">
                    <span className="btn btn-primary">
                      <i className="fa fa-picture-o" aria-hidden="true"></i>
                    </span>
                    <input
                      type="file"
                      id="upload"
                      accept="image/*"
                      onChange={(e) => {
                        handleImageUpload(e.target.files[0]);
                        e.target.value = null;
                      }}
                      style={{ display: "none" }}
                    />
                  </label>
                </div>
                <div className="col-4 text-right">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={invalid || (pristine && !image)}
                  >
                    Post
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
