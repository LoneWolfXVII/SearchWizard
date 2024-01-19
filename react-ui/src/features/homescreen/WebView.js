import React from "react";
import { Button } from "../../components/ui/button";
import ArrowSvg from "./Waitlist_Assets/arow.svg";

const WebView = () => {
  return (
    <section>
      {/* <div className="flex justify-between">
        <h2 className="text-3xl font-bold text-white">
          Knowledge Graph
          <br />
          Playground
        </h2>
        <Button className="rounded-3xl ">
          Join the waitlist
          <img src={ArrowSvg} alt="Arrow" className="ml-1" />
        </Button>
      </div> */}

      <div className="flex flex-col items-center justify-center gap-5 my-16 text-white px-36 py-28" style={KnowledgeGraphStyle}>
        <iframe src="https://www.google.com/" title="W3Schools Free Online Web Tutorials"></iframe>
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
