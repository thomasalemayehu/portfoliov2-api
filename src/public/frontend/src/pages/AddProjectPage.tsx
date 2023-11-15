import { useEffect, useState } from "react";
import addProjectStyles from "../assets/styles/AddProject.module.css";
import Button from "../components/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useStorage } from "../hooks";
import { UserInfo } from "../types/index";

function AddProjectPage() {
  const [user] = useStorage<UserInfo>("userInfo", {});
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.token) {
      navigate("/login");
    }
  }, [user, navigate]);
  const [leadImage, setLeadImage] = useState<FileWithPreview | null>(null);

  const [selectedImages, setSelectedImages] = useState<FileWithPreview[]>([]);

  const handleLeadImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setLeadImage({ file: file, preview: reader.result as string });
      };
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const allFiles: FileList | null = e.target.files;

    if (!allFiles) return;

    const allFilesWithPreview: FileWithPreview[] = [];

    const readFileAsDataURL = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };

    const processFiles = async () => {
      for (let i = 0; i < allFiles.length; i++) {
        if (e.target.files && e.target.files[i]) {
          const file = e.target.files[i];
          const preview = await readFileAsDataURL(file);

          allFilesWithPreview.push({
            file: file,
            preview: preview,
          });
        }
      }

      setSelectedImages([...selectedImages, ...allFilesWithPreview]);
    };

    processFiles();
  };

  return (
    <div className={addProjectStyles.container}>
      <div className={addProjectStyles.left__container}>
        <h1>Project Information</h1>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Project Title"
        />
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Project Description"
        />
        <input
          type="text"
          id="techStack"
          name="techStack"
          placeholder="Tech Stack ( Comma Separated Values )"
        />
        <input
          type="file"
          id="leadImage"
          name="leadImage"
          accept="image/*"
          onChange={handleLeadImageChange}
        />
        {leadImage ? (
          <div className={addProjectStyles.image__preview__wrapper}>
            <ImagePreview
              imagePath={leadImage.preview}
              altText={leadImage.file.name}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className={addProjectStyles.right__container}>
        <input
          type="file"
          onChange={handleImageChange}
          id="images"
          accept="image/*"
          multiple
          name="images"
        />

        <div className={addProjectStyles.multiple__image__preview}>
          {selectedImages.map((selectedImage) => (
            <div className={addProjectStyles.multiple__image__view}>
              <ImagePreview
                imagePath={selectedImage.preview}
                altText={selectedImage.file.name}
              />
            </div>
          ))}
        </div>

        <input
          type="text"
          id="githubLink"
          name="githubLink"
          placeholder="Github Link"
        />

        <input
          type="text"
          id="liveLink"
          name="liveLink"
          placeholder="Live Link"
        />

        <select name="projectType" id="projectType">
          <option value="Main">Main Project</option>
          <option value="Side">Side Project</option>
        </select>

        <div className={addProjectStyles.spacer}></div>
        <Button
          label="Save"
          callback={async () => {
            const titleInput: HTMLInputElement | null = document.getElementById(
              "title"
            ) as HTMLInputElement | null;
            const descriptionInput: HTMLInputElement | null =
              document.getElementById("description") as HTMLInputElement | null;
            const techStackInput: HTMLInputElement | null =
              document.getElementById("techStack") as HTMLInputElement | null;
            const githubLinkInput: HTMLInputElement | null =
              document.getElementById("githubLink") as HTMLInputElement | null;
            const liveLinkInput: HTMLInputElement | null =
              document.getElementById("liveLink") as HTMLInputElement | null;

            const projectType: HTMLInputElement | null =
              document.getElementById("projectType") as HTMLInputElement | null;
            if (
              !titleInput ||
              !descriptionInput ||
              !techStackInput ||
              !githubLinkInput ||
              !liveLinkInput ||
              !projectType
            ) {
              toast("Please fill out info");
              return;
            }

            const formData = new FormData();
            formData.append("title", titleInput.value);
            formData.append("description", descriptionInput.value);
            formData.append("techStack", techStackInput.value);
            formData.append("githubLink", githubLinkInput.value);
            formData.append("liveLink", liveLinkInput.value);
            formData.append("projectType", projectType.value);
            formData.append("leadImage", leadImage?.file as File);
            selectedImages.forEach((image: FileWithPreview) =>
              formData.append("selectedImages", image.file as File)
            );

            try {
             
              const response = await axios.post(
                "http://localhost:3000/projects/",
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization":`Bearer ${user.token}`
                  },
                }
              );

              if (response.status === 201) {
                titleInput.value = "";
                descriptionInput.value = "";
                techStackInput.value = "";
                githubLinkInput.value = "";
                liveLinkInput.value = "";
                projectType.value = "";
                setLeadImage(null);
                setSelectedImages([]);
                toast.success("Project Added Successfully", {
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
            } catch (error) {
              toast.error("Could not add Added Successfully", {
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
          }}
        />
      </div>
    </div>
  );
}

interface FileWithPreview {
  file: File;
  preview: string;
}

interface ImagePreviewInfo {
  imagePath: string;
  altText: string;
}

function ImagePreview({ imagePath, altText }: ImagePreviewInfo) {
  return (
    <img
      className={addProjectStyles.image__preview}
      src={imagePath}
      alt={altText}
    />
  );
}
export default AddProjectPage;
