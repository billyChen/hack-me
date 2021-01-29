import { createSlice } from '@reduxjs/toolkit'
import { uuid } from 'uuidv4'

const deskSlice = createSlice({
    name: 'desks',
    initialState: [],
    reducers: {
        addDesk: (state, action) => {
            const uniqId = uuid()
            state.push({ id: uniqId, deskId: action.payload })
        },
        deleteDesk: {
            reducer(state, action) {
                return state.filter(desk => {
                    return desk.id !== action.payload
                })
            }
        },
        updateDesk: {
            reducer(state, action) {
                const { id, deskId } = action.payload

                state.forEach((desk, idx) => {
                    if (desk.id === id)
                        state[idx] = {
                            ...state[idx],
                            deskId
                        }
                })
            },
            prepare(data) {
                const { id, deskId } = data
                return { payload: { id, deskId } }
            }
        }
    }
})

export const { addDesk, deleteDesk, updateDesk } = deskSlice.actions

export default deskSlice.reducer
