import { setResponse, fetchStart, fetchFailedSeccion, fetchSeccionList } from "./SliceSeccion";


export function fetchListSeccion(idevento) {
    return async dispatch => {
      try {
        const respevent = await fetch('http://ticketsproxapia.somee.com/api/Secciones', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const secciones = await respevent.json();

        const seccionList = secciones.filter(seccion => seccion.idEventos === idevento);


  

        dispatch(fetchResponseSeccion(seccionList));
      } catch (error) {

       dispatch(fetchFailedSeccion({error: error}))
      }
    };
  }

  export function fetchResponseSeccion(seccionList) {
    return dispatch => {
      dispatch(fetchSeccionList({
        seccionList: seccionList
      }))
    }
  }