import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

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

export function UploadedDocumentCard({
  name,
  options,
  handelUploadDoc,
  selectedDoc,
}) {
  // console.log("optuions ", options);
  const cards = [
    {
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4c1ce435746b626ca7b8b4ffc1a1708671b633525b202bd1811116d23e15ee2d?apiKey=31468f0b56654704a0c955257a9b20f9&",
      iconAlt: "Icon describing identification of converted purchase orders",
      title: name,
      percentage: "100%",
      analysisSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/2fd70d97c98800bdc9e588d7a6304ab2d93f418dcd8d72495e7a28742fe867ee?apiKey=31468f0b56654704a0c955257a9b20f9&",
      analysisAlt: "Analysis chart icon",
    },
    // Add more card objects here similarly if needed
  ];

  // const questions = [
  //   {
  //     text: "What is the average age of the customers?",
  //   },
  //   {
  //     text: "How many customers fall into each age group category?",
  //   },
  //   {
  //     text: "What is the average order value?",
  //   },
  //   // Add more question objects here similarly if needed
  // ];
  return (
    <div className="flex gap-5 text-lg font-semibold leading-7 text-black max-md:flex-wrap">
      <div
        className={`self-start mt-8 ${selectedDoc === name ? "bg-green-500 border-[4px]" : "bg-white"} border border-black border-solid h-[30px] rounded-[90px] w-[30px]`}
        onClick={handelUploadDoc}
      />
      <div className="flex flex-col flex-1 items-start px-5 py-7 bg-white rounded-xl border-solid border-[0.5px] border-neutral-400 max-md:max-w-full">
        <Accordion className="w-full" type="single" collapsible>
          <AccordionItem className="w-full border-none" value="item-1">
            <AccordionTrigger className="w-full">
              {cards.map((card, index) => (
                <DashboardCard key={index} {...card} />
              ))}
            </AccordionTrigger>

            <AccordionContent>
              {options?.map((question, index) => (
                <Question key={index} item={question} />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
