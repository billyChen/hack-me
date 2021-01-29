import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Material-i
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles'

// Selectors
import { getDesks } from '../../store/desk/selectors'
import { getEmployees } from '../../store/employee/selectors'
import { getCalendar } from '../../store/calendar/selectors'

// Components
import EmployeesList from './EmployeesList'
import Modal from './Modal'

// Reducers
import { deleteAssignment } from '../../store/calendar/reducers'

const CALENDAR_DATA = [
    {
        label: 'Janvier',
        numberDays: 31
    },
    {
        label: 'Février',
        numberDays: 28
    },
    {
        label: 'Mars',
        numberDays: 31
    },
    {
        label: 'Avril',
        numberDays: 30
    },
    {
        label: 'Mai',
        numberDays: 31
    },
    {
        label: 'Juin',
        numberDays: 30
    },
    {
        label: 'Juillet',
        numberDays: 31
    },
    {
        label: 'Aout',
        numberDays: 31
    },
    {
        label: 'Septembre',
        numberDays: 30
    },
    {
        label: 'Octobre',
        numberDays: 30
    },
    {
        label: 'Novembre',
        numberDays: 30
    },
    {
        label: 'Decembre',
        numberDays: 31
    },

]

const useStyles = makeStyles({
    color: {
        width: '25px',
        height: '25px'
    }
})

const Calendar = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    //State
    const [page, setPage] = useState(0)
    const [open, setOpen] = useState(false)

    // Selectors
    const desks = useSelector(getDesks)
    const employees = useSelector(getEmployees)
    const calendar = useSelector(getCalendar)

    const handleDeleteAssignment = (assignmentInfos, month, day, deskId) => {
        if (assignmentInfos)
            dispatch(deleteAssignment({ month, day, deskId }))
    }

    const displayCalendarHead = () => {
        return [...Array(CALENDAR_DATA[page].numberDays).keys()].map((key, idx) => {
            return <TableCell key={`${key}-${idx}`}>{key + 1}</TableCell>
        })
    }

    const displayCalendarBody = () => {
        return desks.map((desk, idxDesk) => {
            return <TableRow>
                <TableCell key={`desk-${desk.id}-${idxDesk}`}>
                    {desk.deskId}
                </TableCell>
                {[...Array(CALENDAR_DATA[page].numberDays).keys()].map((key, idx) => {
                    const assignmentInfos = calendar[(page + 1).toString()]?.[(idx + 1).toString()]?.[desk.id]
                    return <TableCell onClick={() => handleDeleteAssignment(assignmentInfos, page + 1, idx + 1, desk.id)} key={`body-${key}-${idx}`}>
                        {assignmentInfos && <div className={classes.color} style={{ backgroundColor: `#${assignmentInfos.color}` }}></div>}
                    </TableCell>
                })}
            </TableRow>
        })
    }

    const handleModalClose = () => {
        setOpen(false)
    }

    const handleModalOpen = () => {
        setOpen(true)
    }

    const previousMonth = () => {
        if (page === 0)
            setPage(11)
        else
            setPage(page - 1)
    }

    const nextMonth = () => {
        if (page === 11)
            setPage(0)
        else
            setPage(page + 1)
    }

    return (
        <Box display="flex" flexDirection="column">
            <Box display="flex">
                <IconButton onClick={() => previousMonth()}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h3">{CALENDAR_DATA[page].label}</Typography>
                <IconButton onClick={() => nextMonth()}>
                    <ArrowForwardIcon />
                </IconButton>
            </Box>
            <Box display="flex">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            {displayCalendarHead()}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayCalendarBody()}
                    </TableBody>
                </Table>
            </Box>
            <Box display="flex">
                <EmployeesList />
            </Box>
            <Box display="flex" flexDirection="row">
                <Button onClick={() => handleModalOpen()} variant="contained" color="primary">Assign desk</Button>
            </Box>
            <Modal {...{
                desks,
                employees,
                open,
                setOpen,
                handleModalClose,
            }}
                calendarData={CALENDAR_DATA}
            />
        </Box>
    )

}
export default Calendar