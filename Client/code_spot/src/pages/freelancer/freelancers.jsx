import React, { useEffect, useState } from "react";
import nothing from "../../assets/lancenotfound.svg";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import FreelancerItems from "../../components/freelancerItems";
import { toast } from "react-hot-toast";

const Freelancers = () => {
  const [lancers, setLancers] = useState();
  const getFreeLancers = async () => {
    const notify = toast.loading("⏳ loading freelancers...");
    try {
      const tronweb = window.tronWeb;
      const contract = await window.tronWeb
        .contract()
        .at("TZAYSriTLzTctE2fJFGjyS7TMEy66cSLgV");
      const arrayLength = await contract.getFreelanceLength().call();
      const val = tronweb.toDecimal(arrayLength);
      let freeLancers = [];
      for (let index = 0; index < val; index++) {
        const freeList = await contract.listFreeLancers(index).call();
        freeLancers.push(freeList);
      }
      setLancers(freeLancers);
      toast.success("✅ done", {
        id: notify,
      });
    } catch (error) {
      toast.error(`❌ ${error.message}`, {
        id: notify,
      });
    }
  };

  useEffect(() => {
    getFreeLancers();
    console.log(lancers);
  }, []);
  return (
    <div className="bg-black/20 h-full px-3">
      <div className="flex bg-white py-1 w-[300px] space-x-2 px-4 items-center">
        <MagnifyingGlassIcon className="w-6 h-6 text-black" />
        <input
          type="text"
          placeholder="search for freelancers"
          className="w-full py-1 px-2 text-sm"
        />
      </div>
      <div>
        {!lancers ? (
          <>
            <div className="flex space-y-3 flex-col h-[70vh] items-center justify-center">
              <img src={nothing} alt="no clients" className="w-2/12" />
              <p className="text-2xl">No Freelancer has been created</p>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-6">
              {lancers?.map((item, i) => (
                <div key={i}>
                  <FreelancerItems item={item} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Freelancers;
