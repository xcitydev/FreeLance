import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Client from "../../components/Client";
import Lancer from "../../components/lancer";

const Dashboard = () => {
  const location = useLocation();
  const [lancerJob, setlancerJob] = useState();
  const [clientJob, setclientJob] = useState();
  const [type, setType] = useState("");
  const [details, setDetails] = useState({});

  const getType = async () => {
    const contract = await window.tronWeb
      .contract()
      .at("TZAYSriTLzTctE2fJFGjyS7TMEy66cSLgV");
    const type = await contract.clients(location.state.addy.base58).call();
    const type1 = await contract.freelancers(location.state.addy.base58).call();
    if (type.name == "") {
      setType("freelance");
      setDetails(type1);
    } else {
      setType("client");
      setDetails(type);
    }
  };

  const filterJobs = async () => {
    const contract = await window.tronWeb
      .contract()
      .at("TZAYSriTLzTctE2fJFGjyS7TMEy66cSLgV");

    const jobId = await contract.jobID().call();

    const clientJobs = [];
    const lancerJobs = [];
    for (let index = 0; index < jobId; index++) {
      const job = await contract.jobs(index + 1).call();
      console.log(location.state.addy);
      if (job.client == location.state.addy.hex) {
        clientJobs.push(job);
      }
      if (job.freelancer == location.state.addy.hex) {
        lancerJobs.push(job);
      }
      setclientJob(clientJobs);
      setlancerJob(lancerJobs);
    }
  };

  useEffect(() => {
    getType();
    filterJobs();
  }, []);
  console.log(location.state.addy);
  return (
    <div className="bg-[#1b1a1d] h-screen text-white">
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
            User:
          </p>
        </div>
      </div>
      <div>
        {type == "freelance" ? (
          <Lancer details={details} job={lancerJob} />
        ) : (
          <Client details={details} job={clientJob} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
