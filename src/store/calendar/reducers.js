
import { createSlice } from '@reduxjs/toolkit'

const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {},
    reducers: {
        addNewAssignment: {
            reducer(state, action) {
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
                const { deskId, month, day, employeeId, color } = params
                return { payload: { deskId, month, day, employeeId, color } }
            }
        },
        deleteAssignment: {
            reducer(state, action) {
                const { month, day, deskId } = action.payload

                delete state[month][day][deskId]
            },
            prepare(params) {
                const { month, day, deskId } = params
                return { payload: { month, day, deskId } }
            }
        },
    }
})

export const { addNewAssignment, deleteAssignment } = calendarSlice.actions

export default calendarSlice.reducer



