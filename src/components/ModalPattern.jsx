import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Fade, makeStyles } from '@mui/material';

// TODO: Change language to pt-br
// TODO: Remove unused libs
// TODO: Remove unused functions / constants
// TODO: Remove console.log

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

export default function ModalPattern({open, toggleModal, textTitle, textBody, handleClick1, handleClick2, handleClick3, textBtn1, textBtn2, textBtn3, colorBtn1, colorBtn2, colorBtn3, btn1Variant, btn2Variant}) {

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
                <Typography style={{fontFamily: 'Chakra Petch', fontWeight: 'bold'}} id="modal-modal-title" variant="h6" component="h2">
                    <span>{textTitle}</span>
                </Typography>
                <Typography style={{fontFamily: 'Chakra Petch'}} id="modal-modal-description" sx={{ mt: 2 }}>
                  {textBody}
                </Typography>
                <div style={{marginTop: 20}}>
                    {textBtn1 && <Button onClick={handleClick1} style={{marginRight: 10}} color={colorBtn1 ? colorBtn1 : 'primary'} variant={btn1Variant ? btn1Variant : 'outlined'}><span className='font-tertiary'>{textBtn1}</span></Button>}
                    {textBtn2 && <Button onClick={handleClick2} style={{marginRight: 10}} color={colorBtn2 ? colorBtn2 : 'primary'} variant={btn2Variant ? btn2Variant : 'outlined'}><span className='font-tertiary'>{textBtn2}</span></Button>}
                    {textBtn3 && <Button onClick={handleClick3} color={colorBtn3 ? colorBtn3 : 'primary'}><span className='font-tertiary'>{textBtn3}</span></Button>}
                </div>
            </Box>
        </Fade>
      </Modal>
    </div>
  );
}