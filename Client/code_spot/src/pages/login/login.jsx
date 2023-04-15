import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import login from "../../assets/login.svg";

const Login = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    const notify = toast.loading("⏳ logging in....");
    try {
      await window?.tronLink?.request({
        method: "tron_requestAccounts",
      });
      const tronweb = window.tronWeb;
      const address = tronweb?.defaultAddress;
      const contract = await window.tronWeb
        .contract()
        .at("TZAYSriTLzTctE2fJFGjyS7TMEy66cSLgV");
      const hash = await contract.login(password).call();
      if (hash) {
        toast.success("✅ done", {
          id: notify,
        });
        navigate("/dashboard", {
          state: {
            addy: address,
          },
        });
      } else {
        toast.error("❌ user does not exist", {
          id: notify,
        });
        console.log("wrong password");
      }
    } catch (error) {}
  };
  return (
    <div className="bg-[#1b1a1d] h-screen overflow-hidden text-white">
      <div className="px-4 grid grid-cols-6 bg-[#1b1a1d]/30 items-center justify-between py-2">
        <p className="col-span-4 text-2xl px-2">
          <Link to="/">CodeSpot</Link>
        </p>

        <div className="col-span-2 grid grid-cols-6 py-2 text-sm">
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
            <Link to="/becomeAClient">Become a Client</Link>
          </p>
        </div>
      </div>
      <div className="h-full grid grid-cols-2 px-16">
        <div className=" space-y-2 col-span-1 flex h-full flex-col justify-center px-16">
          <div className="flex items-center justify-center">
            <img src={login} alt="client page" className="w-2/4" />
          </div>
          <p className="text-3xl">
            Login to your <span>codeSpot</span> account
          </p>
          <p className="text-white/60 text-sm">
            Login to your code spot account with your tronlink pro.
          </p>
        </div>
        <div className="col-span-1 flex items-center space-x-5 justify-center">
          <div className="flex items-center w-2/4 justify-center bg-[#212023] px-5 py-6">
            <div className="space-y-3 w-full">
              <div>
                <p className="text-sm py-1 font-semibold">Password </p>
                <input
                  className="px-4 py-1 text-sm w-full text-black"
                  type="text"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="py-5">
                <p
                  className="text-sm px-4 cursor-pointer duration-200 hover:px-5 bg-white text-black w-fit py-2 rounded"
                  onClick={handleLogin}
                >
                  Login
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
