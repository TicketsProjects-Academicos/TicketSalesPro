import { configureStore } from '@reduxjs/toolkit'
import  eventoreduce from "./eventos/slice"


export default configureStore({
    reducer: {
        Eventos: eventoreduce
    },

    devTools: true
})