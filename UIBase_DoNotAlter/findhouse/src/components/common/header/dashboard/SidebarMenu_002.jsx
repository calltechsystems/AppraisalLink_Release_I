import Link from "next/link";
import { useRouter } from "next/router";
import {
  isParentPageActive,
  isSinglePageActive,
} from "../../../../utils/daynamicNavigation";
import Image from "next/image";
import { useEffect } from "react";

const SidebarMenu = ({ userData }) => {
  const route = useRouter();

  const myProperties = [
    { id: 1, name: "General Elements", route: "/my-properties" },
    { id: 2, name: "Advanced Elements", route: "/my-properties" },
    { id: 3, name: "Editors", route: "/my-properties" },
  ];

  const manageAccountTag = [
    {
      id: 3,
      name: "Add / Modify Subscriptions",
      route: "/appraiser-company-add-subscription",
      icon: "flaticon-telephone",
    },
    {
      id: 3,
      name: "Subscription History",
      route: "/appraiser-company-subscription-history",
      icon: "flaticon-telephone",
    },

    {
      id: 3,
      name: "Help desk",
      route: "/contact",
      icon: "flaticon-telephone",
    },
    {
      id: 3,
      name: "Contact Us",
      route: "mailto:patelshubhendra@gmail.com",
      icon: "flaticon-envelope",
    },
  ];

  const appraiserProperties = [
    {
      id: 2,
      name: "Wishlist",
      route: "/my-appraiser-properties",
      icon: "flaticon-box",
    },
    {
      id: 2,
      name: "Quote Transactions",
      route: "/biding-history",
      icon: "flaticon-box",
    },
    // { id: 3, name: "Editors", route: "/my-properties" },
  ];

  const reviews = [
    { id: 1, name: "My Reviews", route: "/my-review" },
    { id: 2, name: "Visitor Reviews", route: "/my-review" },
  ];
  const manageAccount = [
    // {
    //   id: 1,
    //   name: "Package",
    //   route: "/my-plans",
    //   icon: "flaticon-box",
    // },
    {
      id: 2,
      name: "Transactions",
      route: "/my-package",
      icon: "flaticon-box",
    },
    // { id: 3, name: "Logout", route: "/login", icon: "flaticon-logout" },
  ];

  return (
    <>
      <ul className="sidebar-menu">
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
                isSinglePageActive(
                  "/appraiser-company-dashboard",
                  route.pathname
                )
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/appraiser-company-dashboard">
                <i className="flaticon-home"></i>
                <span>Dashboard</span>
              </Link>
            </li>

            <li
              className={`treeview ${
                isSinglePageActive(
                  "/appraise-company-properties",
                  route.pathname
                )
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/appraise-company-properties">
                <i className="flaticon-home"></i>
                <span>Appraise Properties</span>
              </Link>
            </li>

            <li
              className={`treeview ${
                isSinglePageActive(
                  "/appraiser-company-allocated-properties",
                  route.pathname
                )
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/appraiser-company-allocated-properties">
                <i className="flaticon-building"></i>
                <span>Assigned Properties</span>
              </Link>
            </li>

            <li
              className={`treeview ${
                isSinglePageActive(
                  "/appraiser-company-wishlisted",
                  route.pathname
                )
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/appraiser-company-wishlisted">
                <i className="flaticon-box"></i>
                <span>Wishlist Properties</span>
              </Link>
            </li>

            <li
              className={`treeview ${
                isSinglePageActive("/company-biding-history", route.pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/company-biding-history">
                <i className="flaticon-building"></i>
                <span>Quote History</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className="title">
          <span>Manage Orders</span>
          <ul>
            <li
              className={`treeview ${
                isSinglePageActive(
                  "/appraiser-company-archive-property",
                  route.pathname
                )
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/appraiser-company-archive-property">
                <i className="flaticon-home"></i>
                <span>Archive Properties</span>
              </Link>
            </li>
            <li
              className={`treeview ${
                isSinglePageActive(
                  "/appraiser-company-accepted-properties",
                  route.pathname
                )
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/appraiser-company-accepted-properties">
                <i className="flaticon-building"></i>
                <span>Accepted Orders</span>
              </Link>
            </li>
            <li
              className={`treeview ${
                isSinglePageActive(
                  "/appraiser-company-completed-properties",
                  route.pathname
                )
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/appraiser-company-completed-properties">
                <i className="flaticon-building"></i>
                <span>Completed Orders</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className="title">
          <span>Manage Appraisers</span>
          <ul>
            <li
              className={`treeview ${
                isSinglePageActive("/all-appraisers", route.pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/all-appraisers">
                <i className="flaticon-building"></i>
                <span> Appraiser Add/View</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className="title">
          <span>Manage Account</span>
          <ul>
            {manageAccountTag.map((item) => (
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
      </ul>
    </>
  );
};

export default SidebarMenu;
