"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Login_module_css_1 = __importDefault(require("../assets/styles/Login.module.css"));
const react_toastify_1 = require("react-toastify");
const axios_1 = __importDefault(require("axios"));
const index_1 = require("../hooks/index");
const react_router_dom_1 = require("react-router-dom");
function Login() {
    const [user] = (0, index_1.useStorage)("userInfo", {});
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        if (user && user.token) {
            navigate("/project");
        }
    }, [user, navigate]);
    const userNameRef = (0, react_1.useRef)(null);
    const passwordRef = (0, react_1.useRef)(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_sessionStore, setStoredValue] = (0, index_1.useStorage)("userInfo", {});
    const handleSubmit = (event) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        event.preventDefault();
        const username = (_a = userNameRef.current) === null || _a === void 0 ? void 0 : _a.value;
        const password = (_b = passwordRef.current) === null || _b === void 0 ? void 0 : _b.value;
        if (!username || !password) {
            (0, react_toastify_1.toast)("Please input username and password");
            return;
        }
        try {
            const response = yield axios_1.default.post("http://localhost:3000/auth/login", {
                email: username,
                password,
            });
            if (response.status == 200) {
                setStoredValue(response.data);
                navigate("/project");
            }
            else {
                react_toastify_1.toast.error("Could not login", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        }
        catch (e) {
            (0, react_toastify_1.toast)("Could not login", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    });
    return (<div className={Login_module_css_1.default.container}>
      <div className={Login_module_css_1.default.main__card}>
        <div className={Login_module_css_1.default.left__card}>
          <img src="/img/Login-Image.svg"></img>
        </div>
        <div className={Login_module_css_1.default.right__card}>
          <h2>Welcome Back</h2>
          <p>Please enter your details</p>

          <form action="">
            <input type="email" name="email" id="email" placeholder="Email" ref={userNameRef}/>
            <input type="password" name="password" id="password" placeholder="********" ref={passwordRef}/>

            <button className={Login_module_css_1.default.login__form__submit__button} onClick={handleSubmit}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>);
}
exports.default = Login;
