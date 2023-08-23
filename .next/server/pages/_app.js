(() => {
var exports = {};
exports.id = 2888;
exports.ids = [2888];
exports.modules = {

/***/ 2118:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: external "@reduxjs/toolkit"
var toolkit_ = __webpack_require__(5184);
;// CONCATENATED MODULE: ./src/features/agent/agentSlice.js

const initialState = {
    name: "",
    category: "",
    city: "",
    listen: "",
    length: 0
};
const agentSlice = (0,toolkit_.createSlice)({
    name: "agent",
    initialState,
    reducers: {
        addName: (state, action)=>{
            state.name = action.payload;
        },
        addCategory: (state, action)=>{
            state.category = action.payload;
        },
        addCity: (state, action)=>{
            state.city = action.payload;
        },
        addListen: (state, action)=>{
            state.listen = action.payload;
        },
        addAgentItemLength: (state, action)=>{
            state.length = action.payload;
        }
    }
});
const { addName , addCategory , addCity , addListen , addAgentItemLength  } = agentSlice.actions;
/* harmony default export */ const agent_agentSlice = (agentSlice.reducer);

;// CONCATENATED MODULE: external "@reduxjs/toolkit/query/react"
const react_namespaceObject = require("@reduxjs/toolkit/query/react");
;// CONCATENATED MODULE: ./src/features/api/api.js

const api = (0,react_namespaceObject.createApi)({
    reducerPath: "api",
    baseQuery: (0,react_namespaceObject.fetchBaseQuery)({
        baseUrl: "http://localhost:3000/api"
    }),
    endpoints: (builder)=>({})
});

// EXTERNAL MODULE: ./src/features/filter/filterSlice.js
var filterSlice = __webpack_require__(8289);
// EXTERNAL MODULE: ./src/features/properties/propertiesSlice.js
var propertiesSlice = __webpack_require__(7194);
;// CONCATENATED MODULE: ./src/app/store.js





const store = (0,toolkit_.configureStore)({
    reducer: {
        [api.reducerPath]: api.reducer,
        properties: propertiesSlice/* default */.ZP,
        filter: filterSlice/* default */.ZP,
        agent: agent_agentSlice
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(api.middleware)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: ./src/components/common/ScrollTop.jsx


function ScrollToTop() {
    const [isVisible, setIsVisible] = (0,external_react_.useState)(false);
    // Top: 0 takes us all the way back to the top of the page
    // Behavior: smooth keeps it smooth!
    const scrollToTop = ()=>{
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    (0,external_react_.useEffect)(()=>{
        // Button is displayed after scrolling for 500 pixels
        const toggleVisibility = ()=>{
            if (window.pageYOffset > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener("scroll", toggleVisibility);
        return ()=>window.removeEventListener("scroll", toggleVisibility);
    }, []);
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: isVisible && /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "scrollToHome",
                onClick: scrollToTop,
                children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                    className: "flaticon-arrows"
                })
            })
        })
    });
}

// EXTERNAL MODULE: ./src/components/common/seo.js
var seo = __webpack_require__(9058);
// EXTERNAL MODULE: ./src/index.scss
var src = __webpack_require__(6124);
;// CONCATENATED MODULE: ./src/pages/_app.js






if (false) {}
function MyApp({ Component , pageProps  }) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(seo/* default */.Z, {
                font: "https://fonts.googleapis.com/css?family=Nunito:400,400i,500,600,700&display=swap"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(external_react_redux_.Provider, {
                store: store,
                children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                    ...pageProps
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(ScrollToTop, {})
        ]
    });
}
/* harmony default export */ const _app = (MyApp);


/***/ }),

/***/ 6124:
/***/ (() => {



/***/ }),

/***/ 5184:
/***/ ((module) => {

"use strict";
module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ 968:
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 6022:
/***/ ((module) => {

"use strict";
module.exports = require("react-redux");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [9058,3937], () => (__webpack_exec__(2118)));
module.exports = __webpack_exports__;

})();