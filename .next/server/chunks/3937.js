"use strict";
exports.id = 3937;
exports.ids = [3937];
exports.modules = {

/***/ 8289:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ih": () => (/* binding */ toggleGridAndList),
/* harmony export */   "PA": () => (/* binding */ addStatusType),
/* harmony export */   "S4": () => (/* binding */ addFeatured),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export filterSlice */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);

const initialState = {
    statusType: "",
    featured: "",
    isGridOrList: false
};
const filterSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: "filter",
    initialState,
    reducers: {
        addStatusType: (state, action)=>{
            state.statusType = action.payload;
        },
        addFeatured: (state, action)=>{
            state.featured = action.payload;
        },
        toggleGridAndList: (state, action)=>{
            state.isGridOrList = action.payload;
        }
    }
});
const { addStatusType , addFeatured , toggleGridAndList  } = filterSlice.actions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (filterSlice.reducer);


/***/ }),

/***/ 7194:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "B4": () => (/* binding */ resetAmenities),
/* harmony export */   "CS": () => (/* binding */ addBedrooms),
/* harmony export */   "Dx": () => (/* binding */ addLocation),
/* harmony export */   "F6": () => (/* binding */ addAmenities),
/* harmony export */   "O8": () => (/* binding */ addStatus),
/* harmony export */   "Td": () => (/* binding */ addLength),
/* harmony export */   "UQ": () => (/* binding */ addYearBuilt),
/* harmony export */   "ZE": () => (/* binding */ addPropertyType),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "c9": () => (/* binding */ addKeyword),
/* harmony export */   "dZ": () => (/* binding */ addBathrooms),
/* harmony export */   "du": () => (/* binding */ addAreaMin),
/* harmony export */   "hi": () => (/* binding */ addAreaMax),
/* harmony export */   "ub": () => (/* binding */ addGarages),
/* harmony export */   "zB": () => (/* binding */ addPrice)
/* harmony export */ });
/* unused harmony export propertiesSlice */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);

const initialState = {
    keyword: "",
    propertyType: "",
    location: "",
    price: {
        min: 0,
        max: 0
    },
    amenities: [],
    status: "",
    bathrooms: "",
    bedrooms: "",
    garages: "",
    yearBuilt: "",
    area: {
        min: "",
        max: ""
    },
    length: 0
};
const propertiesSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: "properties",
    initialState,
    reducers: {
        addKeyword: (state, action)=>{
            state.keyword = action.payload;
        },
        addPropertyType: (state, action)=>{
            state.propertyType = action.payload;
        },
        addLocation: (state, action)=>{
            state.location = action.payload;
        },
        addPrice: (state, action)=>{
            state.price.min = action.payload.min;
            state.price.max = action.payload.max;
        },
        addAmenities: (state, action)=>{
            const isExist = state.amenities.some((item)=>item === action.payload);
            if (!isExist) {
                state.amenities.push(action.payload);
            } else {
                state.amenities = state.amenities.filter((item)=>item !== action.payload);
            }
        },
        resetAmenities: (state, action)=>{
            state.amenities = [];
        },
        addStatus: (state, action)=>{
            state.status = action.payload;
        },
        addBathrooms: (state, action)=>{
            state.bathrooms = action.payload;
        },
        addBedrooms: (state, action)=>{
            state.bathrooms = action.payload;
        },
        addGarages: (state, action)=>{
            state.garages = action.payload;
        },
        addYearBuilt: (state, action)=>{
            state.yearBuilt = action.payload;
        },
        addAreaMin: (state, action)=>{
            state.area.min = action.payload;
        },
        addAreaMax: (state, action)=>{
            state.area.max = action.payload;
        },
        addLength: (state, action)=>{
            state.length = action.payload;
        }
    }
});
const { addKeyword , addPropertyType , addLocation , addPrice , addAmenities , addStatus , addBathrooms , addBedrooms , addGarages , addYearBuilt , addAreaMin , addAreaMax , addLength , resetAmenities  } = propertiesSlice.actions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (propertiesSlice.reducer);


/***/ })

};
;