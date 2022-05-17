import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styled from "@emotion/styled";
import axios from "axios";
import { BASE_URL } from "../../configs/config";
import { useRef } from "react";
import CircularIndeterminate from "../loder/loader";
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
const StyledButton = styled(Button)`
  float: right;
`;
export default function BasicModal({
  setDataUser,
  setLoading,
  loading,
  dataUser,
}) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
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
  const data = {
    id: 6,
    email: name.email,
    first_name: name.firstName,
    last_name: name.lastName,
  };

  // console.log(dataUser);
  // dataUser?.data?.push(data);
  // console.log(dataUser);
  const handleAddUser = () => {
    setLoading(true);
    axios.post(`${BASE_URL}/users`).then(() => {
      dataUser.data.unshift(data);
    });
    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <CircularIndeterminate />
      ) : (
        <>
          <StyledButton
            variant="contained"
            color="success"
            onClick={handleOpen}
          >
            New
          </StyledButton>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <input
                  type={"text"}
                  placeholder="first-name"
                  name="firstName"
                  onChange={handelChange}
                />
                <br />
                <input
                  type={"text"}
                  placeholder="last-name"
                  name="lastName"
                  onChange={handelChange}
                />
                <br />
                <input
                  type={"email"}
                  placeholder="email"
                  name="email"
                  onChange={handelChange}
                />
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Button onClick={handleAddUser}>add user</Button>
              </Typography>
            </Box>
          </Modal>
        </>
      )}
    </div>
  );
}
