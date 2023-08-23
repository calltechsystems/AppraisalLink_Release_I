"use strict";
exports.id = 4335;
exports.ids = [4335];
exports.modules = {

/***/ 9475:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ dashboard_Header)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./src/utils/daynamicNavigation.js
var daynamicNavigation = __webpack_require__(3812);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
;// CONCATENATED MODULE: ./src/components/common/header/dashboard/MyAccount.jsx





const MyAccount = ()=>{
    const profileMenuItems = [
        {
            id: 1,
            name: "My Profile",
            ruterPath: "/my-profile"
        },
        {
            id: 2,
            name: " My Message",
            ruterPath: "/my-message"
        },
        {
            id: 3,
            name: " My Favourite",
            ruterPath: "/my-favourites"
        },
        {
            id: 4,
            name: " My Package",
            ruterPath: "/my-package"
        },
        {
            id: 5,
            name: " Log out",
            ruterPath: "/login"
        }
    ];
    const route = (0,router_.useRouter)();
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "user_set_header",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                        width: 40,
                        height: 40,
                        className: "float-start",
                        src: "/assets/images/team/e1.png",
                        alt: "e1.png"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                        children: [
                            "Ali Tufan ",
                            /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "address",
                                children: "alitufan@gmail.com"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "user_setting_content",
                children: profileMenuItems.map((item)=>/*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                        href: item.ruterPath,
                        className: "dropdown-item",
                        style: (0,daynamicNavigation/* isSinglePageActive */.J)(`${item.ruterPath}`, route.pathname) ? {
                            color: "#ff5a5f"
                        } : undefined,
                        children: item.name
                    }, item.id))
            })
        ]
    });
};
/* harmony default export */ const dashboard_MyAccount = (MyAccount);

;// CONCATENATED MODULE: ./src/components/common/header/dashboard/HeaderMenuContent.jsx





const HeaderMenuContent = ({ float =""  })=>{
    const route = (0,router_.useRouter)();
    const home = [
        {
            id: 1,
            name: "Home 1",
            routerPath: "/"
        },
        {
            id: 2,
            name: "Home 2",
            routerPath: "/home-2"
        },
        {
            id: 3,
            name: "Home 3",
            routerPath: "/home-3"
        },
        {
            id: 4,
            name: "Home 4",
            routerPath: "/home-4"
        },
        {
            id: 5,
            name: "Home 5",
            routerPath: "/home-5"
        },
        {
            id: 6,
            name: "Home 6",
            routerPath: "/home-6"
        },
        {
            id: 7,
            name: "Home 7",
            routerPath: "/home-7"
        },
        {
            id: 8,
            name: "Home 8",
            routerPath: "/home-8"
        },
        {
            id: 9,
            name: "Home 9",
            routerPath: "/home-9"
        },
        {
            id: 10,
            name: "Home 10",
            routerPath: "/home-10"
        }
    ];
    const listing = [
        {
            id: 1,
            title: "Listing Grid",
            items: [
                {
                    name: "Grid v1",
                    routerPath: "/listing-grid-v1"
                },
                {
                    name: "Grid v2",
                    routerPath: "/listing-grid-v2"
                },
                {
                    name: "Grid v3",
                    routerPath: "/listing-grid-v3"
                },
                {
                    name: "Grid v4",
                    routerPath: "/listing-grid-v4"
                },
                {
                    name: "Grid v5",
                    routerPath: "/listing-grid-v5"
                },
                {
                    name: "Grid v6",
                    routerPath: "/listing-grid-v6"
                }
            ]
        },
        {
            id: 2,
            title: "Listing List",
            items: [
                {
                    name: "List V1",
                    routerPath: "/listing-list-v1"
                }
            ]
        },
        {
            id: 3,
            title: "Listing Style",
            items: [
                {
                    name: "Parallax Style",
                    routerPath: "/parallax-style"
                },
                {
                    name: "Slider Style",
                    routerPath: "/slider-style"
                },
                {
                    name: "Map Header",
                    routerPath: "/map-header"
                }
            ]
        },
        {
            id: 4,
            title: "Listing Half",
            items: [
                {
                    name: "Map V1",
                    routerPath: "/listing-map-v1"
                },
                {
                    name: "Map V2",
                    routerPath: "/listing-map-v2"
                },
                {
                    name: "Map V3",
                    routerPath: "/listing-map-v3"
                },
                {
                    name: "Map V4",
                    routerPath: "/listing-map-v4"
                }
            ]
        },
        {
            id: 5,
            title: "Agent View",
            items: [
                {
                    name: "Agent V1",
                    routerPath: "/agent-v1"
                },
                {
                    name: "Agent V2",
                    routerPath: "/agent-v2"
                },
                {
                    name: "Agent Details",
                    routerPath: "/agent-details"
                }
            ]
        },
        {
            id: 6,
            title: "Agencies View",
            items: [
                {
                    name: "Agencies V1",
                    routerPath: "/agency-v1"
                },
                {
                    name: "Agencies V2",
                    routerPath: "/agency-v2"
                },
                {
                    name: "Agencies Details",
                    routerPath: "/agency-details"
                }
            ]
        }
    ];
    const property = [
        {
            id: 1,
            title: "User Admin",
            items: [
                {
                    name: "Dashboard",
                    routerPath: "/my-dashboard"
                },
                {
                    name: "My Properties",
                    routerPath: "/my-properties"
                },
                {
                    name: "My Message",
                    routerPath: "/my-message"
                },
                {
                    name: "My Review",
                    routerPath: "/my-review"
                },
                {
                    name: "My Favourites",
                    routerPath: "/my-favourites"
                },
                {
                    name: "My Profile",
                    routerPath: "/my-profile"
                },
                {
                    name: "My Package",
                    routerPath: "/my-package"
                },
                {
                    name: "My Saved Search",
                    routerPath: "/my-saved-search"
                },
                {
                    name: "Add Property",
                    routerPath: "/create-listing"
                }
            ]
        },
        {
            id: 2,
            title: "Listing Single",
            items: [
                {
                    name: "Single V1",
                    routerPath: "/listing-details-v1"
                },
                {
                    name: "Single V2",
                    routerPath: "/listing-details-v2"
                },
                {
                    name: "Single V3",
                    routerPath: "/listing-details-v3"
                },
                {
                    name: "Single V4",
                    routerPath: "/listing-details-v4"
                }
            ]
        }
    ];
    const blog = [
        {
            id: 1,
            name: "Blog List 1",
            routerPath: "/blog-list-1"
        },
        {
            id: 2,
            name: "Blog List 2",
            routerPath: "/blog-list-2"
        },
        {
            id: 3,
            name: "Blog List 3",
            routerPath: "/blog-list-3"
        },
        {
            id: 4,
            name: "Blog Details",
            routerPath: "/blog-details"
        }
    ];
    const pages = [
        {
            id: 1,
            name: "About Us",
            routerPath: "/about-us"
        },
        {
            id: 2,
            name: "Gallery",
            routerPath: "/gallery"
        },
        {
            id: 3,
            name: "Faq",
            routerPath: "/faq"
        },
        {
            id: 4,
            name: "LogIn",
            routerPath: "/login"
        },
        {
            id: 5,
            name: "Compare",
            routerPath: "/compare"
        },
        {
            id: 6,
            name: "Membership",
            routerPath: "/membership"
        },
        {
            id: 7,
            name: "Register",
            routerPath: "/register"
        },
        {
            id: 8,
            name: "Service",
            routerPath: "/service"
        },
        {
            id: 9,
            name: "404 Page",
            routerPath: "/404"
        },
        {
            id: 10,
            name: "Terms & Conditions",
            routerPath: "/terms"
        }
    ];
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
        id: "respMenu",
        className: "ace-responsive-menu text-end d-lg-block d-none",
        "data-menu-style": "horizontal",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                className: "last",
                children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    href: "/",
                    className: route.pathname === "/" ? "ui-active" : undefined,
                    children: "Home"
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                className: "last",
                children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    href: "/listing-grid",
                    className: route.pathname === "/listing-grid" ? "ui-active" : undefined,
                    children: "Listing"
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                className: "last",
                children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    href: "/service",
                    className: route.pathname === "/service" ? "ui-active" : undefined,
                    children: "Services"
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                className: "last",
                children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    href: "/about-us",
                    className: route.pathname === "/about-us" ? "ui-active" : undefined,
                    children: "About Us"
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                className: "last",
                children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    href: "/contact",
                    className: route.pathname === "/contact" ? "ui-active" : undefined,
                    children: "Contact"
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                className: "user_setting",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "dropdown",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                            className: "btn dropdown-toggle",
                            href: "#",
                            "data-bs-toggle": "dropdown",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                    width: 45,
                                    height: 45,
                                    className: "rounded-circle",
                                    src: "/assets/images/team/e1.png",
                                    alt: "e1.png"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: "dn-1199 ms-1",
                                    children: "Ali Tufan"
                                })
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "dropdown-menu",
                            children: /*#__PURE__*/ jsx_runtime_.jsx(dashboard_MyAccount, {})
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                className: `list-inline-item add_listing ${float}`,
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                    href: "/create-listing",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                            className: "flaticon-plus"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                            className: "dn-lg",
                            children: " Create Listing"
                        })
                    ]
                })
            })
        ]
    });
};
/* harmony default export */ const dashboard_HeaderMenuContent = (HeaderMenuContent);

;// CONCATENATED MODULE: ./src/components/common/header/dashboard/Header.jsx





const Header = ()=>{
    const [navbar, setNavbar] = (0,external_react_.useState)(false);
    const changeBackground = ()=>{
        if (window.scrollY >= 95) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    };
    (0,external_react_.useEffect)(()=>{
        window.addEventListener("scroll", changeBackground);
    }, []);
    return /*#__PURE__*/ jsx_runtime_.jsx("header", {
        className: `header-nav menu_style_home_one style2 navbar-scrolltofixed stricky main-menu  ${navbar ? "stricky-fixed " : ""}`,
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "container-fluid p0",
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                    href: "/",
                    className: "navbar_brand float-start dn-smd",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                            width: 40,
                            height: 45,
                            className: "logo1 img-fluid",
                            src: "/assets/images/header-logo2.png",
                            alt: "header-logo2.png"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                            width: 40,
                            height: 45,
                            className: "logo2 img-fluid",
                            src: "/assets/images/header-logo2.png",
                            alt: "header-logo2.png"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                            children: "AppraisalLink"
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("nav", {
                    children: /*#__PURE__*/ jsx_runtime_.jsx(dashboard_HeaderMenuContent, {})
                })
            ]
        })
    });
};
/* harmony default export */ const dashboard_Header = (Header);


/***/ }),

/***/ 7216:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_daynamicNavigation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3812);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);






const SidebarMenu = ()=>{
    const route = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const [userDetail, setUserDetail] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)({});
    (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(()=>{
        setUserDetail(JSON.parse(sessionStorage.getItem("FHlogindetails")));
        console.log(JSON.parse(sessionStorage.getItem("FHlogindetails")));
    }, []);
    const myProperties = [
        {
            id: 1,
            name: "General Elements",
            route: "/my-properties"
        },
        {
            id: 2,
            name: "Advanced Elements",
            route: "/my-properties"
        },
        {
            id: 3,
            name: "Editors",
            route: "/my-properties"
        }
    ];
    const reviews = [
        {
            id: 1,
            name: "My Reviews",
            route: "/my-review"
        },
        {
            id: 2,
            name: "Visitor Reviews",
            route: "/my-review"
        }
    ];
    const manageAccount = [
        {
            id: 1,
            name: "My Package",
            route: "/my-package",
            icon: "flaticon-box"
        },
        {
            id: 2,
            name: "My Profile",
            route: "/my-profile",
            icon: "flaticon-user"
        },
        {
            id: 3,
            name: "Logout",
            route: "/",
            icon: "flaticon-logout"
        }
    ];
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
            className: "sidebar-menu",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                    className: "sidebar_header header",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                        href: "/",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_3___default()), {
                                width: 40,
                                height: 45,
                                src: "/assets/images/header-logo2.png",
                                alt: "header-logo2.png"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                children: [
                                    "AppraisalLink ",
                                    userDetail.userAccountType
                                ]
                            })
                        ]
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                    className: "title",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            children: "Main"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    className: `treeview ${(0,_utils_daynamicNavigation__WEBPACK_IMPORTED_MODULE_5__/* .isSinglePageActive */ .J)("/my-dashboard", route.pathname) ? "active" : ""}`,
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                        href: "/my-dashboard",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "flaticon-layers"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                children: " Dashboard"
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    className: `treeview ${(0,_utils_daynamicNavigation__WEBPACK_IMPORTED_MODULE_5__/* .isSinglePageActive */ .J)("/create-listing", route.pathname) ? "active" : ""}`,
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                        href: "/create-listing",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "flaticon-plus"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                children: " Create Listing"
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    className: `treeview ${(0,_utils_daynamicNavigation__WEBPACK_IMPORTED_MODULE_5__/* .isSinglePageActive */ .J)("/my-message", route.pathname) ? "active" : ""}`,
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                        href: "/my-message",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "flaticon-envelope"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                children: " Message"
                                            })
                                        ]
                                    })
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                    className: "title",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            children: "Manage Listings"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                    className: `treeview ${(0,_utils_daynamicNavigation__WEBPACK_IMPORTED_MODULE_5__/* .isParentPageActive */ .V)(myProperties, route.pathname) ? "active" : ""}`,
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                            "data-bs-toggle": "collapse",
                                            href: "#my-property",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                    className: "flaticon-home"
                                                }),
                                                " ",
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    children: "My Properties"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                    className: "fa fa-angle-down pull-right"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                                            className: "treeview-menu collapse",
                                            id: "my-property",
                                            children: myProperties.map((item)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                                        href: item.route,
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                                className: "fa fa-circle"
                                                            }),
                                                            " ",
                                                            item.name
                                                        ]
                                                    })
                                                }, item.id))
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                    className: `treeview ${(0,_utils_daynamicNavigation__WEBPACK_IMPORTED_MODULE_5__/* .isParentPageActive */ .V)(reviews, route.pathname) ? "active" : ""}`,
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                            "data-bs-toggle": "collapse",
                                            href: "#review",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                    className: "flaticon-chat"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    children: "Reviews"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                    className: "fa fa-angle-down pull-right"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                                            className: "treeview-menu collapse",
                                            id: "review",
                                            children: reviews.map((item)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                                        href: item.route,
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                                className: "fa fa-circle"
                                                            }),
                                                            " ",
                                                            item.name
                                                        ]
                                                    })
                                                }, item.id))
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    className: `treeview ${(0,_utils_daynamicNavigation__WEBPACK_IMPORTED_MODULE_5__/* .isSinglePageActive */ .J)("/my-favourites", route.pathname) ? "active" : ""}`,
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                        href: "/my-favourites",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "flaticon-magnifying-glass"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                children: " My Favorites"
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    className: `treeview ${(0,_utils_daynamicNavigation__WEBPACK_IMPORTED_MODULE_5__/* .isSinglePageActive */ .J)("/my-saved-search", route.pathname) ? "active" : ""}`,
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                        href: "/my-saved-search",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "flaticon-magnifying-glass"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                children: " Saved Search"
                                            })
                                        ]
                                    })
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                    className: "title",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            children: "Manage Account"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                            children: manageAccount.map((item)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    className: (0,_utils_daynamicNavigation__WEBPACK_IMPORTED_MODULE_5__/* .isSinglePageActive */ .J)(item.route, route.pathname) ? "active" : "",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                        href: item.route,
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: item.icon
                                            }),
                                            " ",
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                children: item.name
                                            })
                                        ]
                                    })
                                }, item.id))
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SidebarMenu);


/***/ }),

/***/ 3812:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J": () => (/* binding */ isSinglePageActive),
/* harmony export */   "V": () => (/* binding */ isParentPageActive)
/* harmony export */ });
/* -------------------------------------------------------------------------- */ /*                      is children page active checking                      */ /* -------------------------------------------------------------------------- */ function isSinglePageActive(path, match) {
    if (path && match) {
        if (path === match) {
            return true;
        }
        return false;
    }
    return false;
}
/* -------------------------------------------------------------------------- */ /*                       is parent page active checking                       */ /* -------------------------------------------------------------------------- */ function isParentPageActive(pages, path) {
    if (pages) {
        return pages.some((page)=>page.route === path);
    }
    return false;
}


/***/ })

};
;