import { createSlice } from "@reduxjs/toolkit"

export const slice = createSlice({
    name: 'Eventos',
    initialState: {
        eventosList: [],
        response: null
    },

    reducers: {
        setResponse: (state, action) => {
            state.response = action.payload
        },
        fetchEventosList: (state, action) => {
            state.eventosList = action.payload.eventosList
        }
    }
})

export const {fetchEventosList, setResponse} = slice.actions

export default slice.reducer