import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

export const employeesSlice = createSlice({
    name: "employees",
    initialState: {
        employees: [
            {
                id: 1,
                name: 'حیدر صاکی',
                birthdate: '1373/06/13',
                state: 'خوزستان',
                city: 'هویزه',
                job: 'برنامه نویس'
            },
            {
                id: 2,
                name: 'متین علیزاده',
                birthdate: '1380/02/25',
                state: 'خوزستان',
                city: 'اهواز',
                job: 'تدوینگر'
            },
            {
                id: 3,
                name: 'رضا اسدی',
                birthdate: '1374/09/02',
                state: 'خوزستان',
                city: 'ایذه',
                job: 'طراح گرافیک'
            },
            {
                id: 4,
                name: 'آرش آزرم',
                birthdate: '1368/03/19',
                state: 'خوزستان',
                city: 'اهواز',
                job: 'عکاس'
            },
            {
                id: 5,
                name: 'میلاد فرامرزی',
                birthdate: '1370/11/30',
                state: 'خوزستان',
                city: 'مسجد سلیمان',
                job: 'مدیر پروژه'
            },
            {
                id: 6,
                name: 'هادی سعیدی',
                birthdate: '1367/10/14',
                state: 'خوزستان',
                city: 'اهواز',
                job: 'برنامه نویس'
            },
            {
                id: 7,
                name: 'علی عبادی',
                birthdate: '1378/02/19',
                state: 'خوزستان',
                city: 'هویزه',
                job: 'برنامه نویس موبایل'
            },
        ]
    },
    reducers: {
        setEmployees: (state, action) => {
            state.employees = action.payload
        },
        addEmployee: (state, action) => {
            state.employees = [...state.employees, action.payload]
        },
        removeEmployee: (state, action) => {
            state.employees = state.employees.filter(e => e.id !== action.payload.id)
        },
        editEmployee: (state, action) => {
            const index = state.employees.findIndex(e => e.id === action.payload.id)
            state.employees[index] = action.payload
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return state = {
                ...state,
                ...action.payload.employees
            };
        },
    }
})
export const {setEmployees, addEmployee, removeEmployee,editEmployee} = employeesSlice.actions;
export default employeesSlice.reducer;
