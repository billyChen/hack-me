
import { createSlice } from '@reduxjs/toolkit'
import { uuid } from 'uuidv4'

const employeeSlice = createSlice({
    name: 'employees',
    initialState: [],
    reducers: {
        addEmployee: {
            reducer(state, action) {
                const uniqId = uuid()
                const { name, list, color } = action.payload
                state.push({ id: uniqId, name, list, color })
            },
            prepare(params) {
                const { name, list, color } = params
                return { payload: { name, list, color } }
            }
        },
        deleteEmployee: {
            reducer(state, action) {
                return state.filter(desk => {
                    return desk.id !== action.payload
                })
            }
        },
        updateEmployee: {
            reducer(state, action) {
                const { id, list, name } = action.payload


                state.map((employee, idx) => {
                    if (employee.id === id)
                        state[idx] = {
                            ...state[idx],
                            name,
                            list,
                        }
                })
            },
            prepare(params) {
                const { id, list, name } = params
                return { payload: { id, list, name } }
            }
        }
    }
})

export const { addEmployee, deleteEmployee, updateEmployee } = employeeSlice.actions

export default employeeSlice.reducer



