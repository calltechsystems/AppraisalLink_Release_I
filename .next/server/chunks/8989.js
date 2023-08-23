"use strict";
exports.id = 8989;
exports.ids = [8989];
exports.modules = {

/***/ 8989:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ header_MobileMenu)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./node_modules/react-pro-sidebar/dist/css/styles.css
var styles = __webpack_require__(2844);
// EXTERNAL MODULE: external "react-pro-sidebar"
var external_react_pro_sidebar_ = __webpack_require__(1981);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
;// CONCATENATED MODULE: ./src/components/common/header/MobileMenuContent.jsx






const home = [
    {
        name: "Home 1",
        routerPath: "/"
    },
    {
        name: "Home 2",
        routerPath: "/home-2"
    },
    {
        name: "Home 3",
        routerPath: "/home-3"
    },
    {
        name: "Home 4",
        routerPath: "/home-4"
    },
    {
        name: "Home 5",
        routerPath: "/home-5"
    },
    {
        name: "Home 6",
        routerPath: "/home-6"
    },
    {
        name: "Home 7",
        routerPath: "/home-7"
    },
    {
        name: "Home 8",
        routerPath: "/home-8"
    },
    {
        name: "Home 9",
        routerPath: "/home-9"
    },
    {
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
    },
    {
        id: 7,
        title: "Create Listing",
        items: [
            {
                name: "Create Listing",
                routerPath: "/create-listing"
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
        name: "About Us",
        routerPath: "/about-us"
    },
    {
        name: "Gallery",
        routerPath: "/gallery"
    },
    {
        name: "Faq",
        routerPath: "/faq"
    },
    {
        name: "LogIn",
        routerPath: "/login"
    },
    {
        name: "Compare",
        routerPath: "/compare"
    },
    {
        name: "Membership",
        routerPath: "/membership"
    },
    {
        name: "Register",
        routerPath: "/register"
    },
    {
        name: "Service",
        routerPath: "/service"
    },
    {
        name: "404 Page",
        routerPath: "/404"
    },
    {
        name: "Terms & Conditions",
        routerPath: "/terms"
    }
];
const MobileMenuContent = ()=>{
    const route = (0,router_.useRouter)();
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_pro_sidebar_.ProSidebar, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(external_react_pro_sidebar_.SidebarHeader, {
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "sidebar-header",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                            href: "/",
                            className: "sidebar-header-inner",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                    width: 40,
                                    height: 45,
                                    className: "nav_logo_img img-fluid mt20",
                                    src: "/assets/images/header-logo2.png",
                                    alt: "header-logo.png"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: "brand-text",
                                    children: "FindHouse"
                                })
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "fix-icon",
                            "data-bs-dismiss": "offcanvas",
                            "aria-label": "Close",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "flaticon-close"
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(external_react_pro_sidebar_.SidebarContent, {
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_pro_sidebar_.Menu, {
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_pro_sidebar_.MenuItem, {
                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                href: "/",
                                className: route.pathname === "/" ? "ui-active" : undefined,
                                children: "Home"
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_pro_sidebar_.MenuItem, {
                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                href: "/listing-grid",
                                className: route.pathname === "/listing-grid" ? "ui-active" : undefined,
                                children: "Listing"
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_pro_sidebar_.MenuItem, {
                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                href: "/service",
                                className: route.pathname === "/service" ? "ui-active" : undefined,
                                children: "Services"
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_pro_sidebar_.MenuItem, {
                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                href: "/about-us",
                                className: route.pathname === "/about-us" ? "ui-active" : undefined,
                                children: "About Us"
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_pro_sidebar_.MenuItem, {
                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                href: "/contact",
                                className: route.pathname === "/contact" ? "ui-active" : undefined,
                                children: "Contact"
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_pro_sidebar_.MenuItem, {
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                                href: "/login",
                                className: route.pathname === "/login" ? "ui-active" : undefined,
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        className: "flaticon-user"
                                    }),
                                    " Login"
                                ]
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_pro_sidebar_.MenuItem, {
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                                href: "/register",
                                className: route.pathname === "/register" ? "ui-active" : undefined,
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        className: "flaticon-edit"
                                    }),
                                    " Register"
                                ]
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(external_react_pro_sidebar_.SidebarFooter, {
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                    href: "/create-listing",
                    className: "btn btn-block btn-lg btn-thm circle",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                            className: "flaticon-plus"
                        }),
                        " Create Listing"
                    ]
                })
            })
        ]
    });
};
/* harmony default export */ const header_MobileMenuContent = (MobileMenuContent);

;// CONCATENATED MODULE: ./src/components/common/header/MobileMenu.jsx




const MobileMenu = ()=>{
    return(// <!-- Main Header Nav For Mobile -->
    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "stylehome1 h0 mega-menu-wrapper",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "mobile-menu",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "header stylehome1",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "main_logo_home2 text-center",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                    width: 40,
                                    height: 45,
                                    className: "nav_logo_img contain mt20",
                                    src: "/assets/images/header-logo2.png",
                                    alt: "header-logo2.png"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: "mt20",
                                    children: "AppraisalLink"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                            className: "menu_bar_home2",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                    className: "list-inline-item list_s",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                        href: "/login",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "flaticon-user"
                                        })
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                    className: "list-inline-item",
                                    "data-bs-toggle": "offcanvas",
                                    "data-bs-target": "#offcanvasMenu",
                                    "aria-controls": "offcanvasMenu",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("span", {})
                                    })
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "offcanvas offcanvas-start",
                tabIndex: "-1",
                id: "offcanvasMenu",
                "aria-labelledby": "offcanvasMenuLabel",
                "data-bs-scroll": "true",
                children: /*#__PURE__*/ jsx_runtime_.jsx(header_MobileMenuContent, {})
            })
        ]
    }));
};
/* harmony default export */ const header_MobileMenu = (MobileMenu);


/***/ })

};
;