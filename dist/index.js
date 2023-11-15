"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cli_color_1 = __importDefault(require("cli-color"));
require("express-async-errors");
//
const rate_config_1 = __importDefault(require("./config/rate.config"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const project_routes_1 = __importDefault(require("./routes/project.routes"));
//For env File
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const routeNotFound_middleware_1 = __importDefault(require("./middleware/routeNotFound.middleware"));
const path_1 = __importDefault(require("path"));
// use middlewares
app.use(rate_config_1.default);
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
//
app.use(express_1.default.static("./src/public"));
app.use(express_1.default.json({}));
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.status(200).sendFile(path_1.default.join(__dirname, "../src/public/frontend/dist/index.html"));
});
app.use("/auth", auth_routes_1.default);
app.use("/projects", project_routes_1.default);
app.use(error_middleware_1.default);
app.use(routeNotFound_middleware_1.default);
// launch server
app.listen(PORT, () => {
    console.log(cli_color_1.default.bgGreen.black.italic(` Sever is live at ${PORT} ...`));
});
exports.default = app;
