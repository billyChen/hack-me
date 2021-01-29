import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Selectors
import { getEmployees } from '../../store/employee/selectors'

// Material-ui
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// Components
import Modal from './Modal/'

// Selectors
import { getDesks } from '../../store/desk/selectors'


// reducers
import { addEmployee, deleteEmployee, updateEmployee } from '../../store/employee/reducers'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    },
    tableRoot: {
        width: '100%'
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}))

const DEFAULT_OPENMODAL = {
    open: false,
    isUpdate: false,
}

const Employees = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    // Selectors
    const employees = useSelector(getEmployees)
    const desks = useSelector(getDesks)

    // State
    const [listValues, setListValues] = useState({
        name: null,
        list: [...desks]
    })

    const [openModal, setOpenModal] = useState(DEFAULT_OPENMODAL)

    const generateRandomColor = () => {
        return Math.floor(Math.random() * 16777215).toString(16);

    }

    const handleUpdateModal = (values) => {
        setOpenModal({
            open: true,
            isUpdate: true,
        })

        setListValues({
            ...values,
        })
    }

    const listEmployees = () => {
        return employees.map((employee, idx) => (
            <TableRow key={`${employee.id}-${idx}`}>
                <TableCell component="th" scope="row">
                    {employee.name}
                </TableCell>
                <TableCell>
                    <IconButton onClick={() => handleUpdateModal(employee)}>
                        <UpdateIcon />
                    </IconButton>
                    <IconButton onClick={() => removeEmployee(employee.id)}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        ))
    }

    const handleModal = useCallback(() => {
        setOpenModal({
            open: !openModal.open,
            isUpdate: false
        })
        setListValues({
            name: null,
            list: [...desks]
        })
    }, [desks, openModal])

    const handleEmployeeIdField = useCallback((e) => {
        if (!openModal.isUpdate)
            setListValues({
                ...listValues,
                name: e.target.value
            })
        else {
            setOpenModal({
                ...openModal,
            })

        }
    }, [listValues, openModal])

    const handleNameChange = useCallback((e) => {
        setListValues({
            ...listValues,
            name: e.target.value
        })
    }, [listValues])

    const addNewEmployee = useCallback(() => {
        dispatch(addEmployee({
            ...listValues,
            color: generateRandomColor()
        }))
        setOpenModal(DEFAULT_OPENMODAL)
    }, [listValues, dispatch])

    const removeEmployee = useCallback((id) => {
        dispatch(deleteEmployee(id))
    }, [dispatch])

    const handleUpdateEmployee = useCallback(() => {
        dispatch(updateEmployee(listValues))
        setOpenModal(DEFAULT_OPENMODAL)
    }, [listValues, dispatch])

    return (<Box mt={3} className={classes.root} display="flex" flexDirection="column">
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Employee Name</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listEmployees()}
                </TableBody>
            </Table>
        </TableContainer>

        <Modal {...{
            handleEmployeeIdField,
            handleModal,
            handleNameChange,
            listValues,
            openModal,
            handleUpdateEmployee,
            addNewEmployee,
            setOpenModal,
            setListValues
        }}
        />
        <Fab onClick={() => setOpenModal({
            open: true,
            isUpdate: false
        })} className={classes.fab} color="primary" aria-label="add">
            <AddIcon />
        </Fab>
    </Box >)
}
export default Employees
