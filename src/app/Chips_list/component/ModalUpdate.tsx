import { style } from '@/utils/const'
import { Box, Button, Fade, Modal, TextField, Typography } from '@mui/material'
import React from 'react'

interface Props {
    openModal: boolean;
    handleClose: () => void;
    month: number;
    handleClickMonth: (e: React.ChangeEvent<HTMLInputElement>) => void;
    habdleUpdate: () => void;
}

export default function ModalUpdate({openModal, handleClose, month, handleClickMonth, habdleUpdate}: Props) {
  return (
    <Modal
    aria-labelledby="spring-modal-title"
    aria-describedby="spring-modal-description"
    open={openModal}
    onClose={handleClose}
    closeAfterTransition
    slotProps={{
      backdrop: {
        TransitionComponent: Fade,
      },
    }}
  >
    <Fade in={openModal}>
      <Box sx={style}>
        <Typography id="spring-modal-title" variant="h6" component="h2">
          Meses a renovar
        </Typography>
        <Typography id="spring-modal-description" sx={{ mt: 2 }}>
          <TextField
            id="outlined-number"
            label="Meses a renovar"
            type="number"
            value={month}
            onChange={handleClickMonth}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={habdleUpdate}
          >
            Renovar
          </Button>
          <Button variant="contained" color="error" onClick={handleClose}>
            Cancelar
          </Button>
        </div>
      </Box>
    </Fade>
  </Modal>
  )
}
