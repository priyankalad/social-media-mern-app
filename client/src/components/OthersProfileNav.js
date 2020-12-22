import React from "react";
import { Link } from "react-router-dom";

export default function OthersProfileNav(props) {
  let { activeTab, handleTabSelect, userid } = props;
  return (
    <nav className="nav nav-pills nav-fill">
      <Link
        className={`nav-item nav-link ${activeTab === 0 ? "active" : ""}`}
        onClick={() => handleTabSelect(0)}
        to={`/profile/${userid}`}
      >
        Posts
      </Link>
      <Link
        className={`nav-item nav-link ${activeTab === 1 ? "active" : ""}`}
        onClick={() => handleTabSelect(1)}
        to={`/profile/${userid}/followers`}
      >
        Followers
      </Link>
      <Link
        className={`nav-item nav-link ${activeTab === 2 ? "active" : ""}`}
        onClick={() => handleTabSelect(2)}
        to={`/profile/${userid}/following`}
      >
        Following
      </Link>
    </nav>
  );
}
