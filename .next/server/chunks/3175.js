"use strict";
exports.id = 3175;
exports.ids = [3175];
exports.modules = {

/***/ 2469:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);


const CopyrightFooter = ()=>{
    const menuItems = [
        {
            id: 1,
            name: "Home",
            routeLink: "/"
        },
        {
            id: 2,
            name: "Listing",
            routeLink: "/listing-grid-v3"
        },
        {
            id: 3,
            name: "Property",
            routeLink: "/listing-grid-v4"
        },
        {
            id: 4,
            name: "About Us",
            routeLink: "/about-us"
        },
        {
            id: 5,
            name: "Blog",
            routeLink: "/blog-list-3"
        },
        {
            id: 6,
            name: "Contact",
            routeLink: "/contact"
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "row",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "col-lg-6 col-xl-6",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "footer_menu_widget",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                        children: menuItems.map((item)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                className: "list-inline-item",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                    href: item.routeLink,
                                    children: item.name
                                })
                            }, item.id))
                    })
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "col-lg-6 col-xl-6",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "copyright-widget text-end",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        children: [
                            "\xa9 ",
                            new Date().getFullYear(),
                            " by",
                            " ",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                href: "https://themeforest.net/user/ib-themes",
                                target: "_blank",
                                rel: "noreferrer",
                                children: "ib-themes"
                            }),
                            ". All rights reserved."
                        ]
                    })
                })
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CopyrightFooter);


/***/ }),

/***/ 9869:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ footer_Footer)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./src/components/common/footer/Social.jsx
var Social = __webpack_require__(9190);
;// CONCATENATED MODULE: ./src/components/common/footer/SubscribeForm.jsx

const SubscribeForm = ()=>{
    const handleSubmit = (event)=>{
        event.preventDefault();
    };
    return /*#__PURE__*/ jsx_runtime_.jsx("form", {
        className: "footer_mailchimp_form",
        onClick: handleSubmit,
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "d-flex align-items-center",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "col-auto",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("input", {
                        type: "email",
                        className: "form-control mb-2",
                        id: "inlineFormInput",
                        placeholder: "Your email"
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "col-auto ms-2",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                        type: "submit",
                        className: "btn btn-primary mb-2",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                            className: "fa fa-angle-right"
                        })
                    })
                })
            ]
        })
    });
};
/* harmony default export */ const footer_SubscribeForm = (SubscribeForm);

;// CONCATENATED MODULE: ./src/components/common/footer/Footer.jsx




const Footer = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "col-sm-6 col-md-6 col-lg-3 col-xl-3 pr0 pl0",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "footer_about_widget",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                            children: "About Site"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                            children: "We’re reimagining how you buy, sell and rent. It’s now easier to get into a place you love. So let’s do this, together."
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "col-sm-6 col-md-6 col-lg-3 col-xl-3",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "footer_qlink_widget",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                            children: "Quick Links"
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                            className: "list-unstyled",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                        href: "/",
                                        children: "About Us"
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                        href: "/",
                                        children: "Terms & Conditions"
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                        href: "/",
                                        children: "User’s Guide"
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                        href: "/",
                                        children: "Support Center"
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                        href: "/",
                                        children: "Press Info"
                                    })
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "col-sm-6 col-md-6 col-lg-3 col-xl-3",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "footer_contact_widget",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                            children: "Contact Us"
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                            className: "list-unstyled",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        href: "mailto:info@findhouse.com",
                                        children: "info@appraisallink.com"
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        href: "#",
                                        children: "Collins Street West, Victoria"
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        href: "#",
                                        children: "8007, Australia."
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        href: "tel:+4733378901",
                                        children: "+1 246-345-0699"
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        href: "tel:+4733378901",
                                        children: "+1 246-345-0695"
                                    })
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "col-sm-6 col-md-6 col-lg-3 col-xl-3",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "footer_social_widget",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                            children: "Follow us"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                            className: "mb30",
                            children: /*#__PURE__*/ jsx_runtime_.jsx(Social/* default */.Z, {})
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                            children: "Subscribe"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(footer_SubscribeForm, {})
                    ]
                })
            })
        ]
    });
};
/* harmony default export */ const footer_Footer = (Footer);


/***/ }),

/***/ 9190:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const Social = ()=>{
    const socialContent = [
        {
            id: 1,
            liveLink: "https://www.facebook.com/",
            icon: "fa-facebook"
        },
        {
            id: 2,
            liveLink: "https://www.twitter.com/",
            icon: "fa-twitter"
        },
        {
            id: 3,
            liveLink: "https://www.instagram.com/",
            icon: "fa-instagram"
        },
        {
            id: 4,
            liveLink: "https://www.pinterest.com/",
            icon: "fa-pinterest"
        },
        {
            id: 5,
            liveLink: "https://www.dribbble.com/",
            icon: "fa-dribbble"
        }
    ];
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: socialContent.map((item)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                className: "list-inline-item",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                    href: item.liveLink,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                        className: `fa ${item.icon}`
                    })
                })
            }, item.id))
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Social);


/***/ })

};
;