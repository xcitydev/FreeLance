import React from "react";
import { Link } from "react-router-dom";
import job from "../../assets/job.svg";
const LandingPage = () => {
  return (
    <div className="bg-[#1b1a1d] h-screen text-white overflow-hidden">
      <div className="px-4 grid grid-cols-5 bg-[#1b1a1d]/30 items-center justify-between py-2">
        <p className="col-span-3 text-2xl px-2">
          <Link to="/">CodeSpot</Link>
        </p>

        <div className="col-span-2 grid grid-cols-7 py-2 text-sm">
          <p className="col-span-1 hover:text-white/50 transition-all duration-200 cursor-pointer">
            <Link to="/explore">Explore</Link>
          </p>
          <p className="col-span-1 hover:text-white/50 transition-all duration-200 cursor-pointer">
            <Link to="/becomeAFreelancer">FAQ</Link>
          </p>
          <p className="col-span-2 hover:text-white/50 transition-all duration-200 cursor-pointer">
            <Link to="/becomeAFreelancer">Become a freelancer</Link>
          </p>
          <p className="col-span-2 hover:text-white/50 transition-all duration-200 cursor-pointer">
            <Link to="/becomeAClient">Become a client</Link>
          </p>
          <p className="col-span-1 hover:text-white/50 transition-all duration-200 cursor-pointer">
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
      <div className="h-full grid grid-cols-2">
        <div className=" space-y-6 col-span-1 flex h-full flex-col justify-center px-16">
          <p className="text-xl">CodeSpot</p>
          <p className="text-4xl">
            Get the expertise you need for successful outcomes
          </p>
          <p className="text-sm bg-white w-fit cursor-pointer hover:px-5 transition-all duration-300 text-[#1b1a1d] py-2 px-4 font-semibold rounded-sm">
            Sign up now
          </p>
        </div>
        <div className="col-span-1 flex items-center px-16">
          <img src={job} alt="freelancer" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
