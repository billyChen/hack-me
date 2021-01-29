import React from 'react'

// Material-ui
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'


const Modal = ({ addNewDesk, handleModal, fields, handleDeskIdField, openModal, handleUpdateDesk }) => {

    return (
        <Dialog onClose={handleModal} open={openModal.open}>
            <DialogTitle id="">Desks</DialogTitle>
            <DialogContent>
                <DialogContentText>{openModal.isUpdate ? 'Update' : 'Add'} a desk</DialogContentText>
                {openModal.isUpdate && <TextField defaultValue={fields.deskId} onBlur={handleDeskIdField} id="deskId" label="Desk ID" fullWidth autoFocus />}
                {!openModal.isUpdate && <TextField onBlur={handleDeskIdField} id="deskId" label="Desk ID" fullWidth autoFocus />}
            </DialogContent>
            <DialogActions>
                {openModal.isUpdate && <Button onClick={handleUpdateDesk} variant="outlined" color="primary">Modifier</Button>}
                {!openModal.isUpdate && <Button onClick={addNewDesk} variant="outlined" color="primary">Ajouter</Button>}
                <Button onClick={() => handleModal()} variant="outlined" color="secondary">Annuler</Button>
            </DialogActions>
        </Dialog>
    )
}

export default Modal