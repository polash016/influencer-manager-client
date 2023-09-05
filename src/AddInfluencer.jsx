import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

const AddInfluencer = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // Add Influencer
  const handleAddInfluencer = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const instagram = form.instagram.value;
    const followerField = form.follower.value;
    const follower = parseInt(followerField)
    const influencer = { name, instagram, follower };
    console.log(influencer);
    fetch("https://influencer-manager-server.vercel.app/influencer", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(influencer),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("Influencer Added");
          handleClose();
        }
      });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Influencer
      </Button>
      <Dialog open={open}>
        <DialogTitle>Add Influencer</DialogTitle>
        <div>
          <form
            onSubmit={handleAddInfluencer}
            className="w-[80%] mx-auto space-y-3"
          >
            <TextField name="name" label="Name" variant="outlined" /> <br />
            <TextField
              name="instagram"
              label="Instagram Handle"
              variant="outlined"
            />
            <br />
            <TextField name="follower" label="Followers" variant="outlined" />
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
              <Button type="submit">Add</Button>
            </DialogActions>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default AddInfluencer;
