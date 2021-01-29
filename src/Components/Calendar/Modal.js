import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
// Mateiral-ui
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

// Recducers
import { addNewAssignment } from '../../store/calendar/reducers'

const DEFAULT_VALUES = {
    month: '',
    day: '',
    employeeId: '',
    deskId: ''
}

const Modal = ({ desks,
    employees,
    open,
    setOpen,
    handleModalClose,
    calendarData
}) => {
    const [values, setValues] = useState(DEFAULT_VALUES)

    const dispatch = useDispatch()

    const handleChangeDay = (e) => {
        setValues({
            ...values,
            day: e.target.value
        })
    }

    const handleChangeMonth = (e) => {
        console.log('MONTH', e.target.value)
        console.log('NEW', [...Array(calendarData[parseInt(e.target.value)].numberDays).keys()])
        setValues({
            ...values,
            month: e.target.value
        })
    }

    const handleChangeEmployee = (e) => {
        setValues({
            ...values,
            employeeId: e.target.value
        })
    }

    const handleChangeDesk = (e) => {
        setValues({
            ...values,
            deskId: e.target.value
        })
    }

    const assignDesk = () => {
        let color = employees.find(e => e.id === values.employeeId).color
        dispatch(addNewAssignment({ ...values, color }))
        setOpen(false)
        setValues(DEFAULT_VALUES)
    }


    console.log('CALENDAR', calendarData)
    return (
        <Dialog open={open} onClose={handleModalClose}>
            <DialogTitle>Assign a desk</DialogTitle>
            <DialogContent>
                <TextField
                    onChange={handleChangeMonth}
                    select
                    label="Month"
                    value={values.month}
                    helperText="Select the month"
                    variant="filled"
                >
                    {calendarData.map((calendar, idx) => {
                        return <MenuItem key={`select-calendar-month-${idx}`} value={idx + 1}>{calendar.label}</MenuItem>
                    })}
                </TextField>

                <TextField
                    onChange={handleChangeDay}
                    select
                    label="Day"
                    value={values.day}
                    helperText="Select the day"
                    variant="filled"
                >
                    {values.month && [...Array(calendarData[parseInt(values.month)].numberDays).keys()].map((day) => {
                        return <MenuItem key={`select-calendar-day-${day}`} value={day + 1}>{day + 1}</MenuItem>
                    })}
                    {!values.month && <MenuItem></MenuItem>}
                </TextField>

                <Box display="flex" flexDirection="column">
                    <TextField
                        onChange={handleChangeEmployee}
                        select
                        label="Employee"
                        value={values.employeeId}
                        helperText="Select the employee"
                        variant="filled"
                    >
                        {employees.map((employee, idx) => {
                            return <MenuItem key={`select-employee-${employee.id}`} value={employee.id}>{employee.name}</MenuItem>
                        })}
                    </TextField>


                    <TextField
                        onChange={handleChangeDesk}
                        select
                        label="Desk"
                        value={values.deskId}
                        helperText="Select the desk"
                        variant="filled"
                    >
                        {desks.map((desk, idx) => {
                            return <MenuItem key={`select-desks-${desk.id}`} value={desk.id}>{desk.deskId}</MenuItem>
                        })}
                    </TextField>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button color="primary" onClick={() => assignDesk()} variant="contained">Assign</Button>
            </DialogActions>
        </Dialog>
    )
}

export default Modal