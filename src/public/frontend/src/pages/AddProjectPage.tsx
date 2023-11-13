import { useState } from "react";
import addProjectStyles from "../assets/styles/AddProject.module.css";
import Button from "../components/Button";
import axios from "axios";
// import axios from "axios";
import FormData from "form-data"
function AddProjectPage() {
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
            // e.preventDefault();
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
            )
              return;

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
            formData.forEach((key,value)=>{
              console.log(key,value)
            })

            try {
              const response = await axios.post(
                "http://localhost:3000/projects/",
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              );

              console.log(response.data);
            } catch (error) {
              console.error("Error:", error);
            }
            // // const projectInfo: ProjectInfo = {
            // //   title: titleInput.value,
            // //   description: descriptionInput.value,
            // //   techStack: techStackInput.value.split(","),
            // //   githubLink: githubLinkInput.value,
            // //   liveLink: liveLinkInput.value,
            // //   projectType: projectType.value as "Main" | "Side",
            // //   leadImage: leadImage?.file,
            // //   selectedImages: selectedImages.map((image) => image.file),
            // // };

            // // Create a new FormData object
            // e.prev;

            // // Append form fields to the FormData object

            // // Define the URL of your API endpoint
            // const apiUrl = "http://localhost:3000";

            // // Send the form data with the Fetch API
            // fetch(apiUrl, {
            //   method: "POST",
            //   body: formData,
            // })
            //   .then((response) => {
            //     if (!response.ok) {
            //       throw new Error("Network response was not ok");
            //     }
            //     return response.json(); // Parse the response as JSON
            //   })
            //   .then((data) => {
            //     // Handle the response data from the server
            //     console.log(data);
            //   })
            //   .catch((error) => {
            //     // Handle any errors that may occur during the request
            //     console.error(error);
            //   });
          }}
        />
      </div>
    </div>
  );
}

// function convertToFormData(projectInfo: ProjectInfo): FormData {
//   const formData = new FormData();

//   formData.append("title", projectInfo.title);
//   formData.append("description", projectInfo.description);
//   formData.append("projectType", projectInfo.projectType);
//   formData.append("githubLink", projectInfo.githubLink);
//   formData.append("liveLink", projectInfo.liveLink);
//   projectInfo.selectedImages?.forEach((image) => {
//     formData.append("selectedImages", image);
//   });
//   projectInfo.techStack.forEach((techStack) => {
//     formData.append("techStack", techStack);
//   });
//   // formData.append("techStack", projectInfo.techStack);

//   return formData;
// }

interface FileWithPreview {
  file: File;
  preview: string;
}

interface ImagePreviewInfo {
  imagePath: string;
  altText: string;
}

// interface ProjectInfo {
//   title: string;
//   description: string;
//   techStack: string[];
//   githubLink: string;
//   liveLink: string;
//   leadImage?: File;
//   selectedImages?: File[];
//   projectType: "Main" | "Side";
// }

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
