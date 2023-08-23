"use strict";
exports.id = 7302;
exports.ids = [7302];
exports.modules = {

/***/ 7302:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const Pricing = ()=>{
    const pricingContent = [
        {
            id: 1,
            price: "56",
            title: "Pro",
            features: [
                "50 Property Listings",
                "60 Days Availability",
                "20 Featured Property",
                "Limited Support"
            ]
        },
        {
            id: 2,
            price: "190",
            title: "Elite",
            features: [
                "100 Property Listings",
                "120 Days Availability",
                "40 Featured Property",
                "Limited Support"
            ]
        },
        {
            id: 3,
            price: "291",
            title: "Ultimate",
            features: [
                "Unlimited Property Listings",
                "1 Year Availability",
                "Unlimited Featured Property",
                "Limited Support"
            ]
        }
    ];
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: pricingContent.map((item)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "col-sm-6 col-md-6 col-lg-4",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "pricing_table",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "pricing_header",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "price",
                                    children: [
                                        "$",
                                        item.price
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                                    children: item.title
                                })
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "pricing_content",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                                className: "mb0",
                                children: item.features.map((val, i)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                        children: val
                                    }, i))
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "pricing_footer",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                className: "btn pricing_btn btn-block",
                                href: "#",
                                children: "Select Package"
                            })
                        })
                    ]
                })
            }, item.id))
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pricing);


/***/ })

};
;