import React from "react";
import client from "../assets/profile.png";
import twitter from "../assets/TWITTER.png";

const ClientItems = ({ item }) => {
  return (
    <div className="col-span-1 h-[30vh] bg-slate-500 m-2 border rounded-sm relative flex flex-col">
      <img
        src={item?.imgUrl || client}
        alt="client profile"
        className="absolute"
      />
      <div className="flex-1"></div>
      <div className="bg-black/40 px-2 py-2 z-50 cursor-pointer hover:bg-black/70 duration-200 transition-all">
        <p className="text-sm">{item?.name}</p>
        <p className="text-[13px] truncate">{item?.description}</p>
        <img src={twitter} alt="twitter" className="w-7 h-7" />
      </div>
    </div>
  );
};

export default ClientItems;
