"use strict";
exports.id = 8231;
exports.ids = [8231];
exports.modules = {

/***/ 7380:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ common_GlobalFilter)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
var router_default = /*#__PURE__*/__webpack_require__.n(router_);
// EXTERNAL MODULE: ./src/features/properties/propertiesSlice.js
var propertiesSlice = __webpack_require__(7194);
// EXTERNAL MODULE: ./src/components/common/PricingRangeSlider.jsx
var PricingRangeSlider = __webpack_require__(6202);
// EXTERNAL MODULE: ./src/components/common/CheckBoxFilter.jsx
var CheckBoxFilter = __webpack_require__(2632);
;// CONCATENATED MODULE: ./src/components/common/GlobalSelectBox.jsx

const GlobalSelectBox = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                className: "list-inline-item",
                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "candidate_revew_select",
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("select", {
                        className: "selectpicker w100 show-tick form-select",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "Bathrooms"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "1"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "2"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "3"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "4"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "5"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "6"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "7"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "8"
                            })
                        ]
                    })
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                className: "list-inline-item",
                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "candidate_revew_select",
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("select", {
                        className: "selectpicker w100 show-tick form-select",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "Bedrooms"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "1"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "2"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "3"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "4"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "5"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "6"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "7"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "8"
                            })
                        ]
                    })
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                className: "list-inline-item",
                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "candidate_revew_select",
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("select", {
                        className: "selectpicker w100 show-tick form-select",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "Year built"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "2013"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "2014"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "2015"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "2016"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "2017"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "2018"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "2019"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "2020"
                            })
                        ]
                    })
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                className: "list-inline-item",
                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "candidate_revew_select",
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("select", {
                        className: "selectpicker w100 show-tick form-select",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "Built-up Area"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "Adana"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "Ankara"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "Antalya"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "Bursa"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "Bodrum"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "Gaziantep"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "İstanbul"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "İzmir"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                children: "Konya"
                            })
                        ]
                    })
                })
            })
        ]
    });
};
/* harmony default export */ const common_GlobalSelectBox = (GlobalSelectBox);

;// CONCATENATED MODULE: ./src/components/common/GlobalFilter.jsx






const GlobalFilter = ({ className =""  })=>{
    // submit handler
    const submitHandler = ()=>{
        router_default().push("/listing-grid-v1");
    };
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: `home1-advnc-search ${className}`,
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
            className: "h1ads_1st_list mb0",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                    className: "list-inline-item",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "form-group",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("input", {
                            type: "text",
                            className: "form-control",
                            placeholder: "Enter keyword...",
                            onChange: (e)=>dispatch((0,propertiesSlice/* addKeyword */.c9)(e.target.value))
                        })
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                    className: "list-inline-item",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "search_option_two",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "candidate_revew_select",
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("select", {
                                className: "selectpicker w100 form-select show-tick",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                        value: "",
                                        children: "Property Type"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                        children: "Apartment"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                        children: "Bungalow"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                        children: "Condo"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                        children: "House"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                        children: "Land"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                        children: "Single Family"
                                    })
                                ]
                            })
                        })
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                    className: "list-inline-item",
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "form-group",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                type: "text",
                                className: "form-control",
                                placeholder: "Location",
                                onChange: (e)=>dispatch((0,propertiesSlice/* addLocation */.Dx)(e.target.value))
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: "flaticon-maps-and-flags"
                                })
                            })
                        ]
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                    className: "list-inline-item",
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "small_dropdown2",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                id: "prncgs",
                                className: "btn dd_btn",
                                "data-bs-toggle": "dropdown",
                                "data-bs-auto-close": "outside",
                                "aria-expanded": "false",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        children: "Price"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                        htmlFor: "InputEmail2",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "fa fa-angle-down"
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "dd_content2 dropdown-menu",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "pricing_acontent",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(PricingRangeSlider/* default */.Z, {})
                                })
                            })
                        ]
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                    className: "custome_fields_520 list-inline-item",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "navbered",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "mega-dropdown ",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                    className: "dropbtn",
                                    "data-bs-toggle": "dropdown",
                                    "data-bs-auto-close": "outside",
                                    "aria-expanded": "false",
                                    children: [
                                        "Advanced ",
                                        /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                            className: "flaticon-more pl10 flr-520"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "dropdown-content dropdown-menu ",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "row p15",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: "col-lg-12",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                                                        className: "text-thm3 mb-4",
                                                        children: "Amenities"
                                                    })
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx(CheckBoxFilter/* default */.Z, {})
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "row p15 pt0-xsd",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "col-lg-12 col-xl-12",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                                                    className: "apeartment_area_list mb0",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx(common_GlobalSelectBox, {})
                                                })
                                            })
                                        })
                                    ]
                                })
                            ]
                        })
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                    className: "list-inline-item",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "search_option_button",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                            onClick: submitHandler,
                            type: "submit",
                            className: "btn btn-thm",
                            children: "Search"
                        })
                    })
                })
            ]
        })
    });
};
/* harmony default export */ const common_GlobalFilter = (GlobalFilter);


/***/ }),

/***/ 2387:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _GlobalFilter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7380);


const GlobalHeroFilter = ({ className =""  })=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: `home_adv_srch_opt ${className}`,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                className: "nav nav-pills",
                id: "pills-tab",
                role: "tablist",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                        className: "nav-item",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            className: "nav-link active",
                            id: "pills-home-tab",
                            "data-bs-toggle": "pill",
                            href: "#pills-home",
                            role: "tab",
                            "aria-controls": "pills-home",
                            "aria-selected": "true",
                            children: "Buy"
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                        className: "nav-item",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            className: "nav-link",
                            id: "pills-profile-tab",
                            "data-bs-toggle": "pill",
                            href: "#pills-profile",
                            role: "tab",
                            "aria-controls": "pills-profile",
                            "aria-selected": "false",
                            children: "Rent"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "tab-content home1_adsrchfrm",
                id: "pills-tabContent",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "tab-pane fade show active",
                        id: "pills-home",
                        role: "tabpanel",
                        "aria-labelledby": "pills-home-tab",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_GlobalFilter__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {})
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "tab-pane fade",
                        id: "pills-profile",
                        role: "tabpanel",
                        "aria-labelledby": "pills-profile-tab",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_GlobalFilter__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {})
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GlobalHeroFilter);


/***/ }),

/***/ 7647:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ listing_SidebarListing3)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./src/components/common/listing/Categorie.jsx
var Categorie = __webpack_require__(6685);
// EXTERNAL MODULE: ./src/components/common/listing/FeaturedListings.jsx
var FeaturedListings = __webpack_require__(7885);
// EXTERNAL MODULE: ./src/components/common/listing/FeatureProperties.jsx
var FeatureProperties = __webpack_require__(2691);
;// CONCATENATED MODULE: ./src/components/common/listing/MortgageFiltering.jsx

const MortgageFiltering = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                className: "search_area",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "input-group mb-3",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                            type: "text",
                            className: "form-control",
                            id: "exampleInputName1",
                            placeholder: "Total Amount"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("label", {
                            htmlFor: "exampleInputName1",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "flaticon-money-bag"
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                className: "search_area",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "input-group mb-3",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                            type: "text",
                            className: "form-control",
                            id: "exampleInputAmount",
                            placeholder: "Down Payment"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("label", {
                            htmlFor: "exampleInputAmount",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "flaticon-money-bag"
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                className: "search_area",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "input-group mb-3",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                            type: "text",
                            className: "form-control",
                            id: "exampleInputAmount2",
                            placeholder: "Interest Rate"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("label", {
                            htmlFor: "exampleInputAmount2",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "flaticon-percent"
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                className: "search_area",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "input-group mb-3",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                            type: "text",
                            className: "form-control",
                            id: "exampleInputYear",
                            placeholder: "Loan Term (Years)"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("label", {
                            htmlFor: "exampleInputYear",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "flaticon-calendar"
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "search_option_two mb-3",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "candidate_revew_select",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("select", {
                            className: "selectpicker w100 show-tick  form-select",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                    children: "Monthly"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                    children: "Weekly"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                    children: "Yearly"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                    children: "Daily"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                    children: "Other"
                                })
                            ]
                        })
                    })
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "search_option_button style2",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                        type: "submit",
                        className: "btn btn-block btn-thm w-100",
                        children: "Search"
                    })
                })
            })
        ]
    });
};
/* harmony default export */ const listing_MortgageFiltering = (MortgageFiltering);

;// CONCATENATED MODULE: ./src/components/common/listing/SidebarListing3.jsx





const SidebarListing3 = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "sidebar_listing_grid1",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "sidebar_listing_list",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "sidebar_advanced_search_widget",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                            className: "title mb25",
                            children: "Mortgage Calculator"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                            className: "sasw_list mb0",
                            children: /*#__PURE__*/ jsx_runtime_.jsx(listing_MortgageFiltering, {})
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "terms_condition_widget",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                        className: "title",
                        children: "Featured Properties"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "sidebar_feature_property_slider",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(FeatureProperties/* default */.Z, {})
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "terms_condition_widget",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                        className: "title",
                        children: "Categories Property"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "widget_list",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                            className: "list_details",
                            children: /*#__PURE__*/ jsx_runtime_.jsx(Categorie/* default */.Z, {})
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "sidebar_feature_listing",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                        className: "title",
                        children: "Recently Viewed"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(FeaturedListings/* default */.Z, {})
                ]
            })
        ]
    });
};
/* harmony default export */ const listing_SidebarListing3 = (SidebarListing3);


/***/ })

};
;