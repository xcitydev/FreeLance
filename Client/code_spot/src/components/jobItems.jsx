import React, { useEffect, useState } from "react";
import { days } from "../utils/utils";

const JobItems = ({ job }) => {
  const [deeds, setDeeds] = useState();
  const [day, setDay] = useState(0);
  const [budget, setBudget] = useState(0);
  const [status, setStatus] = useState();

  const getDeeds = async () => {
    setStatus(job.completed);
    const deadline = window.tronWeb.toDecimal(job?.deadLine);
    const bud = await window.tronWeb.fromSun(
      window.tronWeb.toDecimal(job?.budget)
    );
    setBudget(bud);
    const remainingDays = days(deadline);
    setDay(remainingDays);
    if (job?.freelancer != "410000000000000000000000000000000000000000") {
      setDeeds(true);
    } else {
      setDeeds(false);
    }
  };

  useEffect(() => {
    getDeeds();
  }, []);

  return (
    <div className="bg-black col-span-1 h-[25vh] border cursor-pointer hover:bg-slate-950 duration-200 m-2 text-sm py-2 px-3 flex flex-col justify-center">
      <p className="font-meduim font-Abril truncate text-sm">
        Title:<span className=" font-light">{job?.title}</span>
      </p>
      <p className="font-meduim font-Abril truncate">client: {job?.client}</p>
      <p className="font-meduim font-Abril truncate">Budget:{budget}Trx</p>
      <p className="font-meduim font-Abril truncate">Deadline:{day}Days left</p>
      <p className="font-meduim font-Abril truncate">
        Taken: {deeds ? <>✅</> : <>❌</>}
      </p>
      <p className="font-meduim font-Abril truncate">
        Status:
        {status ? (
          <>
            <span>Completed✅</span>
          </>
        ) : (
          <>
            <span>Not completed❌</span>
          </>
        )}
      </p>
    </div>
  );
};

export default JobItems;
