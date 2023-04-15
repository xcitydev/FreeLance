import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const [jobDetails, setJobDetails] = useState({
    title: "",
    des: "",
    budget: 0,
    deadline: 0,
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const createJob = async () => {
    try {
      await window?.tronLink?.request({
        method: "tron_requestAccounts",
      });
      const tronweb = window.tronWeb;
      const deadline = new Date(jobDetails.deadline).getTime() / 1000;
      const contract = await window.tronWeb
        .contract()
        .at("TZAYSriTLzTctE2fJFGjyS7TMEy66cSLgV");
      const budget = await tronweb.toSun(jobDetails.budget);
      const hash = await contract
        .createJob(jobDetails.des, jobDetails.title, deadline, budget)
        .send({
          feeLimit: 10000000000,
          callValue: budget,
        });
      console.log(hash);
    } catch (error) {}
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className="text-sm px-4 cursor-pointer duration-200 hover:px-5 bg-white text-black w-fit py-2 rounded"
      >
        Create new Job offer
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="space-y-3">
            <div>
              <p className="text-sm py-1 font-semibold">Title </p>
              <input
                className="px-4 py-1 text-sm text-black"
                type="text"
                placeholder="Enter name"
                required
                onChange={(e) =>
                  setJobDetails({ ...jobDetails, title: e.target.value })
                }
              />
            </div>
            <div>
              <p className="text-sm py-1 font-semibold">Description</p>
              <textarea
                className="px-4 py-1 text-sm text-black"
                placeholder="Enter description"
                onChange={(e) =>
                  setJobDetails({ ...jobDetails, des: e.target.value })
                }
              />
            </div>
            <div>
              <p className="text-sm py-1 font-semibold">Deadline</p>
              <input
                required
                className="px-4 py-1 text-sm text-black"
                type="date"
                onChange={(e) =>
                  setJobDetails({
                    ...jobDetails,
                    deadline: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <p className="text-sm py-1 font-semibold">Budget </p>
              <input
                className="px-4 py-1 text-sm text-black"
                type="number"
                required
                placeholder="Password"
                onChange={(e) =>
                  setJobDetails({
                    ...jobDetails,
                    budget: e.target.value,
                  })
                }
              />
            </div>
            <div className="py-5">
              <p
                className="text-sm px-4 cursor-pointer duration-200 hover:px-5 bg-black text-white w-fit py-2 rounded"
                onClick={createJob}
              >
                Create Job
              </p>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
