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
const AddProject_module_css_1 = __importDefault(require("../assets/styles/AddProject.module.css"));
const Button_1 = __importDefault(require("../components/Button"));
const axios_1 = __importDefault(require("axios"));
const react_toastify_1 = require("react-toastify");
const react_router_dom_1 = require("react-router-dom");
const hooks_1 = require("../hooks");
function AddProjectPage() {
    const [user] = (0, hooks_1.useStorage)("userInfo", {});
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        if (!user || !user.token) {
            navigate("/login");
        }
    }, [user, navigate]);
    const [leadImage, setLeadImage] = (0, react_1.useState)(null);
    const [selectedImages, setSelectedImages] = (0, react_1.useState)([]);
    const handleLeadImageChange = (e) => {
        if (e.target.files) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setLeadImage({ file: file, preview: reader.result });
            };
        }
    };
    const handleImageChange = (e) => {
        const allFiles = e.target.files;
        if (!allFiles)
            return;
        const allFilesWithPreview = [];
        const readFileAsDataURL = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    resolve(reader.result);
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        };
        const processFiles = () => __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < allFiles.length; i++) {
                if (e.target.files && e.target.files[i]) {
                    const file = e.target.files[i];
                    const preview = yield readFileAsDataURL(file);
                    allFilesWithPreview.push({
                        file: file,
                        preview: preview,
                    });
                }
            }
            setSelectedImages([...selectedImages, ...allFilesWithPreview]);
        });
        processFiles();
    };
    return (<div className={AddProject_module_css_1.default.container}>
      <div className={AddProject_module_css_1.default.left__container}>
        <h1>Project Information</h1>
        <input type="text" id="title" name="title" placeholder="Project Title"/>
        <input type="text" id="description" name="description" placeholder="Project Description"/>
        <input type="text" id="techStack" name="techStack" placeholder="Tech Stack ( Comma Separated Values )"/>
        <input type="file" id="leadImage" name="leadImage" accept="image/*" onChange={handleLeadImageChange}/>
        {leadImage ? (<div className={AddProject_module_css_1.default.image__preview__wrapper}>
            <ImagePreview imagePath={leadImage.preview} altText={leadImage.file.name}/>
          </div>) : (<></>)}
      </div>
      <div className={AddProject_module_css_1.default.right__container}>
        <input type="file" onChange={handleImageChange} id="images" accept="image/*" multiple name="images"/>

        <div className={AddProject_module_css_1.default.multiple__image__preview}>
          {selectedImages.map((selectedImage) => (<div className={AddProject_module_css_1.default.multiple__image__view}>
              <ImagePreview imagePath={selectedImage.preview} altText={selectedImage.file.name}/>
            </div>))}
        </div>

        <input type="text" id="githubLink" name="githubLink" placeholder="Github Link"/>

        <input type="text" id="liveLink" name="liveLink" placeholder="Live Link"/>

        <select name="projectType" id="projectType">
          <option value="Main">Main Project</option>
          <option value="Side">Side Project</option>
        </select>

        <div className={AddProject_module_css_1.default.spacer}></div>
        <Button_1.default label="Save" callback={() => __awaiter(this, void 0, void 0, function* () {
            const titleInput = document.getElementById("title");
            const descriptionInput = document.getElementById("description");
            const techStackInput = document.getElementById("techStack");
            const githubLinkInput = document.getElementById("githubLink");
            const liveLinkInput = document.getElementById("liveLink");
            const projectType = document.getElementById("projectType");
            if (!titleInput ||
                !descriptionInput ||
                !techStackInput ||
                !githubLinkInput ||
                !liveLinkInput ||
                !projectType) {
                (0, react_toastify_1.toast)("Please fill out info");
                return;
            }
            const formData = new FormData();
            formData.append("title", titleInput.value);
            formData.append("description", descriptionInput.value);
            formData.append("techStack", techStackInput.value);
            formData.append("githubLink", githubLinkInput.value);
            formData.append("liveLink", liveLinkInput.value);
            formData.append("projectType", projectType.value);
            formData.append("leadImage", leadImage === null || leadImage === void 0 ? void 0 : leadImage.file);
            selectedImages.forEach((image) => formData.append("selectedImages", image.file));
            try {
                const response = yield axios_1.default.post("http://localhost:3000/projects/", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${user.token}`
                    },
                });
                if (response.status === 201) {
                    titleInput.value = "";
                    descriptionInput.value = "";
                    techStackInput.value = "";
                    githubLinkInput.value = "";
                    liveLinkInput.value = "";
                    projectType.value = "";
                    setLeadImage(null);
                    setSelectedImages([]);
                    react_toastify_1.toast.success("Project Added Successfully", {
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
            catch (error) {
                react_toastify_1.toast.error("Could not add Added Successfully", {
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
        })}/>
      </div>
    </div>);
}
function ImagePreview({ imagePath, altText }) {
    return (<img className={AddProject_module_css_1.default.image__preview} src={imagePath} alt={altText}/>);
}
exports.default = AddProjectPage;
