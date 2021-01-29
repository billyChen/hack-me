import React from 'react'

// Material-ui
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'

// Components
import ListReorder from './ListReorder'

const Modal = ({
    addNewEmployee,
    handleModal,
    handleEmployeeIdField,
    listValues,
    openModal,
    handleUpdateEmployee,
    handleNameChange,
    setListValues }) => {

    const handleReorderingDesks = (newList) => {
        setListValues({
            ...listValues,
            list: [...newList]
        })
    }

    return (
        <Dialog onClose={handleModal} open={openModal.open}>
            <DialogTitle id="">Employee</DialogTitle>
            <DialogContent>
                <DialogContentText>{openModal.isUpdate ? 'Update' : 'Add'} an employee</DialogContentText>
                {openModal.isUpdate && <TextField value={listValues.name} onChange={handleNameChange} onBlur={handleEmployeeIdField} id="name" label="Employee name" fullWidth autoFocus />}
                {!openModal.isUpdate && <TextField onChange={handleNameChange} value={listValues.name} onBlur={handleEmployeeIdField} id="name" label="Name" fullWidth autoFocus />}
                <ListReorder {...{ handleReorderingDesks }} list={listValues.list} />
            </DialogContent>
            <DialogActions>
                {openModal.isUpdate && <Button onClick={handleUpdateEmployee} variant="outlined" color="primary">Modifier</Button>}
                {!openModal.isUpdate && <Button onClick={addNewEmployee} variant="outlined" color="primary">Ajouter</Button>}
                <Button onClick={() => handleModal()} variant="outlined" color="secondary">Annuler</Button>
            </DialogActions>
        </Dialog>
    )
}

export default Modal

