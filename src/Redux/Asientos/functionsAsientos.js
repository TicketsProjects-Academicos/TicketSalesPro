import { fetchAsientoList, setResponse } from "./SliceAsientos"


export function fetchListAsientos(idseccion) {
    return async dispatch => {
        try {

            const respasiento = await fetch(  'http://ticketsproxapia.somee.com/api/Asientos',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            } )

            const asientos = await respasiento.json()
            const filteredAsientos = asientos.filter(asiento => asiento.idSecciones === idseccion)
          

            dispatch(fetchResponse(filteredAsientos))
        }catch (error) {

        }
    }
}

export function fetchResponse(asientoList) {
    return dispatch => {
        dispatch(fetchAsientoList({
            asientoList: asientoList
        }))
    }
}