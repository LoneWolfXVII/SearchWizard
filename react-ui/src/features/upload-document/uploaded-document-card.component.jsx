import axios from "axios";
import { useEffect, useState } from "react";

function DashboardCard({
  iconSrc,
  iconAlt,
  title,
  percentage,
  analysisSrc,
  analysisAlt,
}) {
  return (
    <div className="w-full">
      <div className="flex items-center self-stretch justify-between w-full gap-5 text-xl leading-8 whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
        <div className="flex gap-2.5 justify-between">
          <img
            loading="lazy"
            src={iconSrc}
            alt={iconAlt}
            className="aspect-square w-[46px]"
          />
          <div className="my-auto font-bold grow">{title}</div>
        </div>
        <div className="flex items-center gap-1 font-bold">
          {percentage}
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2fd70d97c98800bdc9e588d7a6304ab2d93f418dcd8d72495e7a28742fe867ee?apiKey=31468f0b56654704a0c955257a9b20f9&"
            alt="dropdown"
          />
        </div>
      </div>
      <div class="w-full  rounded-full h-1 my-2  dark:bg-gray-700">
        <div class="bg-green-400 h-1 rounded-full" style={{ width: "100%" }} />
      </div>
    </div>
  );
}

function Question({ item }) {
  return (
    <div className="mt-5 ml-14 whitespace-nowrap max-md:ml-2.5">{item}</div>
  );
}

export function UploadedDocumentCard({ handelDBSelect }) {
  const [dbList, setDBList] = useState([]);
  const [selectedDB, setSelectedDB] = useState("");

  const dbImg =
    "https://cdn.builder.io/api/v1/image/assets/TEMP/4c1ce435746b626ca7b8b4ffc1a1708671b633525b202bd1811116d23e15ee2d?apiKey=31468f0b56654704a0c955257a9b20f9&";

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://api.irame.ai/knowledge-graph/kg/kg/get_datasource",
      headers: {
        accept: "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        setDBList(response?.data || []);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleDbSelect(item) {
    setSelectedDB(item);
    handelDBSelect(item);
  }

  return (
    <>
      {dbList?.map((item) => (
        <div className="flex items-center gap-2 text-sm font-semibold leading-7 flex-nowrap">
          <div
            className={` ${selectedDB === item ? "bg-green-500 border-[4px]" : "bg-white"} border border-black border-solid h-[20px] rounded-[90px] w-[20px]`}
            onClick={() => handleDbSelect(item)}
          />
          <div className="flex items-center flex-1 gap-5  px-5 py-4 bg-white rounded-xl border-solid border-[0.5px] border-neutral-400 max-md:max-w-full">
            <img src={dbImg} alt="db" width={16} height={16} />
            {item}
          </div>
        </div>
      ))}
    </>
  );
}
