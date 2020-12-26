import React from "react";

export default function ViewProfile(props) {
  let {
    displayName = "",
    username = "",
    gender = "",
    age = "",
    location = "",
    profilePicPath = "",
  } = props.user;
  let { genderOptions } = props;
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <div className="align-items-center mt-2">
            <img
              style={props.imageStyle}
              alt="Profile pic"
              src={
                profilePicPath
                  ? profilePicPath
                  : "https://social-media-mern-bucket.s3.ap-south-1.amazonaws.com/profilepics/unknown.jpeg"
              }
            />

            <h2 className="ml-2">{displayName}</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <div>
            <label>Username</label>
            <label className="form-control">{username}</label>
          </div>

          <div className="form-group">
            <label>Age</label>
            <label className="form-control">{age}</label>
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <label>Location</label>
            <label className="form-control">{location}</label>
          </div>
          <div className="form-group">
            <label>Gender</label>
            <label className="form-control">
              {gender && genderOptions[gender].label}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
