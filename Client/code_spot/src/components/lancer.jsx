import React from "react";
import image from "../assets/profile.png";
import twitter from "../assets/TWITTER.png";
import telegram from "../assets/TELEGRAM.png";
import discord from "../assets/discord.jpg";
import github from "../assets/github.png";
import JobItems from "./jobItems";
import BasicModal from "./modal";
import { generatePath, useNavigate } from "react-router-dom";
const Lancer = ({ details, job }) => {
  console.log(job);
  const navigate = useNavigate();
  const handleProceed = (id, item) => {
    id &&
      navigate(generatePath("/explore/job/:id", { id }), {
        state: {
          // email: values?.email,
          // address: item?.address,
          // salary: item?.salary,
          // name: item?.name,
          // payId: item?.payid,
          // department: item?.department,
          // signerAddy: values?.email,
        },
      });
  };
  return (
    <div className="px-8 py-8 grid grid-cols-2">
      <div className="col=span-1 flex items-center space-y-8 py-16 flex-col">
        <div className="bg-black/70 h-fit space-y-3 w-2/4 flex flex-col items-center py-4">
          <img src={image} alt="profile" />
          <p>Name: Kingsley Chukwuemeka</p>
          <p>Role: Web Developer</p>
          <p>Description: I am a web developer</p>
          <div className="grid grid-cols-4 space-x-3">
            <img
              src={twitter}
              alt="twitter"
              className="w-7 self-center h-7 col-span-1"
            />
            <img
              src={telegram}
              alt="telegram"
              className=" self-center w-7 h-7 col-span-1"
            />
            <img
              src={discord}
              alt="discord"
              className="w-6 h-6 self-center col-span-1 rounded"
            />
            <img
              src={github}
              alt="github"
              className=" self-center w-7 h-7 col-span-1"
            />
          </div>
        </div>
      </div>
      <div className="pt-16">
        <div className="bg-black py-2">
          <p className="text-center text-2xl py-2 font-Abril">Job Taken</p>
          <div className="h-[65vh] grid grid-cols-3 overflow-y-scroll">
            {job?.map((job, i) => (
              <div>
                <JobItems />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lancer;
