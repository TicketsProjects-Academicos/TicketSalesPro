import { configureStore } from '@reduxjs/toolkit'
import  EventoReduce from "./eventos/slice"
import UserReduce from "./users/AuthSlice"
import SeccionReduce from "./Seccion/SliceSeccion"
import AsientoReduce from "./Asientos/SliceAsientos"


export default configureStore({

    reducer: {
        Eventos: EventoReduce,
        Users: UserReduce,
        Seccion: SeccionReduce,
        Aientos: AsientoReduce

    },

    devTools: true
})