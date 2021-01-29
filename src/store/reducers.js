import { combineReducers } from 'redux'

import deskReducer from './desk/reducers'
import employeeReducer from './employee/reducers'
import calendarReducer from './calendar/reducers'

export default combineReducers({
    desks: deskReducer,
    employees: employeeReducer,
    calendar: calendarReducer
})



