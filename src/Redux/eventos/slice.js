import { createSlice } from "@reduxjs/toolkit"

export const slice = createSlice({
    name: 'Eventos',
    initialState: {
        eventosList: [],
        isLoading: null,
        error: null,
        event: null,
        response: null
    },

    reducers: {
      setResponse: (state, action) => {
        state.response = action.payload.response
      },
      fetchStart: state => {
        state.isLoading = true
      },

      fetchFailed: (state, action) => {
        state.isLoading = false,
        state.error = action.payload.error
      },

      fetchEventListSucced: (state, action) => {
        state.isLoading = false,
        state.eventosList = action.payload.eventosList
      }

    }
})

export const {fetchStart,fetchFailed,fetchEventListSucced, setResponse} = slice.actions

export default slice.reducer