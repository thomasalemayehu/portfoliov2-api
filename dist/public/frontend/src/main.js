"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
const react_toastify_1 = require("react-toastify");
const App_1 = __importDefault(require("./App"));
require("./assets/styles/index.css");
require("react-toastify/dist/ReactToastify.css");
// App
client_1.default.createRoot(document.getElementById("root")).render(<react_1.default.StrictMode>
    <react_toastify_1.ToastContainer />
    <App_1.default />
  </react_1.default.StrictMode>);
