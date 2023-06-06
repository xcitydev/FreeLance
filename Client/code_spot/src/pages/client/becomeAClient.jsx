import React, { useEffect, useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Link } from "react-router-dom";
import client from "../../assets/client.svg";
import profileImage from "../../assets/profile.png";
import { firebaseStorage } from "../../utils/utils";
import { toast } from "react-hot-toast";

const BecomeAClient = () => {
  const [imageProfile, setImageProfile] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [clientDetails, setClientDetails] = useState({
    name: "",
    des: "",
    password: "",
    twitter: "",
  });

  const img = useRef(null);

  const getImageUrl = async () => {
    try {
      const file = img.current.files[0];
      const storageRef = ref(firebaseStorage, `files/${file.name}`);
      const uploadImage = uploadBytesResumable(storageRef, file);

      uploadImage.on("state_changed", () => {
        getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          setImageUrl(downloadURL);
        });
      });
    } catch (eror) {
      console.log(eror);
    }
  };

  useEffect(() => {
    getImageUrl();
    // eslint-disable-next-line
  }, [imageProfile]);

  const viewImage = async (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setImageProfile(readerEvent.target.result);
    };
  };

  const handleDone = async () => {
    const notify = toast.loading("⏳ signing up as client...");
    try {
      await window?.tronLink?.request({
        method: "tron_requestAccounts",
      });
      const tronweb = window.tronWeb;
      const contract = await window.tronWeb
        .contract()
        .at("TBsXKM17M1ySELTwhRe13iVuky2jVg7sch");
      toast.loading("✍ Sign Transaction", {
        id: notify,
      });
      const passwordHash = await tronweb.sha3(clientDetails.password);
      const hash = await contract
        .registerClient(
          clientDetails.name,
          clientDetails.des,
          clientDetails.twitter,
          imageUrl,
          passwordHash
        )
        .send({
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
  return (
    <div className="bg-[#1b1a1d] h-screen overflow-hidden text-white">
      <div className="px-4 grid grid-cols-6 bg-[#1b1a1d]/30 items-center justify-between py-2">
        <p className="col-span-4 text-2xl px-2">
          <Link to="/">CodeSpot</Link>
        </p>

        <div className="col-span-2 grid grid-cols-5 py-2 text-sm">
          <p className="col-span-1 hover:text-white/50 transition-all duration-200 cursor-pointer">
            <Link to="/explore">Explore</Link>
          </p>
          <p className="col-span-1 hover:text-white/50 transition-all duration-200 cursor-pointer">
            <Link to="/dashboard">FAQ</Link>
          </p>
          <p className="col-span-2 hover:text-white/50 transition-all duration-200 cursor-pointer">
            <Link to="/becomeAFreelancer">Become a freelancer</Link>
          </p>
          <p className="col-span-1 hover:text-white/50 transition-all duration-200 cursor-pointer">
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
      <div className="h-full grid grid-cols-2 px-5">
        <div className=" space-y-2 col-span-1 flex h-full flex-col justify-center px-16">
          <div className="flex items-center justify-center">
            <img src={client} alt="client page" className="w-2/4" />
          </div>
          <p className="text-3xl">
            Become a <span>codeSpot</span> client
          </p>
          <p className="text-white/60 text-sm">
            Create a secured codeSpot account with your tronLink Pro wallet
            extentsion
          </p>
        </div>
        <div className="col-span-1 flex items-center space-x-5 justify-center">
          <div className="flex items-center space-x-5 justify-center bg-[#212023] px-5 py-3">
            <div className="space-y-3">
              <div>
                <p className="text-sm py-1 font-semibold">Name: </p>
                <input
                  className="px-4 py-1 text-sm text-black"
                  type="text"
                  placeholder="Enter name"
                  onChange={(e) =>
                    setClientDetails({ ...clientDetails, name: e.target.value })
                  }
                />
              </div>
              <div>
                <p className="text-sm py-1 font-semibold">Description</p>
                <input
                  className="px-4 py-1 text-sm text-black"
                  type="text"
                  placeholder="Enter description"
                  onChange={(e) =>
                    setClientDetails({ ...clientDetails, des: e.target.value })
                  }
                />
              </div>
              <div>
                <p className="text-sm py-1 font-semibold">Twitter handle: </p>
                <input
                  className="px-4 py-1 text-sm text-black"
                  type="text"
                  placeholder="Enter twitter"
                  onChange={(e) =>
                    setClientDetails({
                      ...clientDetails,
                      twitter: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <p className="text-sm py-1 font-semibold">Password: </p>
                <input
                  className="px-4 py-1 text-sm text-black"
                  type="text"
                  placeholder="Password"
                  onChange={(e) =>
                    setClientDetails({
                      ...clientDetails,
                      password: e.target.value,
                    })
                  }
                />
              </div>
              <div className="py-5">
                <p
                  className="text-sm px-4 cursor-pointer duration-200 hover:px-5 bg-white text-black w-fit py-2 rounded"
                  onClick={handleDone}
                >
                  Register Client
                </p>
              </div>
            </div>
            <div>
              <img
                src={imageProfile || profileImage}
                alt="profile"
                className="h-[180px]"
              />
              <input
                ref={img}
                hidden
                onChange={viewImage}
                type="file"
                accept=".jpg, .jpeg, .png"
              />
              <div className="flex justify-center">
                <p
                  onClick={() => img.current.click()}
                  className="cursor-pointer text-sm px-4 py-1 my-2 bg-white text-black text-center w-fit"
                >
                  Upload profile
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeAClient;
