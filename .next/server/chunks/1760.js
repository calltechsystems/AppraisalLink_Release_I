"use strict";
exports.id = 1760;
exports.ids = [1760];
exports.modules = {

/***/ 3326:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ common_PopupSignInUp)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "rxjs"
var external_rxjs_ = __webpack_require__(1964);
// EXTERNAL MODULE: external "rxjs/operators"
var operators_ = __webpack_require__(5863);
;// CONCATENATED MODULE: ./src/utils/alert.service.js


const alertService = {
    onAlert,
    success,
    error,
    info,
    warn,
    alert: alert_service_alert,
    clear
};
const AlertType = {
    Success: "Success",
    Error: "Error",
    Info: "Info",
    Warning: "Warning"
};
const alertSubject = new external_rxjs_.Subject();
const defaultId = "default-alert";
// enable subscribing to alerts observable
function onAlert(id = defaultId) {
    return alertSubject.asObservable().pipe((0,operators_.filter)((x)=>x && x.id === id));
}
// convenience methods
function success(message, options) {
    alert_service_alert({
        ...options,
        type: AlertType.Success,
        message
    });
}
function error(message, options) {
    alert_service_alert({
        ...options,
        type: AlertType.Error,
        message
    });
}
function info(message, options) {
    alert_service_alert({
        ...options,
        type: AlertType.Info,
        message
    });
}
function warn(message, options) {
    alert_service_alert({
        ...options,
        type: AlertType.Warning,
        message
    });
}
// core alert method
function alert_service_alert(alert) {
    alert.id = alert.id || defaultId;
    alert.autoClose = alert.autoClose === undefined ? true : alert.autoClose;
    alertSubject.next(alert);
}
// clear alerts
function clear(id = defaultId) {
    alertSubject.next({
        id
    });
}

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(580);
;// CONCATENATED MODULE: ./src/utils/apiCalls.js
const axios = __webpack_require__(2167);
const baseUrl = "https://calltech20230809222640.azurewebsites.net";
const registerUser = async (requestBody)=>{
    const url = baseUrl + "/api/Registration/Registration";
    try {
        const response = await axios.post(url, requestBody, {
            headers: {
                // This should not be set from the client side; it's a server-side header
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3008"
            }
        });
        return response.data;
    } catch (err) {
        throw err;
    }
};
const loginUser = async (requestBody)=>{
    const url = baseUrl + "/api/Login/login";
    try {
        const response = await axios.post(url, requestBody, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (err) {
        // console.log(err);
        // return Object.keys(err); // Rethrow the error to propagate it
        throw err;
    }
};
const apiCall = {
    registerUser,
    loginUser
};

;// CONCATENATED MODULE: ./src/components/common/user-credentials/LoginSignup.jsx








const LoginSignup = ()=>{
    const route = (0,router_.useRouter)();
    const [email, setEmail] = (0,external_react_.useState)("");
    const [password, setPassword] = (0,external_react_.useState)("");
    const [cnfPassword, setCnfPassword] = (0,external_react_.useState)("");
    const [userType, setUserType] = (0,external_react_.useState)("Broker");
    const [acceptTC, setAcceptTc] = (0,external_react_.useState)(false);
    const [loginEmail, setLoginEmail] = (0,external_react_.useState)("");
    const [loginPass, setLoginPass] = (0,external_react_.useState)("");
    const [rememberMe, setRememberMe] = (0,external_react_.useState)(false);
    const [options, setOptions] = (0,external_react_.useState)({
        autoClose: false,
        keepAfterRouteChange: false
    });
    // Register form handlers
    const handleRegisterEmailChange = (event)=>{
        setEmail(event.target.value);
        console.log(email);
    };
    const handleRegisterPassChange = (event)=>{
        setPassword(event.target.value);
        console.log(password);
    };
    const handleRegisterCnfPassChange = (event)=>{
        setCnfPassword(event.target.value);
        console.log(cnfPassword);
    };
    const handleUsertypeChange = (event)=>{
        setUserType(event.target.value);
        console.log(userType);
    };
    const handleTCChange = (event)=>{
        setAcceptTc(!acceptTC);
        console.log("check status :", acceptTC);
    };
    const validateEmail = (email)=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const validatePassword = (password)=>{
        return password.length >= 8;
    };
    const validateConfirmPassword = (confirmPassword, password)=>{
        return confirmPassword === password;
    };
    const handleRegisterSubmit = (event)=>{
        event.preventDefault();
        if (!email || !password || !cnfPassword || !userType) {
            alert("Please enter all correct details");
            return;
        }
        if (!validateEmail(email)) {
            alert("Invalid Email!!");
            return;
        }
        if (password.length < 8) {
            alert("Invalid password length.");
            return;
        }
        if (password !== cnfPassword) {
            alert("Password don't match!");
            return;
        }
        if (!acceptTC) {
            alert("Please accept terms and policy.");
            return;
        }
        const registerData = apiCall.registerUser({
            "email": email,
            "password": password,
            "accountType": userType
        });
        registerData.then((response)=>{
            const loginData = apiCall.loginUser({
                "email": email,
                "password": password
            });
            loginData.then((response)=>{
                console.log(response);
                sessionStorage.setItem("FHlogindetails", JSON.stringify(response));
                sessionStorage.setItem("FHUserLoggedIn", true);
                route.push("/my-dashboard");
            }).catch((error)=>{
                // console.log("error in login",Object.keys(error),error.name,error)
                // console.log()
                if (error.response.status == 401) {
                    alert("Incorrect credentials!! Please Enter correct details");
                } else {
                    alert(error.message);
                }
            });
        }).catch((error)=>{
            if (error.response.status == 409) {
                alert("User already exist!");
            } else {
                alert(error.message);
            }
        });
    };
    // Login Form Handler
    const handleLoginEmailChange = (event)=>{
        setLoginEmail(event.target.value);
        console.log(loginEmail);
    };
    const handleLoginPassChange = (event)=>{
        setLoginPass(event.target.value);
        console.log(loginPass);
    };
    const handleLoginRememberMeChange = (event)=>{
        setRememberMe(!rememberMe);
        console.log(rememberMe);
    };
    const handleLoginSubmit = (event)=>{
        event.preventDefault();
        if (!loginEmail || !loginPass) {
            alert("Please enter all correct details");
            return;
        }
        if (!validateEmail(loginEmail)) {
            alert("Invalid Email!!");
            return;
        }
        event.preventDefault();
        const data = apiCall.loginUser({
            "email": loginEmail,
            "password": loginPass
        });
        data.then((response)=>{
            // console.log(response)
            sessionStorage.setItem("FHlogindetails", JSON.stringify(response));
            sessionStorage.setItem("FHUserLoggedIn", true);
            route.push("/my-dashboard");
        }).catch((error)=>{
            // console.log("error in login",Object.keys(error),error.name,error)
            // console.log(error)
            try {
                if (error.response.status == 401) {
                    alert("Incorrect credentials!! Please Enter correct details");
                } else {
                    alert(error.message);
                }
            } catch (err) {
                console.log(err);
                alert("Getting some error");
            }
        });
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "modal-content",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "modal-header",
                children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                    type: "button",
                    "data-bs-dismiss": "modal",
                    "aria-label": "Close",
                    className: "btn-close"
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "modal-body container pb20",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "row",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "col-lg-12",
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                                className: "sign_up_tab nav nav-tabs",
                                id: "myTab",
                                role: "tablist",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                        className: "nav-item",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                            className: "nav-link active",
                                            id: "home-tab",
                                            "data-bs-toggle": "tab",
                                            href: "#home",
                                            role: "tab",
                                            "aria-controls": "home",
                                            "aria-selected": "true",
                                            children: "Login"
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                        className: "nav-item",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                            className: "nav-link",
                                            id: "profile-tab",
                                            "data-bs-toggle": "tab",
                                            href: "#profile",
                                            role: "tab",
                                            "aria-controls": "profile",
                                            "aria-selected": "false",
                                            children: "Register"
                                        })
                                    })
                                ]
                            })
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "tab-content container",
                        id: "myTabContent",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "row mt25 tab-pane fade show active",
                                id: "home",
                                role: "tabpanel",
                                "aria-labelledby": "home-tab",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "col-lg-6 col-xl-6",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "login_thumb",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                                width: 357,
                                                height: 494,
                                                className: "img-fluid w100 h-100 cover",
                                                src: "/assets/images/resource/login.jpg",
                                                alt: "login.jpg"
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "col-lg-6 col-xl-6",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "login_form",
                                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("form", {
                                                action: "#",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                        className: "heading",
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                                                            children: "Login"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("hr", {}),
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        className: "input-group mb-2 mr-sm-2",
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                                type: "text",
                                                                className: "form-control",
                                                                id: "InputLoginEmail",
                                                                placeholder: "User Name Or Email",
                                                                value: loginEmail,
                                                                onChange: handleLoginEmailChange
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                className: "input-group-prepend",
                                                                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                    className: "input-group-text",
                                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                                                        className: "flaticon-user"
                                                                    })
                                                                })
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        className: "input-group form-group",
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                                type: "password",
                                                                className: "form-control",
                                                                id: "InputLoginPassword",
                                                                placeholder: "Password",
                                                                value: loginPass,
                                                                onChange: handleLoginPassChange
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                className: "input-group-prepend",
                                                                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                    className: "input-group-text",
                                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                                                        className: "flaticon-password"
                                                                    })
                                                                })
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        className: "form-group form-check custom-checkbox mb-3",
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                                className: "form-check-input",
                                                                type: "checkbox",
                                                                checked: rememberMe,
                                                                onChange: handleLoginRememberMeChange,
                                                                id: "remeberMe"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                                                className: "form-check-label form-check-label",
                                                                htmlFor: "remeberMe",
                                                                children: "Remember me"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                                className: "btn-fpswd float-end",
                                                                href: "#",
                                                                children: "Lost your password?"
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                        type: "submit",
                                                        className: "btn btn-log w-100 btn-thm",
                                                        onClick: handleLoginSubmit,
                                                        children: "Log In"
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                        className: "text-center",
                                                        children: [
                                                            "Dont have an account?",
                                                            " ",
                                                            /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                                className: "text-thm",
                                                                href: "#",
                                                                children: "Register"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "row mt25 tab-pane fade",
                                id: "profile",
                                role: "tabpanel",
                                "aria-labelledby": "profile-tab",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "col-lg-6 col-xl-6",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "regstr_thumb",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                                width: 357,
                                                height: 659,
                                                className: "img-fluid w100 h-100 cover",
                                                src: "/assets/images/resource/regstr.jpg",
                                                alt: "regstr.jpg"
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "col-lg-6 col-xl-6",
                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "sign_up_form",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: "heading",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                                                        children: "Register"
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("form", {
                                                    action: "#",
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("hr", {}),
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                            className: "form-group input-group  mb-3",
                                                            children: [
                                                                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                                    type: "email",
                                                                    className: "form-control",
                                                                    id: "exampleInputEmail2",
                                                                    placeholder: "Email",
                                                                    value: email,
                                                                    onChange: handleRegisterEmailChange
                                                                }),
                                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                    className: "input-group-prepend",
                                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                        className: "input-group-text",
                                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                                                            className: "fa fa-envelope-o"
                                                                        })
                                                                    })
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                            className: "form-group input-group  mb-3",
                                                            children: [
                                                                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                                    type: "password",
                                                                    className: "form-control",
                                                                    id: "exampleInputPassword2",
                                                                    placeholder: "Password",
                                                                    value: password,
                                                                    onChange: handleRegisterPassChange
                                                                }),
                                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                    className: "input-group-prepend",
                                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                        className: "input-group-text",
                                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                                                            className: "flaticon-password"
                                                                        })
                                                                    })
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                            className: "form-group input-group  mb-3",
                                                            children: [
                                                                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                                    type: "password",
                                                                    className: "form-control",
                                                                    id: "exampleInputPassword3",
                                                                    placeholder: "Re-enter password",
                                                                    value: cnfPassword,
                                                                    onChange: handleRegisterCnfPassChange
                                                                }),
                                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                    className: "input-group-prepend",
                                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                        className: "input-group-text",
                                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                                                            className: "flaticon-password"
                                                                        })
                                                                    })
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                            className: "form-group ui_kit_select_search mb-3",
                                                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("select", {
                                                                className: "form-select",
                                                                "data-live-search": "true",
                                                                "data-width": "100%",
                                                                value: userType,
                                                                onChange: handleUsertypeChange,
                                                                children: [
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                                        value: "Broker",
                                                                        "data-tokens": "Broker",
                                                                        children: "Broker"
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                                        value: "BrokerCompany",
                                                                        "data-tokens": "BrokerCompany",
                                                                        children: "Broker company"
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                                        value: "Appraiser",
                                                                        "data-tokens": "Appraiser",
                                                                        children: "Appraiser"
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                                        value: "AppraiserCompany",
                                                                        "data-tokens": "AppraiserCompany",
                                                                        children: "Appraiser Company"
                                                                    })
                                                                ]
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                            className: "form-group form-check custom-checkbox mb-3",
                                                            children: [
                                                                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                                    className: "form-check-input",
                                                                    type: "checkbox",
                                                                    checked: acceptTC,
                                                                    onChange: handleTCChange,
                                                                    id: "terms"
                                                                }),
                                                                /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                                                    className: "form-check-label form-check-label",
                                                                    htmlFor: "terms",
                                                                    children: "I have accept the Terms and Privacy Policy."
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                            type: "submit",
                                                            className: "btn btn-log w-100 btn-thm",
                                                            onClick: handleRegisterSubmit,
                                                            children: [
                                                                "Broker",
                                                                "BrokerCompany"
                                                            ].some((utype)=>userType === utype) ? "Start your free trial" : "Sign Up"
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                            className: "text-center",
                                                            children: [
                                                                "Already have an account?",
                                                                " ",
                                                                /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                                    className: "text-thm",
                                                                    href: "#",
                                                                    children: "Log In"
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const user_credentials_LoginSignup = (LoginSignup);

;// CONCATENATED MODULE: ./src/components/common/PopupSignInUp.jsx


const PopupSignInUp = ()=>{
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "sign_up_modal modal fade bd-example-modal-lg",
        tabIndex: "-1",
        role: "dialog",
        "aria-hidden": "true",
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "modal-dialog modal-dialog-centered modal-lg",
            role: "document",
            children: /*#__PURE__*/ jsx_runtime_.jsx(user_credentials_LoginSignup, {})
        })
    });
};
/* harmony default export */ const common_PopupSignInUp = (PopupSignInUp);


/***/ }),

/***/ 9314:
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);




const HeaderMenuContent = ({ float =""  })=>{
    const route = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
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
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
        id: "respMenu",
        className: "ace-responsive-menu text-end d-lg-block d-none",
        "data-menu-style": "horizontal",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                className: "last",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                    href: "/",
                    className: route.pathname === "/" ? "ui-active" : undefined,
                    children: "Home"
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                className: "last",
                children: sessionStorage.FHUserLoggedIn ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                    href: "/listing-grid",
                    className: route.pathname === "/listing-grid" ? "ui-active" : undefined,
                    children: "Listing"
                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                    href: "#",
                    "data-bs-toggle": "modal",
                    "data-bs-target": ".bd-example-modal-lg",
                    children: "Listing"
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                className: "last",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                    href: "/service",
                    className: route.pathname === "/service" ? "ui-active" : undefined,
                    children: "Services"
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                className: "last",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                    href: "/about-us",
                    className: route.pathname === "/about-us" ? "ui-active" : undefined,
                    children: "About Us"
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                className: "last",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                    href: "/contact",
                    className: route.pathname === "/contact" ? "ui-active" : undefined,
                    children: "Contact"
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                className: `list-inline-item list_s ${float}`,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                    href: "#",
                    className: "btn flaticon-user",
                    "data-bs-toggle": "modal",
                    "data-bs-target": ".bd-example-modal-lg",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: "dn-lg",
                        children: "Login/Register"
                    })
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                className: `list-inline-item add_listing ${float}`,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                    href: "/create-listing",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            className: "flaticon-plus"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            className: "dn-lg",
                            children: " Create Listing"
                        })
                    ]
                })
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HeaderMenuContent);


/***/ })

};
;