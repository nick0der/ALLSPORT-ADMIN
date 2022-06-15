import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Sidebar() {

  const location = useLocation().pathname.split('/').pop();
  const user = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(location);
    if (!user) {
      navigate("/login")
    }

  }, [location]);



  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className={"sidebarListItem" + (location === "" ? " active" : "")}>
              <LineStyle className="sidebarIcon" />
              Головна
            </li>
            </Link>
            <Link to="/sales" className="link">
            <li className={"sidebarListItem" + (location === "sales" ? " active" : "")}>
              <TrendingUp className="sidebarIcon" />
              Продажі
            </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            {/*
              <Link to="/users" className="link">
                <li className={"sidebarListItem" + (location === "users" ? " active" : "")}>
                  <PermIdentity className="sidebarIcon" />
                  Users
                </li>
              </Link>
            */}
            <Link to="/products" className="link">
              <li className={"sidebarListItem" + (location === "products" ? " active" : "")}>
                <Storefront className="sidebarIcon" />
                Товари
              </li>
            </Link>
            <Link to="/orders" className="link">
              <li className={"sidebarListItem" + (location === "orders" ? " active" : "")}>
                <AttachMoney className="sidebarIcon" />
                Замовлення
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Повідомлення
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Зворотній зв'язок
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
