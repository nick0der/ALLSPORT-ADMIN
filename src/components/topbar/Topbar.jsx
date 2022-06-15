import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">ALLSPORT admin</span>
        </div>
        <div className="topRight">
          <Link to="/orders">
            <div className="topbarIconContainer">
              <NotificationsNone />
              <span className="topIconBadge">2</span>
            </div>
          </Link>
          <Link to="/">
            <img src="https://icon-library.com/images/admin-icon/admin-icon-12.jpg" alt="" className="topAvatar" />
          </Link>
        </div>
      </div>
    </div>
  );
}
