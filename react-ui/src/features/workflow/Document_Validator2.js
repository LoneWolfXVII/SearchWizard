import GeneratorIcon from "../../assets/generator.svg";
// import UploadIcon from "../../assets/upload.svg";
import "./Document_Validator.css";

const DocumentValidator2 = () => {
  return (
    <div className="Doucument_validator">
      <h1 className="p-3 text-center">Document validator</h1>
      <div className="bg-white">
        <div className="flex items-center mt-10 mr-5 p-9">
          {/* First Horizontal Line */}
          <div className="flex-1 border-t border-black"></div>

          {/* Text in the Middle */}
          <div className="mx-4">
            <p className="text-center text-black">Validate agreements</p>
          </div>

          {/* Second Horizontal Line */}
          <div className="flex-1 border-t border-black"></div>
        </div>

        {/* Second part */}
        <div className="Upload_Icon">{/* <img src={UploadIcon} alt="" className="shadow-lg" /> */}</div>

        {/* Check box items */}
        <div className="p-11">
          <div className="flex items-center space-x-2 leftside">
            {/* <!-- Checkbox --> */}
            <input type="checkbox" className="w-5 h-5 text-blue-500 form-checkbox" checked />
            <div className="flex flex-col">
              <span className="text-gray-500">Show dicrepancies </span>
            </div>

            <div className="flex items-center space-x-2 Rightside">
              <input type="checkbox" className="w-5 h-5 text-blue-500 form-checkbox" checked />
              <div className="flex flex-col">
                <span className="text-gray-500">Download Report</span>
              </div>
            </div>
          </div>
        </div>

        {/* Button */}
        <button className="flex items-center justify-center p-4 text-white bg-blue-500 rounded-md">
          <img src={GeneratorIcon} alt="" />
          <span className="mx-2 mr-2">Request New</span>
        </button>

        {/* Tables Items start from here */}

        <table className="h-5 p-10 mt-10 mb-8 text-center bg-white border border-gray-300">
          <thead>
            <tr className="bg-slate-400">
              <th className="px-4 py-2 border-b">CustomerName</th>
              <th className="px-4 py-2 border-b">CustomerNumber</th>
              <th className="px-4 py-2 border-b">TotalPayments</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- Rows --> */}
            <tr className="text-black bg-white">
              <td className="px-4 py-2 border-b">Euro+Shopping Channel</td>
              <td className="px-4 py-2 border-b">141</td>
              <td className="px-4 py-2 border-b">715738.98</td>
            </tr>

            {/* <!-- Rows --> */}
            <tr className="text-black bg-white">
              <td className="px-4 py-2 border-b">Mini Gifts Distributors Ltd.</td>
              <td className="px-4 py-2 border-b">124</td>
              <td className="px-4 py-2 border-b">584188.24</td>
            </tr>

            {/* <!-- Rows --> */}
            <tr className="text-black bg-white">
              <td className="px-4 py-2 border-b">Australian Collctors.Co.</td>
              <td className="px-4 py-2 border-b">114</td>
              <td className="px-4 py-2 border-b">180585.07</td>
            </tr>

            {/* <!-- Rows --> */}
            <tr className="text-black bg-white">
              <td className="px-4 py-2 border-b">Muscle Machine Inc</td>
              <td className="px-4 py-2 border-b">151</td>
              <td className="px-4 py-2 border-b">177913.95</td>
            </tr>
            {/* <!-- Rows --> */}
            <tr className="text-black bg-white">
              <td className="px-4 py-2 border-b">Dragon Souveniers.Ltd.</td>
              <td className="px-4 py-2 border-b">141</td>
              <td className="px-4 py-2 border-b">156251.03</td>
            </tr>
            {/* <!-- Rows --> */}
            <tr className="text-black bg-white">
              <td className="px-4 py-2 border-b">Down Under Souveniers.inc</td>
              <td className="px-4 py-2 border-b">323</td>
              <td className="px-4 py-2 border-b">154622.08</td>
            </tr>
            {/* <!-- Rows --> */}
            <tr className="text-black bg-white">
              <td className="px-4 py-2 border-b">Av Stores. Co.</td>
              <td className="px-4 py-2 border-b">187</td>
              <td className="px-4 py-2 border-b">148410.09</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* PAGINATION START FROM HERE */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
        <div className="flex justify-between flex-1 sm:hidden">
          <a
            href="#"
            className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="#"
            className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing
              <span className="font-medium"> 1</span>-<span className="font-medium">50</span>
              of
              <span className="font-medium">98</span>
              results
            </p>
          </div>
          <div>
            <nav className="inline-flex -space-x-px rounded-md shadow-sm isolate" aria-label="Pagination">
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 text-gray-400 rounded-l-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              ></a>
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 text-gray-400 rounded-r-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentValidator2;
