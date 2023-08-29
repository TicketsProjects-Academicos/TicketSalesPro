import { createSlice } from "@reduxjs/toolkit"


export const slice = createSlice({
    name: 'Aientos',
    initialState: {
        asientoList: [],
        isLoading: null,
        error: null,
        asiento: null,
        response: null
    },

    reducers: {
        setResponse: (state, action) => {
            state.response = action.payload.response
        },

        fetchAsientoList: (state, action) => {
            state.isLoading = false,
            state.asientoList = action.payload.asientoList
        }

        

    }

})

export const {setResponse, fetchAsientoList} = slice.actions

export default slice.reducer