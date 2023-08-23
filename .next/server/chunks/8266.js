"use strict";
exports.id = 8266;
exports.ids = [8266];
exports.modules = {

/***/ 8266:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _features_filter_filterSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8289);
/* harmony import */ var _features_properties_propertiesSlice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7194);
/* harmony import */ var _common_PricingRangeSlider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6202);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6555);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_7__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([uuid__WEBPACK_IMPORTED_MODULE_6__]);
uuid__WEBPACK_IMPORTED_MODULE_6__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];









const FilteringItem = ()=>{
    const { keyword , location , status , propertyType , bathrooms , bedrooms , garages , yearBuilt , area , amenities  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)((state)=>state.properties);
    // input state
    const [getKeyword, setKeyword] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(keyword);
    const [getLocation, setLocation] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(location);
    const [getStatus, setStatus] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(status);
    const [getPropertiesType, setPropertiesType] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(propertyType);
    const [getBathroom, setBathroom] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(bathrooms);
    const [getBedroom, setBedroom] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(bedrooms);
    const [getGarages, setGarages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(garages);
    const [getBuiltYear, setBuiltYear] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(yearBuilt);
    const [getAreaMin, setAreaMin] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(area.min);
    const [getAreaMax, setAreaMax] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(area.max);
    // advanced state
    const [getAdvanced, setAdvanced] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([
        {
            id: (0,uuid__WEBPACK_IMPORTED_MODULE_6__.v4)(),
            name: "Air Conditioning"
        },
        {
            id: (0,uuid__WEBPACK_IMPORTED_MODULE_6__.v4)(),
            name: "Barbeque"
        },
        {
            id: (0,uuid__WEBPACK_IMPORTED_MODULE_6__.v4)(),
            name: "Gym"
        },
        {
            id: (0,uuid__WEBPACK_IMPORTED_MODULE_6__.v4)(),
            name: "Microwave"
        },
        {
            id: (0,uuid__WEBPACK_IMPORTED_MODULE_6__.v4)(),
            name: "TV Cable"
        },
        {
            id: (0,uuid__WEBPACK_IMPORTED_MODULE_6__.v4)(),
            name: "Lawn"
        },
        {
            id: (0,uuid__WEBPACK_IMPORTED_MODULE_6__.v4)(),
            name: "Refrigerator"
        },
        {
            id: (0,uuid__WEBPACK_IMPORTED_MODULE_6__.v4)(),
            name: "Swimming Pool"
        },
        {
            id: (0,uuid__WEBPACK_IMPORTED_MODULE_6__.v4)(),
            name: "WiFi"
        },
        {
            id: (0,uuid__WEBPACK_IMPORTED_MODULE_6__.v4)(),
            name: "Sauna"
        },
        {
            id: (0,uuid__WEBPACK_IMPORTED_MODULE_6__.v4)(),
            name: "Dryer"
        },
        {
            id: (0,uuid__WEBPACK_IMPORTED_MODULE_6__.v4)(),
            name: "Washer"
        },
        {
            id: (0,uuid__WEBPACK_IMPORTED_MODULE_6__.v4)(),
            name: "Laundry"
        },
        {
            id: (0,uuid__WEBPACK_IMPORTED_MODULE_6__.v4)(),
            name: "Outdoor Shower"
        },
        {
            id: (0,uuid__WEBPACK_IMPORTED_MODULE_6__.v4)(),
            name: "Window Coverings"
        }
    ]);
    const dispath = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
    const Router = (0,next_router__WEBPACK_IMPORTED_MODULE_7__.useRouter)();
    // keyword
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        dispath((0,_features_properties_propertiesSlice__WEBPACK_IMPORTED_MODULE_4__/* .addKeyword */ .c9)(getKeyword));
    }, [
        dispath,
        getKeyword
    ]);
    // location
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        dispath((0,_features_properties_propertiesSlice__WEBPACK_IMPORTED_MODULE_4__/* .addLocation */ .Dx)(getLocation));
    }, [
        dispath,
        getLocation
    ]);
    // status
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        dispath((0,_features_properties_propertiesSlice__WEBPACK_IMPORTED_MODULE_4__/* .addStatus */ .O8)(getStatus));
    }, [
        dispath,
        getStatus
    ]);
    // properties type
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        dispath((0,_features_properties_propertiesSlice__WEBPACK_IMPORTED_MODULE_4__/* .addPropertyType */ .ZE)(getPropertiesType));
    }, [
        dispath,
        getPropertiesType
    ]);
    // bathroom
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        dispath((0,_features_properties_propertiesSlice__WEBPACK_IMPORTED_MODULE_4__/* .addBathrooms */ .dZ)(getBathroom));
    }, [
        dispath,
        getBathroom
    ]);
    // bedroom
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        dispath((0,_features_properties_propertiesSlice__WEBPACK_IMPORTED_MODULE_4__/* .addBedrooms */ .CS)(getBedroom));
    }, [
        dispath,
        getBedroom
    ]);
    // garages
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        dispath((0,_features_properties_propertiesSlice__WEBPACK_IMPORTED_MODULE_4__/* .addGarages */ .ub)(getGarages));
    }, [
        dispath,
        getGarages
    ]);
    // built years
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        dispath((0,_features_properties_propertiesSlice__WEBPACK_IMPORTED_MODULE_4__/* .addYearBuilt */ .UQ)(getBuiltYear));
    }, [
        dispath,
        getBuiltYear
    ]);
    // area min
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        dispath(dispath((0,_features_properties_propertiesSlice__WEBPACK_IMPORTED_MODULE_4__/* .addAreaMin */ .du)(getAreaMin)));
    }, [
        dispath,
        getAreaMin
    ]);
    // area max
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        dispath(dispath((0,_features_properties_propertiesSlice__WEBPACK_IMPORTED_MODULE_4__/* .addAreaMax */ .hi)(getAreaMax)));
    }, [
        dispath,
        getAreaMax
    ]);
    // clear filter
    const clearHandler = ()=>{
        clearAllFilters();
    };
    const clearAllFilters = ()=>{
        setKeyword("");
        setLocation("");
        setStatus("");
        setPropertiesType("");
        dispath((0,_features_properties_propertiesSlice__WEBPACK_IMPORTED_MODULE_4__/* .addPrice */ .zB)({
            min: 10000,
            max: 20000
        }));
        setBathroom("");
        setBedroom("");
        setBedroom("");
        setGarages("");
        setBuiltYear("");
        setAreaMin("");
        setAreaMax("");
        dispath((0,_features_properties_propertiesSlice__WEBPACK_IMPORTED_MODULE_4__/* .resetAmenities */ .B4)());
        dispath((0,_features_filter_filterSlice__WEBPACK_IMPORTED_MODULE_3__/* .addStatusType */ .PA)(""));
        dispath((0,_features_filter_filterSlice__WEBPACK_IMPORTED_MODULE_3__/* .addFeatured */ .S4)(""));
        clearAdvanced();
    };
    // clear advanced
    const clearAdvanced = ()=>{
        const changed = getAdvanced.map((item)=>{
            item.isChecked = false;
            return item;
        });
        setAdvanced(changed);
    };
    // add advanced
    const advancedHandler = (id)=>{
        const data = getAdvanced.map((feature)=>{
            if (feature.id === id) {
                if (feature.isChecked) {
                    feature.isChecked = false;
                } else {
                    feature.isChecked = true;
                }
            }
            return feature;
        });
        setAdvanced(data);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
        className: "sasw_list mb0",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                className: "search_area",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "form-group mb-3",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            type: "text",
                            className: "form-control",
                            placeholder: "keyword",
                            value: getKeyword,
                            onChange: (e)=>setKeyword(e.target.value)
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "flaticon-magnifying-glass"
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                className: "search_area",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "form-group mb-3",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            type: "search",
                            className: "form-control",
                            id: "exampleInputEmail",
                            placeholder: "Location",
                            value: getLocation,
                            onChange: (e)=>setLocation(e.target.value)
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: "exampleInputEmail",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "flaticon-maps-and-flags"
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "search_option_two",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "candidate_revew_select",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                            onChange: (e)=>setStatus(e.target.value),
                            className: "selectpicker w100 show-tick form-select",
                            value: getStatus,
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "",
                                    children: "Status"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "apartment",
                                    children: "Apartment"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "bungalow",
                                    children: "Bungalow"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "condo",
                                    children: "Condo"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "house",
                                    children: "House"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "land",
                                    children: "Land"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "single family",
                                    children: "Single Family"
                                })
                            ]
                        })
                    })
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "search_option_two",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "candidate_revew_select",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                            onChange: (e)=>setPropertiesType(e.target.value),
                            className: "selectpicker w100 show-tick form-select",
                            value: getPropertiesType,
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "",
                                    children: "Property Type"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "apartment",
                                    children: "Apartment"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "bungalow",
                                    children: "Bungalow"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "condo",
                                    children: "Condo"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "house",
                                    children: "House"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "land",
                                    children: "Land"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "single family",
                                    children: "Single Family"
                                })
                            ]
                        })
                    })
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "small_dropdown2",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            id: "prncgs2",
                            className: "btn dd_btn",
                            "data-bs-toggle": "dropdown",
                            "data-bs-auto-close": "outside",
                            "aria-expanded": "false",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    children: "Price Range"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                    htmlFor: "prncgs2",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "fa fa-angle-down"
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "dd_content2 style2 dropdown-menu",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "pricing_acontent ",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_common_PricingRangeSlider__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {})
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "search_option_two",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "candidate_revew_select",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                            onChange: (e)=>setBathroom(e.target.value),
                            className: "selectpicker w100 show-tick form-select",
                            value: getBathroom,
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "",
                                    children: "Bathrooms"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "1",
                                    children: "1"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "2",
                                    children: "2"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "3",
                                    children: "3"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "4",
                                    children: "4"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "5",
                                    children: "5"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "6",
                                    children: "6"
                                })
                            ]
                        })
                    })
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "search_option_two",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "candidate_revew_select",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                            onChange: (e)=>setBedroom(e.target.value),
                            className: "selectpicker w100 show-tick form-select",
                            value: getBedroom,
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "",
                                    children: "Bedrooms"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "1",
                                    children: "1"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "2",
                                    children: "2"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "3",
                                    children: "3"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "4",
                                    children: "4"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "5",
                                    children: "5"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "6",
                                    children: "6"
                                })
                            ]
                        })
                    })
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "search_option_two",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "candidate_revew_select",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                            onChange: (e)=>setGarages(e.target.value),
                            className: "selectpicker w100 show-tick form-select",
                            value: getGarages,
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "",
                                    children: "Garages"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "yes",
                                    children: "Yes"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "no",
                                    children: "No"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "other",
                                    children: "Others"
                                })
                            ]
                        })
                    })
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "search_option_two",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "candidate_revew_select",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                            onChange: (e)=>setBuiltYear(e.target.value),
                            className: "selectpicker w100 show-tick form-select",
                            value: getBuiltYear,
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "",
                                    children: "Year built"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "2013",
                                    children: "2013"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "2014",
                                    children: "2014"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "2015",
                                    children: "2015"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "2016",
                                    children: "2016"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "2017",
                                    children: "2017"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "2018",
                                    children: "2018"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "2019",
                                    children: "2019"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: "2020",
                                    children: "2020"
                                })
                            ]
                        })
                    })
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                className: "min_area list-inline-item",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "form-group mb-4",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        type: "number",
                        className: "form-control",
                        id: "exampleInputName2",
                        placeholder: "Min Area",
                        value: getAreaMin,
                        onChange: (e)=>setAreaMin(e.target.value)
                    })
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                className: "max_area list-inline-item",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "form-group mb-4",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        type: "number",
                        className: "form-control",
                        id: "exampleInputName3",
                        placeholder: "Max Area",
                        value: getAreaMax,
                        onChange: (e)=>setAreaMax(e.target.value)
                    })
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    id: "accordion",
                    className: "panel-group",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "panel",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "panel-heading",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                                    className: "panel-title",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                        href: "#panelBodyRating",
                                        className: "accordion-toggle link",
                                        "data-bs-toggle": "collapse",
                                        "data-bs-parent": "#accordion",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "flaticon-more"
                                            }),
                                            " Advanced features"
                                        ]
                                    })
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                id: "panelBodyRating",
                                className: "panel-collapse collapse",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "panel-body row",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "col-lg-12",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                                            className: "ui_kit_checkbox selectable-list fn-400",
                                            children: getAdvanced?.map((feature)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "form-check custom-checkbox",
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                                type: "checkbox",
                                                                className: "form-check-input",
                                                                id: feature.id,
                                                                value: feature.name,
                                                                checked: feature.isChecked || false,
                                                                onChange: (e)=>dispath((0,_features_properties_propertiesSlice__WEBPACK_IMPORTED_MODULE_4__/* .addAmenities */ .F6)(e.target.value)),
                                                                onClick: ()=>advancedHandler(feature.id)
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                                className: "form-check-label",
                                                                htmlFor: feature.id,
                                                                children: feature.name
                                                            })
                                                        ]
                                                    })
                                                }, feature.id))
                                        })
                                    })
                                })
                            })
                        ]
                    })
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "search_option_button",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        onClick: clearHandler,
                        type: "button",
                        className: "btn btn-block btn-thm w-100",
                        children: "Clear Filters"
                    })
                })
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FilteringItem);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;