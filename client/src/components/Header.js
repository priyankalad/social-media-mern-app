import React from "react";
import { NavLink } from "react-router-dom";

export default function Header(props) {
  let {
    classDisplay,
    displayName,
    username,
    handleLogout,
    profilePicPath,
  } = props;

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      style={{ display: classDisplay }}
    >
      <div className="container-fluid">
        <div className="row w-100">
          <div className="col-12" style={{ height: "100px" }}>
            <img
              height="100"
              width="100"
              className="rounded-circle"
              src={
                profilePicPath
                  ? profilePicPath
                  : "https://social-media-mern-bucket.s3.ap-south-1.amazonaws.com/profilepics/unknown.jpeg"
              }
              alt="Social Media Application"
            />

            <button
              className={`navbar-toggler ${
                classDisplay === "none" ? "d-none" : "d-contents float-right"
              } `}
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div className="col-12 mt-3">
            <span className="h5"> {displayName}</span>
            <span className="small ml-2">{`@${username}`}</span>
          </div>
        </div>
      </div>
      <div className={`collapse navbar-collapse`} id="navbarSupportedContent">
        <ul
          className="navbar-nav"
          style={{ marginRight: "40px", flexDirection: "column" }}
        >
          <li className="nav-item "></li>
          <li className="nav-item ">
            <NavLink to="/home">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/editprofile">Profile</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/myposts">My Posts</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/mylikedposts">My Liked Posts</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/following">People I am following</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/followers">My Followers</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-NavLink" to="/createpost">
              Create Post
            </NavLink>
          </li>
          <div className="divider"></div>
          <li className="nav-item">
            <NavLink to="/login" onClick={handleLogout}>
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
