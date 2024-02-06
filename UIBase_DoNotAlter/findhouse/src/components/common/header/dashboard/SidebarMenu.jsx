import Link from "next/link";
import { useRouter } from "next/router";
import {
  isParentPageActive,
  isSinglePageActive,
} from "../../../../utils/daynamicNavigation";
import Image from "next/image";
import { useState } from "react";

const SidebarMenu = () => {
  const route = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

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
    {
      id: 2,
      name: "Subscription History",
      route: "/my-package",
      icon: "flaticon-box",
    },
    { id: 3, name: "Help desk", route: "/contact", icon: "flaticon-telephone" },
  ];

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
              width={40}
              height={45}
              src="/assets/images/Appraisal_Land_Logo.png"
              alt="header-logo2.png"
            />
            <span style={{ color: "#2e008b", marginTop: "20px" }}>
              Appraisal{" "}
            </span>
            &nbsp;
            <span style={{ color: "#97d700", marginTop: "20px" }}> Land</span>
          </Link>
        </li>
        {/* End header */}

        <li className="title">
          <span>Property Information</span>
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

            {/* <li
              className={`treeview ${
                isSinglePageActive("/create-listing-01", route.pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/create-listing-01">
                <i className="flaticon-plus"></i>
                <span> Add New Property - 1</span>
              </Link>
            </li> */}

            {/* <li
              className={`treeview ${
                isParentPageActive(reviews, route.pathname) ? "active" : ""
              }`}
            >
              <a data-bs-toggle="collapse" href="#review">
                <i className="flaticon-chat"></i>
                <span>Form Format</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="review">
                {reviews.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
                      <i className="fa fa-circle"></i> {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li> */}
            {/* End Review */}

            <li
              className={`treeview ${
                isSinglePageActive("/archive-property", route.pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/archive-property">
                <i className="flaticon-home"></i>
                <span>Achieved Properties</span>
              </Link>
            </li>
            {/* <li
              className={`treeview ${
                    isParentPageActive("/my-properties", route.pathname) ? "active" : ""
                  }`}
                >
                <Link href="/my-properties">
                <i className="flaticon-home"></i>
                <span>Properties</span>
              </Link>
                </li>*/}
          </ul>
        </li>

        {/*<li
              className={`treeview ${
                isSinglePageActive("/my-message", route.pathname)
                  ? "active"
                  : ""
              }`}
            >
               <Link href="/my-message">
                <i className="flaticon-envelope"></i>
                <span> Message</span>
              </Link> 
            </li>*/}

        {/* End Main */}

        {/* <li className="title">
          <span>Manage Appraise Properties</span>
          <ul>
            <li
              className={`treeview ${
                isParentPageActive(myProperties, route.pathname) ? "active" : ""
              }`}
            >
              <a data-bs-toggle="collapse" href="#my-property">
                <i className="flaticon-home"></i> <span>My Properties</span>
              </a>
            </li>
            <i className="fa fa-angle-down pull-right"></i>

            <ul className="treeview-menu collapse" id="my-property">
              {myProperties.map((item) => (
                <li key={item.id}>
                  <Link href={item.route}>
                    <i className="fa fa-circle"></i> {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <li
              className={`treeview ${
                isSinglePageActive("/my-favourites", route.pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/my-favourites">
                <i className="flaticon-magnifying-glass"></i>
                <span> My Favorites</span>
              </Link>
            </li>
            <li
              className={`treeview ${
                isSinglePageActive("/my-saved-search", route.pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/my-saved-search">
                <i className="flaticon-magnifying-glass"></i>
                <span> Saved Search</span>
              </Link>
            </li>
          </ul>
        </li> */}
        {/* End manage listing */}

        <li className="title">
          <span>Manage Account</span>
          <ul>
            {manageAccount.map((item) => (
              <li
                className={
                  isSinglePageActive(item.route, route.pathname) ? "active" : ""
                }
                key={item.id}
              >
                <Link href={item.route}>
                  <i className={item.icon}></i> <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </li>
        <li className="link-hover sidebar-menu">
          <Link href="mailto:patelshubhendra@gmail.com">
            <i className="flaticon-envelope"></i>
            <span>Contact Us</span>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default SidebarMenu;
