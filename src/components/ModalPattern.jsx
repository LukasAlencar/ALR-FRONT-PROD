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

export default function ModalPattern({open, toggleModal, textTitle, textBody, handleClick1, handleClick2, handleClick3, textBtn1, textBtn2, textBtn3, colorBtn1, colorBtn2, colorBtn3}) {

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
                    {textTitle}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {textBody}
                </Typography>
                <div style={{marginTop: 20}}>
                    {textBtn1 && <Button onClick={handleClick1} style={{marginRight: 10}} color={colorBtn1 ? colorBtn1 : 'primary'} variant="outlined">{textBtn1}</Button>}
                    {textBtn2 && <Button onClick={handleClick2} style={{marginRight: 10}} color={colorBtn2 ? colorBtn2 : 'primary'} variant="outlined">{textBtn2}</Button>}
                    {textBtn3 && <Button onClick={handleClick3} color={colorBtn3 ? colorBtn3 : 'primary'}>{textBtn3}</Button>}
                </div>
            </Box>
        </Fade>
      </Modal>
    </div>
  );
}