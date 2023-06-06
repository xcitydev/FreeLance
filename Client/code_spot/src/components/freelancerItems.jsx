import React from "react";
import client from "../assets/profile.png";
import twitter from "../assets/TWITTER.png";
import telegram from "../assets/TELEGRAM.png";
import discord from "../assets/discord.jpg";
import github from "../assets/github.png";

const FreelancerItems = ({ item }) => {
  return (
    <div className="col-span-1 h-[30vh] bg-slate-500 m-2 border rounded-sm relative flex flex-col">
      <img
        src={item?.imgUrl || client}
        alt="client profile"
        className="absolute w-full h-full object-cover"
      />
      <div className="flex-1"></div>
      <div className="bg-black/60 px-2 py-2 z-50 cursor-pointer hover:bg-black/90 duration-200 transition-all">
        <p className="text-sm">{item?.name}</p>
        <p className="text-[13px] truncate font-semibold">{item?.role}</p>
        <div className="grid grid-cols-4">
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
  );
};

export default FreelancerItems;
