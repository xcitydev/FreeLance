import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import jobImage from "../assets/jobdes.svg";

const JobDescription = () => {
  const location = useLocation();
  const [taken, setTaken] = useState();
  const [addy, setAddy] = useState();
  const checkTaken = async () => {
    const address = await window.tronWeb.defaultAddress.hex;
    setAddy(address);
    if (
      location.state.freelancer !== "410000000000000000000000000000000000000000"
    ) {
      setTaken(true);
    } else {
      setTaken(false);
    }
  };

  const acceptJob = async () => {
    const notify = toast.loading("⏳ accepting job...");
    try {
      await window?.tronLink?.request({
        method: "tron_requestAccounts",
      });
      const tronweb = window.tronWeb;
      const contract = await tronweb
        .contract()
        .at("TZAYSriTLzTctE2fJFGjyS7TMEy66cSLgV");
      toast.loading("✍ Sign Transaction", {
        id: notify,
      });
      const hash = await contract.acceptJob(location.state.jobId).send({
        feeLimit: 10000000000,
        callValue: 0,
      });
      toast.success("✅ done", {
        id: notify,
      });
      console.log(hash);
    } catch (error) {
      toast.error(`❌ ${error.message}`, {
        id: notify,
      });
    }
  };

  const isCompleted = async () => {
    const notify = toast.loading("⏳ chaning job status...");
    try {
      await window?.tronLink?.request({
        method: "tron_requestAccounts",
      });
      const tronweb = window.tronWeb;
      const contract = await tronweb
        .contract()
        .at("TZAYSriTLzTctE2fJFGjyS7TMEy66cSLgV");
      toast.loading("✍ Sign Transaction", {
        id: notify,
      });
      const hash = await contract.isCompleted(location.state.jobId).send({
        feeLimit: 10000000000,
        callValue: 0,
      });
      console.log(hash);
      toast.success("✅ done", {
        id: notify,
      });
    } catch (error) {
      toast.error(`❌ ${error.message}`, {
        id: notify,
      });
    }
  };
  const notCompleted = async () => {
    const notify = toast.loading("⏳ changing job status...");
    try {
      await window?.tronLink?.request({
        method: "tron_requestAccounts",
      });
      const tronweb = window.tronWeb;
      const contract = await tronweb
        .contract()
        .at("TZAYSriTLzTctE2fJFGjyS7TMEy66cSLgV");
      toast.loading("✍ Sign Transaction", {
        id: notify,
      });
      const hash = await contract.isNotComplete(location.state.jobId).send({
        feeLimit: 10000000000,
        callValue: 0,
      });
      toast.success("✅ done", {
        id: notify,
      });
      console.log(hash);
    } catch (error) {
      toast.error(`❌ ${error.message}`, {
        id: notify,
      });
    }
  };

  const releaseFunds = async () => {
    const notify = toast.loading("⏳ releasing funds...");
    try {
      await window?.tronLink?.request({
        method: "tron_requestAccounts",
      });
      const tronweb = window.tronWeb;
      const contract = await tronweb
        .contract()
        .at("TZAYSriTLzTctE2fJFGjyS7TMEy66cSLgV");
      toast.loading("✍ Sign Transaction", {
        id: notify,
      });
      const hash = await contract.releaseFunds(location.state.jobId).send({
        feeLimit: 10000000000,
        callValue: 0,
      });
      console.log(hash);
      toast.success("Released💲", {
        id: notify,
      });
    } catch (error) {
      toast.error(`❌ ${error.message}`, {
        id: notify,
      });
    }
  };

  useEffect(() => {
    checkTaken();
    // eslint-disable-next-line
  }, []);

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
      <div className="px-14 grid grid-cols-2 h-full">
        <div className="col-span-1 flex items-center justify-center">
          <img src={jobImage} alt="job description" className="w-2/4" />
        </div>
        <div className="col-span-1">
          <p className="text-center pt-24 text-3xl font-Abril font-semibold">
            Job Description
          </p>
          <div className="pt-8 pb-6 space-y-2 font-Abril bg-black my-6 px-4">
            <p>
              Title: <span>{location.state.title}</span>
            </p>
            <p>
              Description: <span>{location.state.description}</span>
            </p>
            <p>
              Budget:{" "}
              <span>
                {window.tronWeb.fromSun(
                  window.tronWeb.toDecimal(location.state.budget._hex)
                )}
                Trx
              </span>
            </p>
            <p>
              Owner: <span>{location.state.client}</span>
            </p>
            <p>
              Status:{" "}
              {taken ? <span>⏳ In process..</span> : <span>Fresh</span>}
            </p>
            <p>
              Taken:
              {taken ? (
                <>
                  <span>Yes by {location.state.freelancer}</span>
                </>
              ) : (
                <>
                  <span>Not yet</span>
                </>
              )}
            </p>
            {!taken && (
              <>
                <div className="py-3">
                  <button
                    onClick={acceptJob}
                    className="text-sm px-4 cursor-pointer duration-300 hover:px-5 bg-white text-black w-fit py-2 rounded hover:bg-green-500 hover:text-white transition-all"
                  >
                    Accept Job
                  </button>
                </div>
              </>
            )}
            {taken && location.state.freelancer === addy && (
              <>
                <div className="py-3">
                  <button
                    onClick={isCompleted}
                    className="text-sm px-4 cursor-pointer duration-300 hover:px-5 bg-white text-black w-fit py-2 rounded hover:bg-green-500 hover:text-white transition-all"
                  >
                    Completed Job💯
                  </button>
                </div>
              </>
            )}
            {taken && location.state.client === addy && (
              <>
                <div className="py-3 space-x-2">
                  <button
                    onClick={notCompleted}
                    className="text-sm px-4 cursor-pointer duration-300 hover:px-5 bg-white text-black w-fit py-2 rounded hover:bg-red-500 hover:text-white transition-all"
                  >
                    Job not complete ❌
                  </button>
                  <button
                    onClick={releaseFunds}
                    className="text-sm px-4 cursor-pointer duration-300 hover:px-5 bg-white text-black w-fit py-2 rounded hover:bg-green-500 hover:text-white transition-all"
                  >
                    Release Funds💲
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
