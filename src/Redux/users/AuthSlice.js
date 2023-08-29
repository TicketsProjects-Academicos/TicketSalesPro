import { createSlice } from "@reduxjs/toolkit"

export const AuthSlice = createSlice({
    name: 'Users',
    initialState: {
        UserList: null,
        authToken: null,
        nameUser: null,
        lastnameUser: null,
        emailUser: null,
        succes: null,
        fechaexpiratio: null,
        fechaactual: null,

    },

    reducers: {
        authSucced: (state, action) => {
            state.authToken = action.payload
        },

        fechaexpiratio: (state, action) => {
            state.fechaexpiratio = action.payload
        },

        fechaActual: (state, action) => {
            state.fechaactual = action.payload
        },

        autoLogout: state => {
            state.authToken = null
        },

        UploadName: (state, action) => {
            state.nameUser = action.payload
        },

        UploadLastName: (state, action) => {
            state.lastnameUser = action.payload
        },

        UploadEmail: (state, action) => {
            state.emailUser = action.payload
        },

        UploadSucces: (state, action) => {
            state.succes = action.payload
        },


        deleteInfoUser: state => {
            state.nameUser = null
            state.lastnameUser = null
        }


    }
})

export const {authSucced, autoLogout, UploadName, UploadLastName,UploadSucces, UploadEmail, deleteInfoUser, fechaexpiratio, fechaActual} = AuthSlice.actions

export default AuthSlice.reducer