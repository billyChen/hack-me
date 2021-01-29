import React from 'react'
import { useSelector } from 'react-redux'


// Material-ui
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles'

// Selectors
import { getEmployees } from '../../store/employee/selectors'

const useStyles = makeStyles({
    root: {
        overflow: 'scroll'
    },
    container: {
        maxHeight: 440,
        marginTop: '150px',
        marginBottom: '50px',
        backgroundColor: 'white'
    },
    colorBox: {
        width: '25px',
        height: '25px',
        borderRadius: '5px',
    }
})

const EmployeesList = () => {
    const classes = useStyles()

    const employees = useSelector(getEmployees)


    const listEmployees = () => (
        employees.map((employee, idx) => (
            <TableRow key={`${employee.id}`}>
                <TableCell>{employee.name}</TableCell>
                <TableCell><div style={{ backgroundColor: `#${employee.color}` }} className={classes.colorBox}></div></TableCell>
            </TableRow>
        ))
    )

    if (employees.length === 0) return null;

    return (
        <TableContainer className={classes.container}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Employee name</TableCell>
                        <TableCell>Color</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listEmployees()}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default EmployeesList