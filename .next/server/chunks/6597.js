"use strict";
exports.id = 6597;
exports.ids = [6597];
exports.modules = {

/***/ 6597:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ blog_BlogSidebar)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./src/components/common/blog/Categories.jsx

const Categories = ()=>{
    const categorieContent = [
        {
            id: 1,
            name: "Apartment",
            propertyNumber: "6"
        },
        {
            id: 2,
            name: "Condo",
            propertyNumber: "12"
        },
        {
            id: 3,
            name: "Family House",
            propertyNumber: "8"
        },
        {
            id: 4,
            name: "Modern Villa",
            propertyNumber: "26"
        },
        {
            id: 5,
            name: "Town House",
            propertyNumber: "89"
        }
    ];
    return /*#__PURE__*/ jsx_runtime_.jsx("ul", {
        className: "list_details",
        children: categorieContent.map((item)=>/*#__PURE__*/ jsx_runtime_.jsx("li", {
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                    href: "#",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("i", {
                            className: "fa fa-caret-right mr10"
                        }),
                        item.name,
                        " ",
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                            className: "float-end",
                            children: [
                                item.propertyNumber,
                                " properties"
                            ]
                        })
                    ]
                })
            }, item.id))
    });
};
/* harmony default export */ const blog_Categories = (Categories);

// EXTERNAL MODULE: ./src/components/common/listing/FeaturedListings.jsx
var FeaturedListings = __webpack_require__(7885);
;// CONCATENATED MODULE: ./src/components/common/blog/SearchBox.jsx

const SearchBox = ()=>{
    const handleSubmit = (event)=>{
        event.preventDefault();
    };
    return /*#__PURE__*/ jsx_runtime_.jsx("form", {
        onClick: handleSubmit,
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "input-group",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                    type: "text",
                    className: "form-control",
                    placeholder: "Search Here",
                    "aria-label": "Recipient's username",
                    "aria-describedby": "button-addon2",
                    required: true
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "input-group-append",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                        className: "btn btn-outline-secondary",
                        type: "button",
                        id: "button-addon2",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                            className: "flaticon-magnifying-glass"
                        })
                    })
                })
            ]
        })
    });
};
/* harmony default export */ const blog_SearchBox = (SearchBox);

;// CONCATENATED MODULE: ./src/components/common/blog/TagList.jsx

const TagList = ()=>{
    const tagContent = [
        {
            id: 1,
            name: "Apartment"
        },
        {
            id: 2,
            name: "Real Estate"
        },
        {
            id: 3,
            name: "Estate"
        },
        {
            id: 4,
            name: "Luxury"
        },
        {
            id: 5,
            name: "Real"
        }
    ];
    return /*#__PURE__*/ jsx_runtime_.jsx("ul", {
        className: "tag_list",
        children: tagContent.map((item)=>/*#__PURE__*/ jsx_runtime_.jsx("li", {
                className: "list-inline-item",
                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                    href: "#",
                    children: item.name
                })
            }, item.id))
    });
};
/* harmony default export */ const blog_TagList = (TagList);

;// CONCATENATED MODULE: ./src/components/common/blog/BlogSidebar.jsx





const BlogSidebar = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "blog-sidebar_widgets",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "sidebar_search_widget",
                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "blog_search_widget",
                    children: /*#__PURE__*/ jsx_runtime_.jsx(blog_SearchBox, {})
                })
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
                        children: /*#__PURE__*/ jsx_runtime_.jsx(blog_Categories, {})
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "sidebar_feature_listing",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                        className: "title",
                        children: "Featured Listings"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(FeaturedListings/* default */.Z, {})
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "blog_tag_widget",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                        className: "title",
                        children: "Tags"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(blog_TagList, {})
                ]
            })
        ]
    });
};
/* harmony default export */ const blog_BlogSidebar = (BlogSidebar);


/***/ })

};
;