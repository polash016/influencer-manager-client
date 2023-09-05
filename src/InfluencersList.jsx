/* eslint-disable react/prop-types */

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FaEdit, FaTrash } from "react-icons/fa";
import { Button, Dialog, DialogActions, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';

const InfluencersList = ({influencers}) => {
    const [open, setOpen] = React.useState(false);
    const [influencerId, setInfluencerId] = useState(null)

  const handleClickOpen = (id) => {
    setOpen(true);
    setInfluencerId(id)
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleEditInfluencer = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const instagram = form.instagram.value;
    const followerField = form.follower.value;
    const follower = parseInt(followerField)
    const influencer = { name, instagram, follower };
    fetch(`https://influencer-manager-server.vercel.app/influencer/${influencerId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(influencer),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          alert("Influencer Updated successfully");
          handleClose();
        }
      });
  }
  const handleDelete = (id) => {
    fetch(`https://influencer-manager-server.vercel.app/influencer/${id}`, {
        method: 'DELETE',
    })
    .then((res) => res.json())
    .then(data => {
        if(data.deletedCount > 0){
            alert('Deleted successfully')
        }
    })
  }
    return (
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Instagram Handle</TableCell>
            <TableCell align="right">Follower</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {influencers.map((influencer) => (
            <TableRow
              key={influencer._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {influencer.name}
              </TableCell>
              <TableCell align="right">{influencer.instagram}</TableCell>
              <TableCell align="right">{influencer.follower}</TableCell>
              <TableCell align="right">
              <div>
      <Button variant="outlined" onClick={() => handleClickOpen(influencer._id)}>
      <FaEdit></FaEdit>
      </Button>
      <Dialog open={open}>
        <DialogTitle>Edit Influencer</DialogTitle>
        <div>
          <form
            onSubmit={() => handleEditInfluencer(event, influencer._id)}
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
              <Button type="submit">Update</Button>
            </DialogActions>
          </form>
        </div>
      </Dialog>
    </div>
              </TableCell>
              <TableCell align="right">
                <Button onClick={() => handleDelete(influencer._id)}><FaTrash></FaTrash></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    );
};

export default InfluencersList;