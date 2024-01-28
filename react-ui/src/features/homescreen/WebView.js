import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../components/ui/button";
import ArrowSvg from "./Waitlist_Assets/arow.svg";
import axios from "axios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion"
import { Input } from "../../components/ui/input";
import Table from "../../components/ui/Table";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('Column1', {
    header: 'Column 1',
  }),
  columnHelper.accessor('Column2', {
    header: 'Column 2',
  }),
  columnHelper.accessor('Column3', {
    header: 'Column 3',
  }),
];

const WebView = ({ dataSourceId }) => {
  const [graphUrl, setGraphUrl] = useState('');
  const [nodes, setNodes] = useState([]);
  const [isTable, setIsTable] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [textResponse, setTextResponse] = useState('');
  const queryRef = useRef();

  const queryHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("query", queryRef.current.value);
      formData.append("datasource_id", dataSourceId);

      const res = await axios.post("http://3.111.174.29:8080/kg/query_knowledge_graph", formData);

      setIsTable(res?.data?.response === 'Random Table' ? true : false);
      // if (res?.data?.response === 'Random Table')
      setTableData(res?.data?.data);

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    let timeoutId = null;
    const fetchKnowledgeGraph = async () => {
      try {
        const res = await axios.post("http://3.111.174.29:8080/kg/get_knowledge_graph", { datasource_id: dataSourceId });
        if (res?.data?.status === 'In Progress') {
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
    if (dataSourceId)
      fetchKnowledgeGraph();

    // Cleanup function if needed
    return () => {
      // Perform cleanup here, if necessary
      clearTimeout(timeoutId)
    };

  }, [dataSourceId]);


  return (
    <section className="py-20 h-auto">
      <div className="flex relative flex-col  items-center justify-center gap-5 my-16 text-white py-16 rounded-lg px-2" style={KnowledgeGraphStyle}>
        <div className="grid grid-cols-6 w-full">
          <iframe src={graphUrl} className="col-span-5 rounded-lg h-full w-full" />
          <div className="bg-black rounded-lg text-white h-full flex flex-col gap-4 p-3">
            {nodes?.map((node) => ( 
              <div key={node} className="border-green-500 border rounded-md py-4 px-2"> 
                {node}
              </div>
            ))}
          </div>
        </div>

     
        <Accordion type="single" collapsible>
          <AccordionItem style={KnowledgeGraphStyle} className="!rounded-2xl absolute left-96 top-3/4 w-6/12 p-5 my-10 " value="item-1">
            <div className="flex flex-nowrap relative">
              <Input ref={queryRef} placeholder="Actual question test to be input by user" />
              <AccordionTrigger className="text-white p-0 absolute right-2">
                <Button onClick={queryHandler} className="p-0 bg-transparent m-0 hover:bg-transparent hover:scale-105 duration-300 ease-linear transition-all">
                  <img src="/uploadButton.svg" />
                </Button>
              </AccordionTrigger>
            </div>
            <AccordionContent className="border bg-white rounded-xl p-4">
              {isTable && <Table data={tableData} columns={columns} />}
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
