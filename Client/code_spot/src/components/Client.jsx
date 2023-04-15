import React from "react";
import { generatePath, useNavigate } from "react-router-dom";
import image from "../assets/profile.png";
import twitter from "../assets/TWITTER.png";
import JobItems from "./jobItems";
import BasicModal from "./modal";

const Client = ({ details, job }) => {
  const navigate = useNavigate();
  const handleProceed = (id, item) => {
    id &&
      navigate(generatePath("/job/:id", { id }), {
        state: {
          budget: item.budget,
          completed: item?.completed,
          deadLine: item?.deadLine,
          freelancer: item?.freelancer,
          client: item?.client,
          description: item?.description,
          jobId: item?.jobId,
          title: item?.title,
        },
      });
  };
  return (
    <div className="px-8 py-8 grid grid-cols-2">
      <div className="col=span-1 flex items-center space-y-8 py-16 flex-col">
        <div className="bg-black/70 h-fit space-y-3 w-2/4 flex flex-col items-center py-4">
          <img
            src={details?.imgUrl || image}
            alt="profile"
            className="h-[250px]"
          />
          <p>Name:{details?.name}</p>
          <p>Description: {details?.description}</p>
          <div className="grid grid-cols-4 space-x-3">
            <img
              src={twitter}
              alt="twitter"
              className="w-7 self-center h-7 col-span-1"
            />
          </div>
        </div>
        <BasicModal />
      </div>
      <div className="pt-16">
        <div className="bg-black py-2">
          <p className="text-center text-2xl py-2 font-Abril">Job Created</p>
          <div className="h-[65vh] grid grid-cols-3 overflow-y-scroll">
            {job?.map((job, i) => (
              <div key={i} onClick={() => handleProceed(job.title, job)}>
                <JobItems job={job} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Client;
