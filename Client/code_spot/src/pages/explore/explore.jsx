import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import JobDescription from "../../components/JobDescription";
import Clients from "../client/clients";
import Freelancers from "../freelancer/freelancers";
import Jobs from "../jobs/jobs";
const Explore = () => {
  return (
    <div className="bg-[#1b1a1d] h-screen overflow-hidden text-white">
      <div className="px-4 grid grid-cols-3 bg-[#1b1a1d]/30 items-center justify-between py-2">
        <p className="col-span-2 text-2xl px-2">
          <Link to="/">CodeSpot</Link>
        </p>

        <div className="col-span-1 grid grid-cols-7 py-2 text-sm">
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
      <div className="h-full">
        <div className="grid grid-cols-3 my-6 px-20 space-x-4">
          <Link
            to="/explore/"
            className="bg-white text-black font-bold text-center py-2 rounded-sm text-xl font-Abril"
          >
            <p>Client</p>
          </Link>
          <Link
            to="/explore/jobs"
            className="bg-white text-black font-bold text-center py-2 rounded-sm text-xl font-Abril"
          >
            <p>Job offers</p>
          </Link>
          <Link
            to="/explore/freelancers"
            className="bg-white text-black font-bold text-center py-2 rounded-sm text-xl font-Abril"
          >
            <p>Freelancers</p>
          </Link>
        </div>
        <div className="px-20 h-full">
          <Routes>
            <Route element={<Clients />} path="/" />
            <Route element={<Freelancers />} path="/freelancers" />
            <Route element={<Jobs />} path="/jobs" />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Explore;
