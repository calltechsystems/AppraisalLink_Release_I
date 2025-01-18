import Link from "next/link";
import { useRouter } from "next/router";
import {
  isParentPageActive,
  isSinglePageActive,
} from "../../../../utils/daynamicNavigation";
import Image from "next/image";
import { useEffect, useState } from "react";

const SidebarMenu = () => {
  const route = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  let userData = {};
  const [isBrokerByBrokerage, setIsBrokerByBrokerage] = useState(false);
  useEffect(() => {
    userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.broker_Details?.brokerageid !== null) {
      setIsBrokerByBrokerage(true);
    }
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const myProperties = [
    { id: 1, name: "General Elements", route: "/my-properties" },
    { id: 2, name: "Advanced Elements", route: "/my-properties" },
    { id: 3, name: "Editors", route: "/my-properties" },
  ];
  const reviews = [
    // { id: 1, name: "Form-1", route: "assets/images/image_02.png", target:"_blank" },
    // { id: 2, name: "Form-2", route: "assets/images/image_03.png" },
    // { id: 3, name: "Form-3", route: "assets/images/image_04.png" },
    { id: 4, name: "Form-4", route: "assets/images/image_05.png" },
  ];
  const manageAccount = [
    {
      id: 1,
      name: "Add / Modify Subscriptions",
      route: "/my-plans",
      icon: "flaticon-box",
    },
    // {
    //   id: 2,
    //   name: "Top-up Plans",
    //   route: "/top-up",
    //   icon: "flaticon-box",
    // },
    {
      id: 3,
      name: "Subscription History",
      route: "/my-package",
      icon: "flaticon-box",
    },
    { id: 4, name: "Help desk", route: "/contact", icon: "flaticon-telephone" },
    {
      id: 3,
      name: "Contact Us",
      route: "mailto:patelshubhendra@gmail.com",
      icon: "flaticon-envelope",
    },
  ];

  const handleOpenHelpDesk = () => {
    // Open the link with a query parameter to ignore the session
    const newTab = window.open(
      "/contact?logout=true",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      {/* <button className="collapse-btn flaticon-home" onClick={toggleCollapse}>
        {isCollapsed ? "Expand" : "Collapse"}
      </button> */}
      <ul className={`sidebar-menu ${isCollapsed ? "collapsed" : ""}`}>
        <li
          className="sidebar_header header"
          style={{ backgroundColor: "white" }}
        >
          <Link href="/">
            <Image
              width={60}
              height={45}
              className="logo1 img-fluid"
              src="/assets/images/Appraisal_Land_Logo.png"
              alt="header-logo2.png"
            />
            <span
              style={{
                color: "#2e008b",
                marginTop: "35px",
                marginLeft: "-10px",
              }}
            >
              Appraisal{" "}
            </span>
            &nbsp;
            <span
              style={{
                color: "#97d700",
                marginTop: "35px",
                paddingLeft: "5px",
              }}
            >
              {" "}
              Land
            </span>
          </Link>
        </li>
        {/* End header */}

        <li className="title">
          <ul>
            <li
              className={`treeview ${
                isSinglePageActive("/my-dashboard", route.pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/my-dashboard">
                <i className="flaticon-layers"></i>
                <span> Dashboard</span>
              </Link>
            </li>
            <li
              className={`treeview ${
                isSinglePageActive("/my-properties", route.pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/my-properties">
                <i className="flaticon-home"></i>
                <span>My Properties</span>
              </Link>
            </li>
            <li
              className={`treeview ${
                isSinglePageActive("/create-listing", route.pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/create-listing">
                <i className="flaticon-plus"></i>
                <span> Add New Property</span>
              </Link>
            </li>

            <li
              className={`treeview ${
                isSinglePageActive("/archive-property", route.pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/archive-property">
                <i className="flaticon-home"></i>
                <span>Archived Properties</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className="title">
          <span>Manage Account</span>
          {isBrokerByBrokerage ? (
            ""
          ) : (
            <ul>
              {manageAccount.map((item) => (
                <li
                  className={
                    isSinglePageActive(item.route, route.pathname)
                      ? "active"
                      : ""
                  }
                  key={item.id}
                >
                  <Link href={item.route}>
                    <i className={item.icon}></i> <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
        {!isBrokerByBrokerage ? (
          ""
        ) : (
          // <li className="link-hover sidebar-menu">
          //   <Link href="/contact">
          //     <i className="flaticon-envelope"></i>
          //     <span>Help Desk</span>
          //   </Link>
          // </li>
          <li className="link-hover sidebar-menu">
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                handleOpenHelpDesk(); // Handle manual opening
              }}
            >
              <i className="flaticon-envelope"></i>
              <span>Help Desk</span>
            </Link>
          </li>
        )}
        {!isBrokerByBrokerage ? (
          ""
        ) : (
          <li className="link-hover sidebar-menu">
            <Link href="mailto:patelshubhendra@gmail.com">
              <i className="flaticon-envelope"></i>
              <span>Contact Us</span>
            </Link>
          </li>
        )}
      </ul>
    </>
  );
};

export default SidebarMenu;
