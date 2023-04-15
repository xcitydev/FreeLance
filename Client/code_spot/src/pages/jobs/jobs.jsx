import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import nothing from "../../assets/jobnotfound.svg";
import JobItems from "../../components/jobItems";
import { generatePath, useNavigate } from "react-router-dom";

const Jobs = () => {
  const [job, setJob] = useState();
  const filterJobs = async () => {
    const contract = await window.tronWeb
      .contract()
      .at("TZAYSriTLzTctE2fJFGjyS7TMEy66cSLgV");

    const jobId = await contract.jobID().call();
    const jobs = [];
    for (let index = 0; index < jobId; index++) {
      const job = await contract.jobs(index + 1).call();
      jobs.push(job);
    }

    setJob(jobs);
  };

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

  useEffect(() => {
    filterJobs();
  }, []);

  return (
    <div className="bg-black/20 h-full px-3">
      <div className="flex bg-white py-1 w-[300px] space-x-2 px-4 items-center">
        <MagnifyingGlassIcon className="w-6 h-6 text-black" />
        <input
          type="text"
          placeholder="search for jobs"
          className="w-full py-1 px-2 text-sm"
        />
      </div>
      <div>
        {false ? (
          <>
            <div className="flex space-y-3 flex-col h-[70vh] items-center justify-center">
              <img src={nothing} alt="no clients" className="w-2/12" />
              <p className="text-2xl">No Job has been created</p>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-6">
              {job?.map((job, i) => (
                <div key={i} onClick={() => handleProceed(job.title, job)}>
                  <JobItems job={job} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Jobs;
