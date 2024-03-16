import useLocalStorage from "@/hooks/useLocalStorage";
import { welcomeTypography } from "./config";
import { Switch } from "@/components/ui/switch";
import UploadInput from "./UploadInput";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const NewChat = () => {
  const [value] = useLocalStorage("userDetails");
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);

  const [completedSteps, setCompletedSteps] = useState([1]);

  const gradientText = {
    backgroundImage:
      "linear-gradient(270deg, rgba(106, 18, 205, 0.4), rgba(106, 18, 205, 0.8))",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
  };

  const showProgress = (itemCurrent) => {
    try {
      let tempCssClass = ``;
      if (completedSteps?.includes(itemCurrent)) {
        tempCssClass += `bg-purple-100 cursor-pointer`;
        return tempCssClass;
      } else {
        // if (
        //   itemCurrent?.key === step ||
        //   itemCurrent?.myStep === formProgressAndComponentMapping[step]
        // ) {
        //   tempCssClass += `bg-purple-16 cursor-pointer`;
        // } else if (itemCurrent?.myStep <= isStepCompleted?.current) {
        //   tempCssClass += `bg-purple-100 cursor-pointer`;
        // } else {
        //   tempCssClass += `bg-blue-16`;
        // }
        tempCssClass += `bg-purple-16`;
        return tempCssClass;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileUpload = (files) => {
    // Simulating file upload with setTimeout
    let totalSize = 0;
    files.forEach((file) => {
      totalSize += file.size;
    });
    let uploadedSize = 0;
    files.forEach((file) => {
      setTimeout(() => {
        uploadedSize += file.size;
        const progressPercentage = (uploadedSize / totalSize) * 100;
        setProgress(parseInt(progressPercentage));
      }, 3000);
    });
  };

  const handleNextStep = (step) => {
    setCompletedSteps([...completedSteps, step]);
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center !w-[51.875rem]">
        <div className="align-left w-full">
          <h1
            className="text-5xl font-semibold align-left"
            style={gradientText}
          >{`${welcomeTypography?.headingLine1} ${value.userName}`}</h1>
          <h1 className="text-5xl font-semibold text-purple-20">
            {welcomeTypography?.headingLine2}
          </h1>
          <ul className="relative mt-6 mb-3 inline-flex gap-2">
            {[1, 2, 3]?.map((items, indx) => {
              return (
                <>
                  <li
                    key={indx}
                    className={[
                      `h-2 w-14 rounded-3xl `,
                      showProgress(items),
                    ].join(" ")}
                    onClick={() => {}}
                  ></li>
                </>
              );
            })}
          </ul>
        </div>
        <div className="mt-[7.2rem] flex flex-col gap-4 w-full ">
          <UploadInput
            onFileUpload={handleFileUpload}
            files={files}
            setFiles={setFiles}
            progress={progress}
          />
          <div className="flex justify-between">
            <span className="bg-purple-4 rounded-[100px] py-3 px-5 flex items-center gap-2 max-w-[13.2rem]">
              <p className="text-purpleDark text-sm">
                {welcomeTypography?.demoDataLabel}
              </p>
              <Switch className="h-5 w-9" />
            </span>
            {progress === 100.0 ? (
              <Button onClick={() => handleNextStep(2)} className="rounded-[100px] h-11 hover:text-white hover:bg-purple100 hover:opacity-80">Continue</Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewChat;
