import * as React from 'react';
import {
    Box,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Typography
} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import AdapterJalali from '@date-io/date-fns-jalali';
import moment from 'jalali-moment'
import CloseIcon from '@mui/icons-material/Close';

import {useEffect, useRef, useState} from "react";

import {v4 as uuid} from 'uuid';

const AddEdmployeeDialog = ({open, onSubmit, onClose, employeeForEdit}) => {

    const [birthDate, setbirthDate] = useState()
    useEffect(()=>{
        setbirthDate(employeeForEdit ? moment.from(employeeForEdit.birthdate, 'fa').toDate() : new Date())

    },[employeeForEdit])

    const nameTextField = useRef()
    const birthDatePicker = useRef()
    const stateTextField = useRef()
    const cityTextField = useRef()
    const jobTextField = useRef()

    const submitHandler = () => {
        const newEmployee = {
            id: employeeForEdit ? employeeForEdit.id : uuid(),
            name: nameTextField.current.value,
            birthdate: moment.from(birthDate).locale('fa').format('YYYY/MM/DD'),
            state: stateTextField.current.value,
            city: cityTextField.current.value,
            job: jobTextField.current.value
        }
        onSubmit(newEmployee, !!employeeForEdit)
    }
    return (
        <Dialog open={open} fullWidth maxWidth='sm'>

            <DialogTitle>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    {employeeForEdit ? 'ویرایش' : 'افزودن'} کارمند
                    <IconButton color="primary" aria-label="close" component="label" onClick={onClose}>
                        <CloseIcon/>
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Box sx={{m: 2, display: 'flex', flexDirection: 'column', gap: 2}}>
                    <Box>
                        <TextField fullWidth inputRef={nameTextField} label="نام و نام خانوادگی" variant="outlined"
                                   defaultValue={employeeForEdit?.name}/>
                    </Box>
                    <Box>
                        <LocalizationProvider dateAdapter={AdapterJalali}>
                            <DatePicker
                                mask="____/__/__"
                                value={birthDate}
                                inputRef={birthDatePicker}
                                onChange={(newDate) => setbirthDate(newDate)}
                                renderInput={(params) => <TextField fullWidth {...params} />}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box>
                        <TextField inputRef={stateTextField} fullWidth id="outlined-basic" label="استان محل سکونت"
                                   variant="outlined" defaultValue={employeeForEdit?.state}/>
                    </Box>
                    <Box>
                        <TextField inputRef={cityTextField} fullWidth id="outlined-basic" label="شهر محل سکونت"
                                   variant="outlined" defaultValue={employeeForEdit?.city}/>
                    </Box>
                    <Box>
                        <TextField inputRef={jobTextField} fullWidth id="outlined-basic" label="شغل"
                                   variant="outlined" defaultValue={employeeForEdit?.job}/>
                    </Box>

                </Box>
            </DialogContent>
            <DialogActions sx={{m: 1}}>
                <Button onClick={submitHandler} variant='contained'>{employeeForEdit ? 'ویرایش' : 'افزودن'}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default (AddEdmployeeDialog)