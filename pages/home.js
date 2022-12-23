import React, {useState} from "react";
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useSelector, useDispatch} from "react-redux";
import {addEmployee, removeEmployee, editEmployee} from '../store/slices/employeesSlice'
import AddEmployeeDialog from "../Components/addEmployeeDialog";
import ConfirmDialog from "../Components/confirmDialog";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function Home() {
    const dispatch = useDispatch()
    const employees = useSelector(state => state.reducers.employeesSlice.employees)
    const [addEmployeeDialogOpen, setAddEmployeeDialogOpen] = useState(false)
    const [removeEmployeeDialogOpen, setRemoveEmployeeDialogOpen] = useState(false)
    const [employeeForEdit, setEmployeeForEdit] = useState(null)
    const [employeeForDelete, setEmployeeForDelete] = useState(null)


    const dialogSubmitHandler = (employee, isEdit) => {
        if (isEdit) {
            editEmployeeHandler(employee)
        } else {
            addEmployeeHandler(employee)
        }
        setAddEmployeeDialogOpen(false)
    }

    const addEmployeeHandler = (newEmployee) => {
        dispatch(addEmployee(newEmployee))
    }
    const editEmployeeHandler = (employee) => {
        dispatch(editEmployee(employee))
        setEmployeeForEdit(null)
    }

    const confirmDeleteEmployee = (employee) => {
        setEmployeeForDelete(employee)
        setRemoveEmployeeDialogOpen(true)
    }

    const deleteEmployee = () => {
        dispatch(removeEmployee(employeeForDelete))
        setRemoveEmployeeDialogOpen(false)
        setEmployeeForDelete(null)
    };
    const closeAddEmployeeDialog = () => {
        setAddEmployeeDialogOpen(false)
        setEmployeeForEdit(null)
    };
    const handleEdit = (employee) => {
        setEmployeeForEdit(employee)
        setAddEmployeeDialogOpen(true)
    }


    return (
        <Container maxWidth='lg'>
            <Box sx={{
                my: 3,
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <Typography variant='h5'>
                    لیست کارمندان
                </Typography>
                <Button variant='contained' onClick={() => setAddEmployeeDialogOpen(true)}>افزودن</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>عکس</TableCell>
                            <TableCell>نام و نام خانوادگی</TableCell>
                            <TableCell align="center">تاریخ تولد</TableCell>
                            <TableCell align="center">استان محل سکونت</TableCell>
                            <TableCell align="center">شهر محل سکونت</TableCell>
                            <TableCell align="center">مدرک تحصیلی</TableCell>
                            <TableCell align="center">عملیات</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map(row => (
                            <TableRow key={row.id} sx={theme => ({
                                '&:nth-of-type(odd)': {
                                    backgroundColor: theme.palette.action.hover,
                                },
                                // hide last border
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            })
                            }>
                                <TableCell align='center'>
                                    <Avatar src='https://xsgames.co/randomusers/avatar.php?g=male'/>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.birthdate}</TableCell>
                                <TableCell align="center">{row.state}</TableCell>
                                <TableCell align="center">{row.city}</TableCell>
                                <TableCell align="center">{row.job}</TableCell>
                                <TableCell align="center">
                                    <Button sx={{m: 0.5}} aria-label="delete" variant='outlined' color='error'
                                            onClick={() => confirmDeleteEmployee(row)}
                                            startIcon={<DeleteIcon/>}>
                                        حذف
                                    </Button>
                                    <Button sx={{m: 0.5}} aria-label="edit" variant='outlined'
                                            onClick={() => handleEdit(row)}
                                            startIcon={<EditIcon/>}>
                                        ویرایش
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <AddEmployeeDialog open={addEmployeeDialogOpen} onSubmit={dialogSubmitHandler}
                               employeeForEdit={employeeForEdit} onClose={closeAddEmployeeDialog}/>
            <ConfirmDialog open={removeEmployeeDialogOpen} onClose={()=>setRemoveEmployeeDialogOpen(false)}
                           title='حذف کارمند' text='آیا از حذف این مورد مطمئن هستید؟'
                           onSubmit={() => deleteEmployee()}/>
        </Container>
    );
}
