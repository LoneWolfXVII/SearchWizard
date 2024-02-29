import React from "react";

const UserMessage = ({ user, message }) => (
  <section className="flex flex-col items-start w-full pb-12 pl-5 pr-20 mt-0 text-2xl leading-9 bg-white border border-solid pt-7 rounded-3xl border-neutral-300 max-md:pr-5 max-md:max-w-full">
    <div className="flex gap-5 text-black whitespace-nowrap">
      <img
        loading="lazy"
        src={user.image}
        alt={user.name}
        className="w-9 aspect-square"
      />
      <div className="my-auto">{user.name}</div>
    </div>
    <p className="mt-2 font-semibold leading-9 text-black ml-14 max-md:max-w-full">
      {message}
    </p>
  </section>
);

const DashboardActionButtons = ({ actionButtons }) => (
  <div className="flex items-start justify-between w-full gap-5 mt-4 max-md:flex-wrap max-md:max-w-full">
    {actionButtons.map((button) => (
      <div
        key={button.id}
        className="flex gap-2.5 justify-between px-5 py-2 text-white bg-blue-600 rounded-md"
      >
        <img
          loading="lazy"
          src={button.icon}
          alt={button.altText}
          className="w-8 aspect-square"
        />
        <div className="grow">{button.text}</div>
      </div>
    ))}
  </div>
);

const CommunicationPanel = () => {
  const userMessageData = {
    user: {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/b3fc63d693c53a16e7501915ed215d0335e9f03a6902835f6530eb247283e8ac?apiKey=31468f0b56654704a0c955257a9b20f9&",
      name: "Irame.ai",
    },
    message:
      "In 78 cases PR was not approved, still a PO was generated against them. Here is month on month trend for cases PO was generated when PR was not approved",
  };

  const actionButtonsData = [
    {
      id: "share",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/7a1a16a7350ae11ddb725c4f840bf671f370444d668fb1c1a2eea0dfa5b63d43?apiKey=31468f0b56654704a0c955257a9b20f9&",
      text: "Share answer",
      altText: "Share icon",
    },
    {
      id: "add",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/bf88c3272341b878a81669895475575dfd8f69ad1522f98b02e2b2a7a1cbdc0a?apiKey=31468f0b56654704a0c955257a9b20f9&",
      text: "Add to dashboard",
      altText: "Add icon",
    },
  ];

  return (
    <React.Fragment>
      <UserMessage
        user={userMessageData.user}
        message={userMessageData.message}
      />
      <DashboardActionButtons actionButtons={actionButtonsData} />
    </React.Fragment>
  );
};

export default CommunicationPanel;
