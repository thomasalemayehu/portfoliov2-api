"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Button_module_css_1 = __importDefault(require("../assets/styles/component/Button.module.css"));
function Button({ label, callback }) {
    return (<button className={Button_module_css_1.default.button} onClick={() => {
            callback();
        }}>
      {label}
    </button>);
}
exports.default = Button;
