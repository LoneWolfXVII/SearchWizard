import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../components/ui/button";
import ArrowSvg from "./Waitlist_Assets/arow.svg";
import axios from "axios";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import { Input } from "../../components/ui/input";
import Table from "../../components/ui/Table";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("Column1", {
    header: "Column 1",
  }),
  columnHelper.accessor("Column2", {
    header: "Column 2",
  }),
  columnHelper.accessor("Column3", {
    header: "Column 3",
  }),
];

const WebView = ({ dataSourceId }) => {
  const [graphUrl, setGraphUrl] = useState("");
  const [nodes, setNodes] = useState([]);
  const [isTable, setIsTable] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [textResponse, setTextResponse] = useState("");
  const queryRef = useRef();

  const columns = [];

  const queryHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("query", queryRef.current.value);
      formData.append("datasource_id", dataSourceId);

      const res = await axios.post("http://3.111.174.29:8080/kg/query_knowledge_graph", formData);

      setIsTable(res?.data?.response === "Random Table" ? true : false);
      for (let index = 0; index < res?.data?.columnDef?.length; index++) {
        const element = res?.data?.columnDef[index];
        columns.push(
          columnHelper.accessor(element?.field, {
            header: element?.header,
          })
        );
      }
      setTableData(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timeoutId = null;
    const fetchKnowledgeGraph = async () => {
      try {
        const res = await axios.post("http://3.111.174.29:8080/kg/get_knowledge_graph", { datasource_id: dataSourceId });
        if (res?.data?.status === "In Progress") {
          // If the status is 'In Progress', wait for a while and fetch again
          timeoutId = setTimeout(fetchKnowledgeGraph, 1000); // Adjust the timeout as needed
        } else {
          // Handle other cases or set state accordingly
          console.log("Knowledge graph fetch completed:", res?.data?.status);
          setGraphUrl(res?.data?.knowledge_graph_url);
          setNodes(res?.data?.Nodes);
          clearTimeout(timeoutId);
        }
      } catch (error) {
        console.error("Error fetching knowledge graph:", error);
        clearTimeout(timeoutId);
      }
    };

    // Trigger initial fetch
    if (dataSourceId) fetchKnowledgeGraph();

    // Cleanup function if needed
    return () => {
      // Perform cleanup here, if necessary
      clearTimeout(timeoutId);
    };
  }, [dataSourceId]);

  return (
    <section className="md:h-[700px]">
      <div className="relative flex flex-col h-full gap-5 px-5 pt-3 mt-16 text-white rounded-lg" style={KnowledgeGraphStyle}>
        <div className="grid w-full h-full grid-cols-6 overflow-hidden rounded-lg">
          <iframe src={graphUrl} className="w-full h-full col-span-5 rounded-lg" />
          <div style={{ borderRadius: "1rem" }} className="flex flex-col h-full gap-4 p-3 text-white bg-black rounded-lg">
            {nodes?.map((node) => (
              <div key={node} className="px-2 py-4 border border-green-500 rounded-md">
                {node}
              </div>
            ))}
          </div>
        </div>

        <Accordion type="single" collapsible>
          <AccordionItem
            style={{ left: "25%" }}
            className="!rounded-2xl  absolute bottom-0 w-6/12 p-5 bg-gradient-to-t from-[#fff] to-[#076eff] backdrop-blur-[1px]"
            value="item-1"
          >
            <div className="flex items-center justify-between mb-2">
              {!JSON.stringify(tableData)?.length ? (
                <span className="px-3 py-2 border border-white rounded-lg"> {"Query Panel"}</span>
              ) : (
                <span className="px-3 py-2 rounded-lg">There is no character limit for short-answer questions.</span>
              )}
              <span
                onClick={() => {
                  setTableData([]);
                  setIsTable(false);
                }}
                className="cursor-pointer"
              >
                X
              </span>
            </div>

            <div className="relative flex flex-nowrap">
              <Input className="text-black" ref={queryRef} placeholder="Actual question test to be input by user" />
              <AccordionTrigger className="absolute p-0 text-white right-2">
                <Button
                  onClick={queryHandler}
                  className="p-0 m-0 transition-all duration-300 ease-linear bg-transparent hover:bg-transparent hover:scale-105"
                >
                  <img src="/uploadButton.svg" />
                </Button>
              </AccordionTrigger>
            </div>
            <AccordionContent className="p-4 mt-5 bg-white border rounded-xl">
              {isTable && <Table data={tableData} isPaginating={false} columns={columns} />}
              {!isTable && <p className="text-black">{JSON.stringify(tableData)}</p>}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

const KnowledgeGraphStyle = {
  borderRadius: "50px",
  border: "2px solid rgba(255, 255, 255, 0.64)",
  background:
    "radial-gradient(228% 117.58% at 24.99% 43.36%, rgba(51, 71, 255, 0.40) 0%, rgba(223, 226, 255, 0.22) 74.98%, rgba(107, 122, 255, 0.40) 100%)",
  backdropFilter: "blur(7.637977123260498px)",
};

export default WebView;
