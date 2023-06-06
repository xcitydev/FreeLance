import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import profileImage from "../../assets/profile.png";
import freelancerImage from "../../assets/resume.svg";
import { firebaseStorage } from "../../utils/utils";
import { toast } from "react-hot-toast";

const BecomeAFreelancer = () => {
  const [imageProfile, setImageProfile] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [value, setValue] = useState("Web developer");
  const [freeLancerDetails, setFreeLancerDetails] = useState({
    name: "",
    des: "",
    twitter: "",
    telegram: "",
    discord: "",
    github: "",
    password: "",
  });

  const options = [
    { label: "Web Developer", value: "web developer" },

    { label: "UIUX", value: "UIUX" },

    { label: "Writer", value: "Writer" },
    { label: "Content Creator", value: "Content Creator" },
    { label: "Engineer", value: "Engineer" },
    { label: "Community Moderator", value: "Community Moderator" },
    { label: "Artist", value: "Artist" },
  ];

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
    } catch (eror) {}
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

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleDone = async (e) => {
    e.preventDefault();
    const notify = toast.loading("⏳ signing up as freelancer...");

    try {
      await window?.tronLink?.request({
        method: "tron_requestAccounts",
      });
      const tronweb = window.tronWeb;
      const contract = await window.tronWeb
        .contract()
        .at("TBsXKM17M1ySELTwhRe13iVuky2jVg7sch");
      const passwordHash = await tronweb.sha3(freeLancerDetails.password);
      toast.loading("✍ Sign Transaction", {
        id: notify,
      });
      console.log(imageUrl, value, passwordHash, freeLancerDetails);
      const hash = await contract
        .registerFreeLancer(
          freeLancerDetails.name,
          freeLancerDetails.des,
          value,
          imageUrl,
          freeLancerDetails.twitter,
          freeLancerDetails.telegram,
          freeLancerDetails.discord,
          freeLancerDetails.github,
          passwordHash
        )
        .send({
          feeLimit: 10000000000,
          callValue: 0,
        });
      toast.success("✅ done", {
        id: notify,
      });
      console.log(hash);
    } catch (error) {
      console.log(error);
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
            <Link to="/becomeAClient">Become a Client</Link>
          </p>
          <p className="col-span-1 hover:text-white/50 transition-all duration-200 cursor-pointer">
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
      <div className="h-full grid grid-cols-2 px-5">
        <div className=" space-y-2 col-span-1 flex h-full flex-col justify-center px-16">
          <div className="flex items-center justify-center">
            <img src={freelancerImage} alt="client page" className="w-2/4" />
          </div>
          <p className="text-3xl">
            Become a <span>codeSpot</span> Freelancer
          </p>
          <p className="text-white/60 text-sm">
            Create a secured codeSpot account with your tronLink Pro wallet
            extentsion
          </p>
        </div>
        <div className="col-span-1 flex items-center space-x-5 justify-center">
          <div className="flex items-center space-x-5 justify-center bg-[#212023] px-5 py-3">
            <form onSubmit={handleDone} className="space-y-3">
              <div>
                <p className="text-sm py-1 font-semibold">Name: </p>
                <input
                  required
                  className="px-4 py-1 text-sm text-black"
                  type="text"
                  placeholder="Enter name"
                  onChange={(e) =>
                    setFreeLancerDetails({
                      ...freeLancerDetails,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <p className="text-sm py-1 font-semibold">Description</p>
                <input
                  required
                  className="px-4 py-1 text-sm text-black"
                  type="text"
                  placeholder="Enter name"
                  onChange={(e) =>
                    setFreeLancerDetails({
                      ...freeLancerDetails,
                      des: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <p className="text-sm py-1 font-semibold">Field</p>
                <select
                  className="text-black py-1 text-sm px-2"
                  value={value}
                  onChange={handleChange}
                >
                  {options.map((option, i) => (
                    <option key={i} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-sm py-1 font-semibold">Twitter handle: </p>
                <input
                  required
                  className="px-4 py-1 text-sm text-black"
                  type="text"
                  placeholder="Enter twitter"
                  onChange={(e) =>
                    setFreeLancerDetails({
                      ...freeLancerDetails,
                      twitter: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <p className="text-sm py-1 font-semibold">Telegram </p>
                <input
                  required
                  className="px-4 py-1 text-sm text-black"
                  type="text"
                  placeholder="Enter telegram"
                  onChange={(e) =>
                    setFreeLancerDetails({
                      ...freeLancerDetails,
                      telegram: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <p className="text-sm py-1 font-semibold">Discord: </p>
                <input
                  required
                  className="px-4 py-1 text-sm text-black"
                  type="text"
                  placeholder="Enter Discord"
                  onChange={(e) =>
                    setFreeLancerDetails({
                      ...freeLancerDetails,
                      discord: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <p className="text-sm py-1 font-semibold">Github: </p>
                <input
                  required
                  className="px-4 py-1 text-sm text-black"
                  type="text"
                  placeholder="Enter github"
                  onChange={(e) =>
                    setFreeLancerDetails({
                      ...freeLancerDetails,
                      github: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <p className="text-sm py-1 font-semibold">Password: </p>
                <input
                  className="px-4 py-1 text-sm text-black"
                  type="text"
                  placeholder="Enter password"
                  onChange={(e) =>
                    setFreeLancerDetails({
                      ...freeLancerDetails,
                      password: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="py-5">
                <button
                  type="submit"
                  className="text-sm px-4 cursor-pointer duration-200 hover:px-5 bg-white text-black w-fit py-2 rounded"
                >
                  Register Freelancer
                </button>
              </div>
            </form>
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

export default BecomeAFreelancer;
