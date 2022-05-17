import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { BASE_URL } from "../../../configs/config";
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

export default function BasicModal({ dataUser, DataID, setLoading }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState({
    firstName: "",
    lastName: "",
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handelChange = (event) => {
    let value = event.target.value;
    let nameInp = event.target.name;
    setName((prevState) => ({
      ...prevState,
      [nameInp]: value,
    }));
  };

  const handleUpdate = () => {
    axios
      .put(`${BASE_URL}/users/1`, {
        data: [
          {
            first_name: name.firstName,
            last_name: name.lastName,
          },
        ],
      })
      .then((res) => {
        dataUser.data.push(res.data?.data[0]);
      });
  };
  return (
    <div>
      <Button variant="contained" onClick={() => handleOpen(DataID)}>
        edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <input
            type={"text"}
            placeholder="firstName"
            name="firstName"
            onChange={handelChange}
          />
          <br />
          <input
            type={"text"}
            placeholder="lastName"
            name="lastName"
            onChange={handelChange}
          />
          <br />
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
