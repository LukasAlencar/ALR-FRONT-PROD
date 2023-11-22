import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Fade } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({open, toggleModal, handleDiscard}) {

  return (
    <div>
      <Modal
        open={open}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={open}>
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Are you sure?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    You are about to <span style={{color: 'rgb(231 0 0);'}}>discard</span> all changes
                </Typography>
                <div style={{marginTop: 20}}>
                    <Button onClick={toggleModal} style={{marginRight: 10}} color='primary' variant="outlined">Cancel</Button>
                    <Button onClick={handleDiscard} color='error' variant="contained">DISCARD</Button>
                </div>
            </Box>
        </Fade>
      </Modal>
    </div>
  );
}