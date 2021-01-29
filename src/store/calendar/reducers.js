
import { createSlice } from '@reduxjs/toolkit'
import { uuid } from 'uuidv4'

const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {},
    reducers: {
        addNewAssignment: {
            reducer(state, action) {
                const uniqId = uuid()
                const { deskId, month, day, employeeId, color } = action.payload
                state = {
                    ...state,
                    [month]: {
                        ...state[month],
                        [day]: {
                            ...state.[month]?.[day],
                            [deskId]: {
                                employeeId,
                                color
                            }
                        }
                    }
                }
                return state
            },
            prepare(params) {
                console.log('PARAMS', params)
                const { deskId, month, day, employeeId, color } = params
                return { payload: { deskId, month, day, employeeId, color } }
            }
        },
        deleteAssignment: {
            reducer(state, action) {
                return state.filter(desk => {
                    return desk.id !== action.payload
                })
            }
        },
    }
})

export const { addNewAssignment, deleteAssignment } = calendarSlice.actions

export default calendarSlice.reducer



