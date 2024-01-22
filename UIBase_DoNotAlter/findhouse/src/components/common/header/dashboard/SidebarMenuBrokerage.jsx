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
      route: "/brokerage-add-subscription",
      icon: "flaticon-telephone",
    },
    {
      id: 3,
      name: "Subscription History",
      route: "/brokerage-subscription-history",
      icon: "flaticon-telephone",
    },

    { id: 3, name: "Help desk", route: "/contact", icon: "flaticon-telephone" },
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
          style={{ backgroundColor: "white", padding: "30px" }}
        >
          <Link href="/">
            <Image
              width={40}
              height={45}
              src="/assets/images/logo.png"
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
          <span>Main</span>
          <ul>
            <li
              className={`treeview ${
                isSinglePageActive(
                  "/brokerage-dashboard",
                  route.pathname
                )
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/brokerage-dashboard">
                <i className="flaticon-home"></i>
                <span>Dashboard</span>
              </Link>
            </li>

            <li
              className={`treeview ${
                isSinglePageActive(
                  "/brokerage-properties",
                  route.pathname
                )
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/brokerage-properties">
                <i className="flaticon-home"></i>
                <span>My Properties</span>
              </Link>
            </li>

           <li
              className={`treeview ${
                isSinglePageActive(
                  "/create-listing-1",
                  route.pathname
                )
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/create-listing-1">
                <i className="flaticon-plus"></i>
                <span>Add New Property</span>
              </Link>
            </li>

            <li
              className={`treeview ${
                isSinglePageActive("/brokerage-biding-history", route.pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/brokerage-biding-history">
                <i className="flaticon-building"></i>
                <span>Order History</span>
              </Link>
            </li>

            <li
              className={`treeview ${
                isSinglePageActive(
                  "/brokerage-archive-properties",
                  route.pathname
                )
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/brokerage-archive-properties">
                <i className="flaticon-home"></i>
                <span>Archive Properties</span>
              </Link>
            </li>

            {/* <li
              className={`treeview ${
                isSinglePageActive(
                  "/brokerage-allocated-properties",
                  route.pathname
                )
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/brokerage-allocated-properties">
                <i className="flaticon-building"></i>
                <span>Assigned Properties</span>
              </Link>
            </li> */}

            {/* End Review */}

            {/*<li
              className={`treeview ${
                isSinglePageActive("/appraiser-wishlist", route.pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/appraiser-wishlist">
                <i className="flaticon-heart"></i>
                <span> Wishlist</span>
              </Link>
            </li>*/}

            {/* <li
              className={`treeview ${
                isSinglePageActive("/biding-history", route.pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/biding-history">
                <i className="flaticon-pdf"></i>
                <span> Biding History</span>
              </Link>
            </li>*/}
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
          <span >Manage Appraise Properties</span>
          <ul>
            <li
              className={`treeview ${
                isParentPageActive(myProperties, route.pathname) ? "active" : ""
              }`}
            >
              <a data-bs-toggle="collapse" href="#my-property">
                <i className="flaticon-home"></i> <span>My Properties</span>
                </a>
            </li>*/}
        {/* <i className="fa fa-angle-down pull-right"></i>*/}

        {/*<ul className="treeview-menu collapse" id="my-property">
                {myProperties.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
                      <i className="fa fa-circle"></i> {item.name}
                    </Link>
                  </li>
                ))}
                </ul>*/}

        {/* end properties */}

        {/* <li
              className={`treeview ${
                isParentPageActive(reviews, route.pathname) ? "active" : ""
              }`}
            >
              <a data-bs-toggle="collapse" href="#review">
                <i className="flaticon-chat"></i>
                <span>Reviews</span>
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

        {/* <li
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
            </li> */}
        {/*</ul>
          </li>*/}
        {/* End manage listing */}

        {/* <li className="title">
          <span>Manage Properties</span>
          <ul>
            {appraiserProperties.map((item) => (
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
        </li> */}

        <li className="title">
          <span>Manage Orders</span>
          <ul>
            <li
              className={`treeview ${
                isSinglePageActive(
                  "/brokerage-completed-properties",
                  route.pathname
                )
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/brokerage-completed-properties">
                <i className="flaticon-building"></i>
                <span>Accepted Orders</span>
              </Link>
            </li>
            <li
              className={`treeview ${
                isSinglePageActive(
                  "/brokerage-completed-properties",
                  route.pathname
                )
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/brokerage-completed-properties">
                <i className="flaticon-building"></i>
                <span>Completed Orders</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className="title">
          <span>Manage Brokers</span>
          <ul>
            <li
              className={`treeview ${
                isSinglePageActive("/all-brokers", route.pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/all-brokers">
                <i className="flaticon-building"></i>
                <span> Broker Add/View</span>
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
