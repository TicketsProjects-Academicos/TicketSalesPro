import { createSlice } from "@reduxjs/toolkit";

export const sliceSeccion  = createSlice({
    name: 'Seccion',
    initialState: {
        seccionList: [],
        isLoading: null,
        err: null,
        seccion: null,
        response: null
    },

    reducers: {
        setResponse: (state, action) => {
            state.response = action.payload.response
        },

        fetchStart: state => {
            state.isLoading = true
        },

        fetchFailedSeccion: (state, action) => {
            state.isLoading = false,
            state.err = action.payload.error
        },

        fetchSeccionList: (state, action) => {
            state.isLoading = false,
            state.error = null,
            state.seccionList = action.payload.seccionList
        }
    }
})

export const {setResponse, fetchStart, fetchFailedSeccion, fetchSeccionList} = sliceSeccion.actions

export default sliceSeccion.reducer