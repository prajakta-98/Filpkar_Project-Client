import React, { useEffect } from 'react';
import { Box, Modal, Typography, styled } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';

const ModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  background: white;
  border-radius: 10px;
  box-shadow: 2px;
  padding: 20px;
  text-align: center;
  z-index: 20;
`;

const BlurredBackground = styled(Box)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 300px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  z-index: 10;
`;

const SuccessModal = ({ open, handleClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        handleClose();
        navigate('/'); // Redirect to the homepage
      }, 3000); // Redirect after 3 seconds

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [open, handleClose, navigate]);

  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
      <>
        <BlurredBackground />
        <ModalBox>
          <CheckCircleIcon style={{ fontSize: 60, color: 'green' }} />
          <Typography variant="h6" style={{ marginTop: 20 }}>
            Order Placed Successfully!
          </Typography>
        </ModalBox>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={200}
          recycle={false}
        />
      </>
    </Modal>
  );
};

export default SuccessModal;
