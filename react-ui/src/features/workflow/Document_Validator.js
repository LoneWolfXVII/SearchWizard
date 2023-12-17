import NavIcon from "../../assets/burger.svg";
import ExtractionIcon from "../../assets/extraction.svg";
import GeneratorIcon from "../../assets/generator.svg";
import Table from "../../components/ui/Table";
// import UploadIcon from "../../assets/upload.png";
import { createColumnHelper } from "@tanstack/react-table";
import { Checkbox } from "../../components/ui/checkbox";
import "./Document_Validator.css";
import UploadAutomation from "./UploadAutomation";
import { useState } from "react";
import { API_BASE_URL } from "../../constants";
import MerchantId from "../../DVMerchantID";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("CustomerName", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("CustomerNumber", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("TotalPayments", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
];

const DocumentValidator = () => {
  const [fileList, setFileList] = useState([]);
  const [merchantId, setMerchantId] = useState(""); // State for merchant ID
  const [showTable, setShowTable] = useState(false);

  function fileUploadHandler(data) {
    setFileList(data || []);
  }

  const generateReportHandler = async () => {
    if (!merchantId) {
      alert("Please fill all the fields.");
      return;
    }

    const formData = new FormData();
    formData.append("merch_id", merchantId);
    formData.append("doc_type", fileList[0].type);
    formData.append("file", fileList[0], fileList[0].name);

    const requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${API_BASE_URL}/upload_to_s3`, requestOptions);

      if (!response?.ok) throw new Error();

      const result = await response.json();

      callBackendAPI(result.url, fileList[0].type);
    } catch (error) {
      alert("Unable to process file upload");
    }
  };

  const callBackendAPI = async (fileUrl, docType) => {
    const formData = new FormData();
    // formData.append("merch_id", merchantId);
    formData.append("doc_type", docType);
    formData.append("doc_img", fileUrl);

    // console.log(`Sending request to backend with Merchant ID: ${merchantId}, Document Type: ${docType}, File Url: ${fileUrl}`);
    const requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow",
    };

    fetch(`${API_BASE_URL}/paytm/update_merchant_data`, requestOptions)
      .then((response) => response.text())
      .then(() => {
        setShowTable(true);
      })
      .catch((error) => {
        console.log("API Error:", error);
      });
  };

  const handleMerchantIdChange = (id) => {
    setMerchantId(id);
  };

  return (
    <div className="flex flex-col w-full gap-10 bg-[#F6F7FB] px-32 min-h-screen">
      <section className="px-8 py-8 my-6 bg-white rounded-sm">
        <h1 className="p-3 text-center">Document validator</h1>

        <div className="bg-white">
          <div className="flex items-center mt-10 mr-5 p-9">
            {/* First Horizontal Line */}
            <div className="flex-1 border-t border-black"></div>

            {/* Text in the Middle */}
            <div className="mx-4">
              <p className="font-semibold text-center text-black uppercase">Validate agreements</p>
            </div>

            {/* Second Horizontal Line */}
            <div className="flex-1 border-t border-black"></div>
          </div>

          {/* Second part */}
          <div className="flex justify-center">
            <MerchantId onChange={handleMerchantIdChange} />
          </div>
          <main className="flex items-center justify-center w-full gap-20 px-2 py-5 h-28 ">
            <UploadAutomation fileList={fileList} setFileList={setFileList} getUploadFiles={fileUploadHandler} disabled={false} />
          </main>

          {/* Check box items */}
          <div className="p-11">
            <div className="flex items-center space-x-2 leftside">
              <Checkbox />
              <p className="text-gray-500">Show dicrepancies</p>

              <div className="flex items-center space-x-2 Rightside">
                <Checkbox />
                <p className="text-gray-500">Download Report</p>
              </div>
            </div>
          </div>

          {/* Button */}
          <button onClick={generateReportHandler} className="flex items-center justify-center p-4 text-white bg-blue-500 rounded-md">
            <img src={GeneratorIcon} alt="generator" />
            <span className="mx-2 mr-2">Generate report</span>
          </button>

          {/* Table */}
          {!showTable && (
            <div className=" mt-11 p-11 bg-dark">
              <h2 className="p-3 font-bold text-center text-black">INTEGRATED DATASOURCE</h2>
              {/* <!-- First Row --> */}
              <div className="flex justify-between mt-2 mb-4">
                <div className="flex w-1/3 border shadow-md ">
                  <div className="flex items-center justify-end w-full gap-2 px-2">
                    <p className="text-black">File1</p>
                    <img src={NavIcon} alt="nav" width={30} />
                  </div>
                </div>
                <div className="flex items-center w-1/3 gap-2 p-2 border shadow-md ">
                  <p className="text-left text-black">File1</p>
                  <img src={NavIcon} alt="nav" width={30} />
                </div>
              </div>

              {/* For Image */}
              <div className="ExtractionIcon">
                <img src={ExtractionIcon} alt="nav" />
              </div>

              {/* <!-- second Row --> */}
              <div class="flex justify-between mb-4 mt-2">
                <div className="flex items-center justify-end w-1/3 gap-2 p-2 border shadow-md">
                  <p className="text-right text-black">File1</p>
                  <img src={NavIcon} alt="nav" width={30} />
                </div>
                <div className="flex items-center justify-start w-1/3 gap-2 p-2 border shadow-md">
                  <p className="text-left text-black">File1</p>
                  <img src={NavIcon} alt="nav" width={30} />
                </div>
              </div>
            </div>
          )}

          {!!showTable && (
            <section className="px-0">
              <Table columns={columns} data={tableDummyData} />
            </section>
          )}
        </div>
      </section>
    </div>
  );
};

const tableDummyData = [
  {
    CustomerName: "Euro+Shopping Channel",
    CustomerNumber: 141,
    TotalPayments: 715738.98,
  },
  {
    CustomerName: "Mini Gifts Distributors Ltd.",
    CustomerNumber: 124,
    TotalPayments: 584188.24,
  },
  {
    CustomerName: "Australian Collctors.Co.",
    CustomerNumber: 114,
    TotalPayments: 180585.07,
  },
  {
    CustomerName: "Muscle Machine Inc",
    CustomerNumber: 151,
    TotalPayments: 177913.95,
  },
  {
    CustomerName: "Dragon Souveniers.Ltd.",
    CustomerNumber: 141,
    TotalPayments: 156251.03,
  },
  {
    CustomerName: "Down Under Souveniers.inc",
    CustomerNumber: 323,
    TotalPayments: 154622.08,
  },
  {
    CustomerName: "Av Stores. Co.",
    CustomerNumber: 187,
    TotalPayments: 148410.09,
  },
];

export default DocumentValidator;
