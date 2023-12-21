import Link from "next/link";
import { useRouter } from "next/router";
import {
  isParentPageActive,
  isSinglePageActive,
} from "../../../../utils/daynamicNavigation";
import Image from "next/image";

const SidebarMenu = () => {
  const route = useRouter();

  const myProperties = [
    { id: 1, name: "Manage Brokers", route: "/manage-brokers" },
    { id: 2, name: "Manage Appraisers", route: "/manage-appraisers" },
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
        <li className="sidebar_header header">
          <Link href="/">
            <Image
              width={40}
              height={45}
              src="/assets/images/logo_new.png"
              alt="header-logo2.png"
            />
            <span>Appraisal Land</span>
          </Link>
        </li>
        {/* End header */}

        <li className="title">
          <span>Main</span>
          <ul>
            <li
              className={`treeview ${
                isSinglePageActive("/appraiser-information", route.pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/appraiser-information">
                <i className="fa fa-user"></i>
                <span>Appraiser Information</span>
              </Link>
            </li>
            <li
              className={`treeview ${
                isSinglePageActive("/broker-information", route.pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/broker-information">
                <i className="fa fa-user"></i>
                <span>Broker Information</span>
              </Link>
            </li>
            {/* <li
              className={`treeview ${
                isSinglePageActive("/my-properties", route.pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/appraise-properties">
                <i className="flaticon-user"></i>
                <span>Users Information</span>
              </Link>
            </li> */}

            <li
              className={`treeview ${
                isParentPageActive(myProperties, route.pathname) ? "active" : ""
              }`}
            >
              <a data-bs-toggle="collapse" href="#my-property">
                <i className="fa fa-gear"></i> <span>User Management</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="my-property">
                {myProperties.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
                      <i className="fa fa-circle"></i> {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {/* end properties */}

            <li
              className={`treeview ${
                isSinglePageActive("/manage-plans", route.pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/manage-plans">
                <i className="fa fa-cogs"></i>
                <span> Manage Plans</span>
              </Link>
            </li>

            {/* <li
              className={`treeview ${
                isSinglePageActive("/biding-history", route.pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/biding-history">
                <i className="flaticon-pdf"></i>
                <span> Manage Free Plan</span>
              </Link>
            </li> */}
            <li
              className={`treeview ${
                isSinglePageActive("#", route.pathname) ? "active" : ""
              }`}
            >
              <Link href="#">
                <i className="fa fa-cog"></i>
                <span> Settings</span>
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

      </ul>
    </>
  );
};

export default SidebarMenu;
