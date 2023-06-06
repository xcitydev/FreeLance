import React, { useEffect, useState } from "react";
import nothing from "../../assets/nothing.svg";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import ClientItems from "../../components/clientItems";
import { toast } from "react-hot-toast";

const Clients = () => {
  const [clients, setClients] = useState();
  const getClients = async () => {
    const notify = toast.loading("⏳ loading clients...");
    try {
      const tronweb = window.tronWeb;
      const contract = await window.tronWeb
        .contract()
        .at("TBsXKM17M1ySELTwhRe13iVuky2jVg7sch");
      const arrayLength = await contract.getClientLength().call();
      const val = tronweb.toDecimal(arrayLength);
      let clientList = [];
      for (let index = 0; index < val; index++) {
        const freeList = await contract.listClient(index).call();
        console.log(freeList);
        clientList.push(freeList);
      }
      setClients(clientList);
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
    getClients();
  }, []);
  return (
    <div className="bg-black/20 h-full px-3">
      <div className="flex bg-white py-1 w-[300px] space-x-2 px-4 items-center">
        <MagnifyingGlassIcon className="w-6 h-6 text-black" />
        <input
          type="text"
          placeholder="search for clients"
          className="w-full py-1 px-2 text-sm"
        />
      </div>
      <div>
        {!clients ? (
          <>
            <div className="flex space-y-3 flex-col h-[70vh] items-center justify-center">
              <img src={nothing} alt="no clients" className="w-2/12" />
              <p className="text-2xl">No client has been created</p>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-6">
              {clients?.map((item, i) => (
                <div key={i}>
                  <ClientItems item={item} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Clients;
