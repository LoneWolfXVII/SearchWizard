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
import axios from "axios";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("brand", {
    cell: (info) => info.getValue(),
    header: () => "Brand",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("Category", {
    cell: (info) => info.getValue(),
    header: () => "Category",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("Agreement_TOT", {
    cell: (info) => info.getValue(),
    header: () => "Agreement TOT",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("Sub_Category", {
    cell: (info) => info.getValue(),
    header: () => "Category",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("Material_Group", {
    cell: (info) => info.getValue(),
    header: () => "Material Group",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("Matched_Value", {
    cell: (info) => (info.getValue() ? "Matched" : "-"),
    header: () => "Matched",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("Not_Matched_Value", {
    cell: (info) => (info.getValue() ? "Not Matched" : "-"),
    header: () => "Not Matched",
    footer: (info) => info.column.id,
  }),
];

const DocumentValidator = () => {
  const [fileList, setFileList] = useState([]);
  const [merchantId, setMerchantId] = useState(""); // State for merchant ID
  const [showTable, setShowTable] = useState(false);
  const [taskId, setTaskId] = useState(""); // State for task ID
  const [isProcessing, setIsProcessing] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [card, setCard] = useState({});

  function fileUploadHandler(fileData) {
    setFileList(fileData || []);
    // call api here

    setIsProcessing(true);
    let data = new FormData();
    data.append("agreement", fileData[0]);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://3.111.174.29:8080/titan/agreement_tot_match",
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setTaskId(response?.data?.task_id);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  }

  const generateReportHandler = async () => {
    if (!merchantId) {
      alert("Please fill all the fields.");
      return;
    }

    // const formData = new FormData();
    // formData.append("merch_id", merchantId);
    // formData.append("doc_type", fileList[0].type);
    // formData.append("file", fileList[0], fileList[0].name);

    // const requestOptions = {
    //   method: "POST",
    //   body: formData,
    //   redirect: "follow",
    // };

    try {
      // const response = await fetch(`${API_BASE_URL}/upload_to_s3`, requestOptions);

      // if (!response?.ok) throw new Error();

      // const result = await response.json();

      // callBackendAPI(result.url, fileList[0].type);

      setIsProcessing(true);
      let data = JSON.stringify({
        task_id: taskId,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://3.111.174.29:8080/titan/get_agreement_tot_data",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setShowTable(true);
          // set table data here.
          setTableData(convertBrandsData(response.data?.Brand_TOT));
          setCard({
            client: response?.data?.Client,
            agreement: response?.data?.Agreement_Type,
            master: response?.data?.Agreement_Type_in_master_data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      alert("Unable to process file upload");
    } finally {
      setIsProcessing(false);
    }
  };

  // const callBackendAPI = async (fileUrl, docType) => {
  //   const formData = new FormData();
  //   // formData.append("merch_id", merchantId);
  //   formData.append("doc_type", docType);
  //   formData.append("doc_img", fileUrl);

  //   // console.log(`Sending request to backend with Merchant ID: ${merchantId}, Document Type: ${docType}, File Url: ${fileUrl}`);
  //   const requestOptions = {
  //     method: "POST",
  //     body: formData,
  //     redirect: "follow",
  //   };

  //   fetch(`${API_BASE_URL}/paytm/update_merchant_data`, requestOptions)
  //     .then((response) => response.text())
  //     .then(() => {
  //       setShowTable(true);
  //     })
  //     .catch((error) => {
  //       console.log("API Error:", error);
  //     });
  // };

  function convertBrandsData(brandDataFromBackend) {
    const brands = Object.keys(brandDataFromBackend);
    const arrayOfObjects = brands.reduce((result, brand) => {
      const brandData = brandDataFromBackend[brand];

      // Extract material group information
      const matchedMaterialGroups = brandData.Material_Group_TOT.matched || {};
      const notMatchedMaterialGroups = brandData.Material_Group_TOT.not_matched || {};

      // Create separate objects for matched values
      const matchedObjects = Object.keys(matchedMaterialGroups).map((matchedKey) => ({
        brand,
        Agreement_TOT: brandData.Agreement_TOT,
        Category: brandData.Category,
        Sub_Category: brandData["Sub Category"],
        Material_Group: matchedKey,
        Matched_Value: matchedMaterialGroups[matchedKey],
      }));

      // Create separate objects for not matched values
      const notMatchedObjects = Object.keys(notMatchedMaterialGroups).map((notMatchedKey) => ({
        brand,
        Agreement_TOT: brandData.Agreement_TOT,
        Category: brandData.Category,
        Sub_Category: brandData["Sub Category"],
        Material_Group: notMatchedKey,
        Not_Matched_Value: notMatchedMaterialGroups[notMatchedKey],
      }));

      // Concatenate the matched and not matched objects to the result array
      return result.concat(matchedObjects, notMatchedObjects);
    }, []);

    return arrayOfObjects;
  }

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
          <section className="flex items-center px-24 justify-evenly">
            <div className="flex justify-center w-6/12">
              <MerchantId onChange={handleMerchantIdChange} />
            </div>
            <main className="flex items-center justify-center w-6/12 gap-20 px-2 py-5 h-28 ">
              <UploadAutomation fileList={fileList} setFileList={setFileList} getUploadFiles={fileUploadHandler} disabled={false} />
            </main>
          </section>

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
          {!showTable && (
            <button
              disabled={!!isProcessing}
              onClick={generateReportHandler}
              className="flex items-center justify-center p-4 text-white bg-blue-500 rounded-md"
            >
              <img src={GeneratorIcon} alt="generator" />
              <span className="mx-2 mr-2">{!!isProcessing ? "Processing" : "Generate report"}</span>
            </button>
          )}

          {!!showTable && (
            <button
              disabled={!!isProcessing}
              onClick={() => {
                setShowTable(false);
                setIsProcessing(false);
                setFileList([]);
                setTableData([]);
                setCard({});
              }}
              className="flex items-center justify-center p-4 text-white bg-blue-500 rounded-md"
            >
              <img src={GeneratorIcon} alt="generator" />
              <span className="mx-2 mr-2">Request New</span>
            </button>
          )}

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
            <section className="px-0 py-10">
              <header className="flex flex-wrap py-6 justify-evenly">
                <div className="p-6 font-bold bg-purple-100 border border-purple-500 border-solid rounded-lg shadow-md">
                  Client: <span className="font-medium">{card?.client || ""}</span>
                </div>
                <div className="p-6 font-bold bg-purple-100 border border-purple-500 border-solid rounded-lg shadow-md">
                  Agreement Store type : <span className="font-medium">{card?.agreement || ""}</span>
                </div>
                <div className="p-6 font-bold bg-purple-100 border border-purple-500 border-solid rounded-lg shadow-md">
                  Master Store Type: <span className="font-medium">{card?.master || ""}</span>
                </div>
              </header>

              <Table columns={columns} data={tableData || []} />
            </section>
          )}
        </div>
      </section>
    </div>
  );
};

export default DocumentValidator;
