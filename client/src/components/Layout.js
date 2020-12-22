import React, { useState } from "react";

import UnfollowingUsersCon from "../containers/UnfollowingUsersCon";
import HeaderCon from "../containers/HeaderCon";

export default function Layout(props) {
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-lg-3 mb-3">
          <HeaderCon />
        </div>

        <div className="col-lg-6">{props.children}</div>
        <div className="d-none d-md-block col-lg-3">
          <UnfollowingUsersCon />
        </div>
      </div>
    </div>
  );
}
